"use client"

import Loading from './loading'
import styles from './page.module.css'

import { useRouter } from 'next/navigation'

const categorias = [
  {
    id: 1,
    nome: "Categoria 1",
    img: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 2,
    nome: "Categoria 2",
    img: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 3,
    nome: "Categoria 3",
    img: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 4,
    nome: "Categoria 4",
    img: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 5,
    nome: "Categoria 5",
    img: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 6,
    nome: "Categoria 6",
    img: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 7,
    nome: "Categoria 7",
    img: "/images/ui/categoria_temporaria.png"
  },
  {
    id: 8,
    nome: "Categoria 8",
    img: "/images/ui/categoria_temporaria.png"
  },
];

const produtos = [
  {
    id: 1,
    imagem: "/images/ui/categoria_temporaria.png",
    nome: "Produto 1",
    likes: 20,
    preco: 25.99,
    precoAnterior: 29.99
  },
  {
    id: 2,
    imagem: "/images/ui/categoria_temporaria.png",
    nome: "Produto 2",
    likes: 12,
    preco: 99.99,
    precoAnterior: 115.00
  },
  {
    id: 3,
    imagem: "/images/ui/categoria_temporaria.png",
    nome: "Produto 3",
    likes: 50,
    preco: 129.95,
    precoAnterior: 139.95
  },
  {
    id: 4,
    imagem: "/images/ui/categoria_temporaria.png",
    nome: "Produto 4",
    likes: 100,
    preco: 12.99,
    precoAnterior: 14.99
  },
];

export default function Home() {

  const router = useRouter();

  const handleSearchCategory = (categoria) => {
    router.push(`/search?categoria=${categoria}`);
  }

  return (
    <div>
      <div id={styles.banner}>
        <h1>MyCommerce</h1>
        <p>O lugar certo para realizar seus sonhos!</p>
      </div>
      <div id={styles.categorias}>
        {categorias.map((categoria) => {
          return <div key={categoria.id} onClick={() => {handleSearchCategory(categoria.nome)}}>
                  <img src={categoria.img} alt={categoria.nome}/>
                  <p>{categoria.nome}</p>
                </div>
        })}
      </div>

      <div className={styles.produtos}>
        <h3>O que há de melhor</h3>
        <div className={styles.produtos_container}>
          {produtos.map((produto) => {
            return <div className={styles.produto} key={produto.id}>
                    <img src={produto.imagem} alt={produto.nome}/>
                    <p>{produto.nome}</p>
                    <div>
                      <img src='/like'/>
                      <p>{produto.likes}</p>
                    </div>
                    <h3>R${produto.precoAnterior}</h3>
                    <h2>R${produto.preco}</h2>
                  </div>
          })}
        </div>
      </div>

      <div className={styles.produtos}>
        <h3>O que há de mais novo</h3>
        <div className={styles.produtos_container}>
          {produtos.map((produto) => {
            return <div className={styles.produto} key={produto.id}>
                    <img src={produto.imagem} alt={produto.nome}/>
                    <p>{produto.nome}</p>
                    <div>
                      <img src='/like'/>
                      <p>{produto.likes}</p>
                    </div>
                    <h2>R${produto.preco}</h2>
                  </div>
          })}
        </div>
      </div>
    </div>
  )
}
