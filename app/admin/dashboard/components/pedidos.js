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

export default function Pedidos(){

  const handleStatus = (status) => {
    console.log(status);

  }

  return(
    <div id={styles.pedidos_container}>
      <h2>Pedidos</h2>
      <div id={styles.pedidos_cabecalho}>
        <p id={styles.pedidos_p1}>Cliente</p>
        <p id={styles.pedidos_p2}>Produtos</p>
        <p id={styles.pedidos_p3}>Status</p>
      </div>
      {pedidos.map((pedido) => {
        return <div key={pedido.id} className={styles.pedido_container}>
          <div className={styles.pedido_cliente}>
            <p>Nome: {pedido.nome}</p>
            <p>Sobrenome: {pedido.sobrenome}</p>
            <p>Estado: {pedido.estado}</p>
            <p>Cidade: {pedido.cidade}</p>
            <p>Bairro: {pedido.bairro}</p>
            <p>Endereço: {pedido.endereço}</p>
            <p>Complemento: {pedido.complemento}</p>
          </div>
          <div className={styles.pedido_produtos}>
            {pedido.produtos.map((produto) => {
              return <div key={produto.id}>
                <img src={produto.imagem} />
                <section>
                  <p>{produto.nome}</p>
                  <p>R$ {produto.preco}</p>
                  <p>Quantidade: {produto.quantidade}</p>
                </section>
              </div>
            })}
            <h2>Total: R$ {pedido.total}</h2>
          </div>
          <div id={styles.pedido_status}>
            <h3>{pedido.status}</h3>
            <form>
              <select name="status" onChange={(e) => handleStatus(e.target.value)}>
                <option value="">Selecione o status do pedido</option>
                <option value="processando">Em processamento</option>
                <option value="entrega">Enviado para entrega</option>
                <option value="caminho">A caminho</option>
                <option value="finalizado">Finalizado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </form>
          </div>
        </div>
      })}
    </div>
  )
}