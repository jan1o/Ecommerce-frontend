"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react"

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
  const [imagem, setImagem] = useState("");

  return(
    <div>
      <h2>Categoria</h2>
      <div>
        <form>
          <label>
            <span>Nome:</span>
            <input type="text" placeholder="Digite o nome" onChange={(e) => setNome(e.target.value)} value={cat.nome || ""}/>
          </label>
          <label>
            <span>Imagem:</span>
            <input type="file" placeholder="Selecione a imagem" onChange={(e) => setImagem(e.target.files[0])}/>
          </label>
        </form>
        <img src={cat.imagem} />
      </div>
      <button onClick={panelActivity}>Salvar</button>
      <button onClick={panelActivity}>Sair</button>
    </div>
  )
}