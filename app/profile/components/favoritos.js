"use client"

import styles from "./style.module.css"

import { useRouter } from "next/navigation"

const favoritos = [
  {
    id: 1,
    nome: "Produto 1",
    imagem: "/images/ui/categoria_temporaria.png",
    precoAnterior: 24.99,
    preco: 19.99
  },
  {
    id: 2,
    nome: "Produto 2",
    imagem: "/images/ui/categoria_temporaria.png",
    precoAnterior: 23.98,
    preco: 17.49
  },
  {
    id: 3,
    nome: "Produto 3",
    imagem: "/images/ui/categoria_temporaria.png",
    precoAnterior: 36.95,
    preco: 29.95  
  },
  {
    id: 4,
    nome: "Produto 4",
    imagem: "/images/ui/categoria_temporaria.png",
    precoAnterior: 104.99,
    preco: 89.99
  },
]

export default function Favoritos() {

  const router = useRouter();

  const handleProduct = (produto) => {
    router.push(`/products/${produto}`);
  }

  return(
    <div>
      <div id={styles.cabecalho}>
        <p id={styles.p1}>Produto</p>
        <p id={styles.p2}>Preço</p>
      </div>
      {favoritos.map((produto) => {
        return <div key={produto.id} id={styles.product_container}>
          <div id={styles.product}>
            <img src="/images/ui/categoria_temporaria.png" alt={produto.nome}/>
            <h3>{produto.nome}</h3>
          </div>
          <div id={styles.valor}>
            <h5>R$ {produto.precoAnterior}</h5>
            <h2>R$ {produto.preco}</h2>
            <button onClick={() => {handleProduct(produto.id)}}>Ver</button>
          </div>
        </div>
      })}
    </div>
  )
}