"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react"

import orderServices from "@/services/orderServices"

export default function Pedidos() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderServices.getUserOrders().then((res) => setOrders(res));
  }, []);

  return(
    <div id={styles.pedidos_container}>
      {orders.length === 0 ? 
      <>
        <h2 style={{border: "1px solid gray", padding: "15px 5px"}}>
          Parece que você ainda não realizou nenhum pedido de compra.
        </h2>
      </>
      : 
      <>
        <h2>Pedidos</h2>
        <div id={styles.pedidos_cabecalho}>
          <p id={styles.pedidos_p1}>Cliente</p>
          <p id={styles.pedidos_p2}>Produtos</p>
          <p id={styles.pedidos_p3}>Status</p>
        </div>
        {orders.map((order) => {
          return <div key={order._id} className={styles.pedido_container}>
            <div className={styles.pedido_cliente}>
              <p>Nome: {order.data.name}</p>
              <p>Sobrenome: {order.data.secondName}</p>
              <p>Estado: {order.data.state}</p>
              <p>Cidade: {order.data.city}</p>
              <p>Bairro: {order.data.neighborhood}</p>
              <p>Endereço: {order.data.address}</p>
              <p>Complemento: {order.data.complement}</p>
            </div>
            <div className={styles.pedido_produtos}>
              {order.products.map((product) =>  {
                return <div key={product._id}>
                  <img src={product.image} />
                  <section>
                    <p>{product.name}</p>
                    <p>R$ {product.price}</p>
                    <p>Quantidade: {product.amount}</p>
                  </section>
                </div>
              })}
              <h2>Total: R$ {order.total}</h2>
            </div>
            <div id={styles.pedido_status}>
              <h3>{order.status}</h3>
            </div>
          </div>
        })}
      </>}
    </div>
  )
}