"use client"

import styles from "./categoriaPanel.module.css"

import { useState, useEffect, useRef } from "react"

const categoria = {
  id: 1,
  nome: "Categoria x",
  imagem: "/images/ui/categoria_temporaria.png"
}

export default function CategoriaPanel({ id, panelActivity }){

  //Simulação
  const [cat, setCat] = useState({});
  useEffect(() => {
    if(id){
      setCat(categoria);
    }
  }, [])

  const [nome, setNome] = useState("");


  const img = useRef();

  const handleImage = (e) => {
    e.preventDefault();

    const imagem = new Image();
    imagem.src = URL.createObjectURL(img.current.files[0]);
    imagem.onload = () => {
      setCat((prevStates) => ({...prevStates, imagem: imagem.src}));
    }
  }

  return(
    <div id={styles.container}>
      {id ? <h2>Editar categoria</h2> : <h2>Nova Categoria</h2>}

      <div>
        <form>
          <label>
            <span>Nome:</span>
            <input type="text" placeholder="Digite o nome" onChange={(e) => setNome(e.target.value)} value={cat.nome || ""}/>
          </label>
          <label>
            <span>Imagem:</span>
            <input ref={img} type="file" placeholder="Selecione a imagem" onChange={handleImage}/>
          </label>
        </form>
        <img src={cat.imagem} />
      </div>
      <button onClick={panelActivity}>Salvar</button>
      <button onClick={panelActivity}>Sair</button>
    </div>
  )
}