"use client"

import styles from "./pedidos.module.css"

import { useEffect, useState } from "react"

import orderServices from "@/services/orderServices"

import Message from "@/app/components/message"

export default function Pedidos(){

  const [message, setMessage] = useState({});

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderServices.getAllOrders().then((res) => setOrders(res));
  }, []);

  const handleStatus = (order, status) => {
    const data = {
      status: status
    }

    orderServices.updateOrderStatus(order, data).then((res) => {
      if(res.errors){
        setMessage({text: res.errors, type: "error"});
      }
      else{
        setMessage({text: "Pedido atualizado com sucesso.", type: "success"});

        let list = orders;
        list.map((item) => item._id === order ? item = res : item);
        setOrders(list);
      }
    });
  }

  return(
    <div id={styles.pedidos_container}>
      <h2>Pedidos</h2>
      {!orders.length ? <h3>Nenhum pedido encontrado.</h3> :
      <>
        {message && <Message msg={message.text} type={message.type} />}
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
              {order.products.map((product) => {
                return <div key={product.product}>
                  <img src={product.image} />
                  <section>
                    <p>{producto.name}</p>
                    <p>R$ {product.price}</p>
                    <p>Quantidade: {product.amount}</p>
                  </section>
                </div>
              })}
              <h2>Total: R$ {order.total}</h2>
            </div>
            <div id={styles.pedido_status}>
              <h3>{order.status}</h3>
              <form>
                <select name="status" onChange={(e) => handleStatus(order._id, e.target.value)}>
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
      </>
      }
    </div>
  )
}