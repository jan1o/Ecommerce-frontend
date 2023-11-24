"use client"

import styles from "./style.module.css"

import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation"

import ProductCard from "../components/products/productCard"

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

const produtos = [
  {
    id: 1,
    nome: "Produto 1",
    imagem: "/images/ui/categoria_temporaria.png",
    likes: 27,
    precoAnterior: 24.99,
    preco: 19.99
  },
  {
    id: 2,
    nome: "Produto 2",
    imagem: "/images/ui/categoria_temporaria.png",
    likes: 18,
    precoAnterior: 34.98,
    preco: 29.98
  },
  {
    id: 3,
    nome: "Produto 3",
    imagem: "/images/ui/categoria_temporaria.png",
    likes: 99,
    precoAnterior: 49.99,
    preco: 39.99
  },
  {
    id: 4,
    nome: "Produto 4",
    imagem: "/images/ui/categoria_temporaria.png",
    likes: 99,
    precoAnterior: 49.99,
    preco: 39.99
  },
  {
    id: 5,
    nome: "Produto 4",
    imagem: "/images/ui/categoria_temporaria.png",
    likes: 99,
    precoAnterior: 49.99,
    preco: 39.99
  },
]

export default function Search() {

  const searchParams = useSearchParams();
  const categoria = searchParams.get('categoria');
  const produto = searchParams.get('produto');

  const router = useRouter();

  const handleProduct = (product) => {
    router.push(`/products/${product}`);
  }

  return (
    <div>
      {produto && <>
        <h2 className={styles.titulo}>Resultado da sua pesquisa:</h2>
        <div id={styles.container}>
          {produtos.map((produto) => {
            return <div onClick={() => handleProduct(produto.id)}>
              <ProductCard 
                key={produto.id} 
                nome={produto.nome} 
                imagem={produto.imagem} 
                likes={produto.likes} 
                precoAnterior={produto.precoAnterior} 
                preco={produto.preco}
              />
            </div>
          })}
        </div>
      </>}
      {(!produto && !categoria) && <h2 className={styles.titulo}>Nenhum resultado obtido, tente novamente</h2>}
    </div>
  )
}