"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react";

import CategoriaPanel from "./categoriaPanel";

const categorias = [
  {
    id: 1,
    nome: "Categoria 1",
    imagem: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 2,
    nome: "Categoria 2",
    imagem: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 3,
    nome: "Categoria 3",
    imagem: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 4,
    nome: "Categoria 4",
    imagem: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 5,
    nome: "Categoria 5",
    imagem: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 6,
    nome: "Categoria 6",
    imagem: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 7,
    nome: "Categoria 7",
    imagem: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 8,
    nome: "Categoria 8",
    imagem: "/images/ui/categoria_temporaria.png"
  },
];

export default function Categorias(){

  const [panelActive, setPanelActive] = useState(false);

  const [categoria, setCategoria] = useState();

  useEffect(() => {
    if(categoria){
      panelActivity();
    }
  }, [categoria]);

  const handleAddCategory = () => {
    panelActivity();
  }

  const openCategory = (categoria) => {
    setCategoria(categoria);
  }

  const panelActivity = () => {
    panelActive ? (setPanelActive(false), setCategoria()) : setPanelActive(true);
  }

  const deleteCategory = (categoria) => {
    console.log("Excluindo categoria: " + categoria);
  }

  return(
    <div>
      <button onClick={handleAddCategory}>Nova Categoria</button>
      {categorias.map((categoria) => {
        return <div key={categoria.id}>
          <img src={categoria.imagem} />
          <p>{categoria.nome}</p>
          <button onClick={() => openCategory(categoria.id)}>Editar</button>
          <button onClick={() => deleteCategory(categoria.id)}>Excluir</button>
        </div>
      })}
      {panelActive && <CategoriaPanel id={categoria} panelActivity={panelActivity}/>}
    </div>
  )
}