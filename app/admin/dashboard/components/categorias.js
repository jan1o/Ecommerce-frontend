"use client"

import styles from "./categorias.module.css"

import { useState, useEffect } from "react";

import categoryServices from "@/services/categoryServices";

import CategoriaPanel from "./categoriaPanel";

import Message from "@/app/components/message";

export default function Categorias(){

  const [message, setMessage] = useState({});

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const [panelActive, setPanelActive] = useState(false);

  const [category, setCategory] = useState();

  useEffect(() => {
    if(category){
      panelActivity();
    }
  }, [category]);

  const getCategories = () => {
    categoryServices.getAll().then((res) => setCategories(res));
  }

  const handleAddCategory = () => {
    panelActivity();
  }

  const openCategory = (category) => {
    setCategory(category);
  }

  const panelActivity = () => {
    panelActive ? (setPanelActive(false), getCategories(), setCategory(), setMessage({text: "Categorias atualizadas com sucesso.", type: "success"})) : setPanelActive(true);
  }

  const deleteCategory = (id) => {
    categoryServices.deleteCategory(id).then((res) => {
      if(res.errors){
        setMessage({text: errors, type: "error"});
      }
      getCategories(); 
      setMessage({text: "Categoria deletada com sucesso.", type: "success"});
    });
  }

  return(
    <div id={styles.categorias_container}>
      <h2>Categorias</h2>
      <button onClick={handleAddCategory}>Nova Categoria</button>
      {message && <Message msg={message.text} type={message.type}/>}
      {categories.map((category) => {
        return <div key={category._id} className={styles.categoria_container}>
          <img src={category.image} />
          <div>
            <p>{category.name}</p>
            <button onClick={() => openCategory(category)}>Editar</button>
            <button className={styles.delete} onClick={() => deleteCategory(category._id)}>Excluir</button>
          </div>
        </div>
      })}
      {panelActive && <CategoriaPanel categ={category} panelActivity={panelActivity}/>}
    </div>
  )
}