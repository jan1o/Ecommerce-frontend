"use client"

import styles from "./categoriaPanel.module.css"

import { useState, useEffect, useRef } from "react"

import categoryServices from "@/services/categoryServices";

export default function CategoriaPanel({ categ, panelActivity }){

  const [category, setCategory] = useState({});

  useEffect(() => {
    if(categ){
      setCategory(categ);
      setName(categ.name);
      setScreenImage(categ.image);
    }
  }, [])

  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [screenImage, setScreenImage] = useState();

  const img = useRef();

  const handleImage = (e) => {
    e.preventDefault();

    const imagem = URL.createObjectURL(img.current.files[0]);

    setImage(img.current.files[0]);
    setScreenImage(imagem);
  }

  const handleSave = (e) => {
    e.preventDefault();

    if(categ){
      const data = {
        _id: categ._id,
        name: name,
        image: image
      }
  
      categoryServices.updateCategory(data).then((res) => panelActivity());
    }
    else {
      const data = {
        name: name,
        image: image
      }

      categoryServices.createCategory(data).then((res) => panelActivity());
    }
  }

  return(
    <div id={styles.container}>
      {categ ? <h2>Editar categoria</h2> : <h2>Nova Categoria</h2>}

      <div>
        <form>
          <label>
            <span>Nome:</span>
            <input type="text" placeholder="Digite o nome" onChange={(e) => setName(e.target.value)} value={name || ""}/>
          </label>
          <label>
            <span>Imagem:</span>
            <input ref={img} type="file" placeholder="Selecione a imagem" onChange={handleImage}/>
          </label>
        </form>
        <img src={screenImage} />
      </div>
      <button onClick={handleSave}>Salvar</button>
      <button onClick={panelActivity}>Sair</button>
    </div>
  )
}