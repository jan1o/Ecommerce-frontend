"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'

import Pedidos from "./components/pedidos"
import Categorias from "./components/categorias"
import Produtos from "./components/produtos"

export default function Dashboard(){

  const searchParams = useSearchParams();
  //view = 0 => pedidos; view = 1 => categorias; view = 2 => produtos
  const [view, setView] = useState(0);

  useEffect(() => {
    switch(searchParams.get("view")){
      case "pedidos":
        setView(0);
        break;
      case "categorias":
        setView(1);
        break;
      case "produtos":
        setView(2);
        break;
      default:
        setView(0);
        break;
    }
  }, []);

  return(
    <div id={styles.principal_container}>
      <div id={styles.left_container}>
        <div>
          <span onClick={() => setView(0)}>Pedidos</span>
        </div>
        <div>
          <span onClick={() => setView(1)}>Categorias</span>
        </div>
        <div>
          <span onClick={() => setView(2)}>Produtos</span>
        </div>
      </div>
      <div id={styles.right_container}>
        {view === 0 && 
          <Pedidos />
        }
        {view === 1 &&
          <Categorias />
        }
        {view === 2 && 
          <Produtos />
        }
      </div>
    </div>
  )
}