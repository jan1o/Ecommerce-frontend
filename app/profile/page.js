"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react"

import Infos from "./components/infos"
import Favoritos from "./components/favoritos"
import Pedidos from "./components/pedidos"

export default function Profile() {
  //view = 0 => infos; view = 1 => favoritos; view = 2 => pedidos
  const [view, setView] = useState(0);

  return (
    <div id={styles.principal_container}>
      <div id={styles.left_container}>
        <div>
          <span onClick={() => setView(0)}>Informações pessoais</span>
        </div>
        <div>
          <span onClick={() => setView(1)}>Meus favoritos</span>
        </div>
        <div>
          <span onClick={() => setView(2)}>Meus pedidos</span>
        </div>
      </div>
      <div id={styles.right_container}>
        {view === 0 && 
          <Infos />
        }
        {view === 1 &&
          <Favoritos />
        }
        {view === 2 && 
          <Pedidos />
        }
      </div>
    </div>
  )
}