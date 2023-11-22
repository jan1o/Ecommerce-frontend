"use client"

import styles from "./style.module.css"

import { useRouter } from "next/navigation";

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

export default function Produtos(){

  const router = useRouter();

  const handleAdd = () => {
    router.push("/admin/dashboard/AddNew");
  }

  const handleEdit = (produto) => {
    router.push(`/admin/dashboard/${produto}`);
  }

  const handleDelete = (produto) => {
    console.log("Deletando produto " + produto);
  }

  return(
    <div>
      <h2>Produtos</h2>
      <button onClick={handleAdd}>Add Novo</button>
      <div>
        <p>Id</p>
        <p>Imagem</p>
        <p>Nome</p>
        <p>Preço</p>
        <p>Edição</p>
      </div>
      <div>
        {produtos.map((produto) => {
          return <div key={produto.id}>
            <h3>{produto.id}</h3>
            <img src={produto.imagem}/>
            <h3>{produto.nome}</h3>
            <h3>{produto.preco}</h3>
            <div>
              <button onClick={() => handleEdit(produto.id)}>Editar</button>
              <button onClick={() => handleDelete(produto.id)}>Deletar</button>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}