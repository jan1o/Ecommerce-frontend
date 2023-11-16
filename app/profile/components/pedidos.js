"use client"

import styles from "./style.module.css"

const pedidos = [
  {
    id: 1,
    nome: "Jânio",
    sobrenome: "Fernandes de Medeiros Júnior",
    estado: "RN",
    cidade: "Caicó", 
    bairro: "Zona Rural",
    endereço: "Sítio Umari", 
    complemento: "", 
    produtos: [
      {
        id: 1,
        nome: "Produto 1",
        preco: 24.99,
        quantidade: 1,
        imagem: "/images/ui/categoria_temporaria.png"
      },
      {
        id: 2,
        nome: "Produto 2",
        preco: 19.99,
        quantidade: 2,
        imagem: "/images/ui/categoria_temporaria.png"
      }
    ], 
    total: 64.97, 
    status: "Finalizado"
  },
  {
    id: 2,
    nome: "Jânio",
    sobrenome: "Fernandes de Medeiros Júnior",
    estado: "RN",
    cidade: "Caicó", 
    bairro: "Zona Rural",
    endereço: "Sítio Umari", 
    complemento: "", 
    produtos: [
      {
        id: 1,
        nome: "Produto 1",
        preco: 24.99,
        quantidade: 1,
        imagem: "/images/ui/categoria_temporaria.png"
      },
      {
        id: 2,
        nome: "Produto 3",
        preco: 49.98,
        quantidade: 1,
        imagem: "/images/ui/categoria_temporaria.png"
      }
    ], 
    total: 74.97, 
    status: "Enviado para entrega"
  },

]

export default function Pedidos() {
  return(
    <div>
      <div id={styles.cabecalho}>
        <p id={styles.p1}>Cliente</p>
        <p id={styles.p2}>Produtos</p>
        <p id={styles.p2}>Status</p>
      </div>
      {pedidos.map((pedido) => {
        return <div key={pedido.id} id={styles.pedido_container}>
          <div id={styles.cliente}>
            <p>{pedido.nome}</p>
            <p>{pedido.sobrenome}</p>
            <p>{pedido.estado}</p>
            <p>{pedido.cidade}</p>
            <p>{pedido.bairro}</p>
            <p>{pedido.endereço}</p>
            <p>{pedido.complemento}</p>
          </div>
          <div id={styles.produtos}>
            {pedido.produtos.map((produto) => {
              return <div key={produto.id}>
                <img src={produto.imagem} />
                <p>{produto.nome}</p>
                <p>R$ {produto.preco}</p>
                <p>Quantidade: {produto.quantidade}</p>
              </div>
            })}
            <h2>Total: R$ {pedido.total}</h2>
          </div>
          <div>
            <h1>Status: </h1>
            <h2>{pedido.status}</h2>
          </div>
        </div>
      })}
    </div>
  )
}