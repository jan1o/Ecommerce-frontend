"use client"

import styles from "./style.module.css"
import { useState, useEffect } from "react"

import Message from "../components/message";
import Loading from "../loading";

import cartServices from "@/services/cartServices";

export default function Cart(){

  const [cep, setCep] = useState();

  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  const [message, setMessage] = useState({});

  useEffect(() => {
    cartServices.getUserCart().then((res) => {setCart(res.cart); setProducts(res.products)});
  }, []);

  const handleSetQtd = (qtd, product) => {
    cartServices.updateProductAmount(product, qtd).then((res) => {
      if(res.errors){
        setMessage({text: res.errors, type: "error"});
      }
      else{
        setMessage({text: res.message, type: "success"});
      }
    });

    let list = cart.products;
    list.map((item) => item.product === product ? item.amount = qtd : item.amount);
    setCart(prevState => ({...prevState, products: list}));
  }

  const handleCheckout = () => {
    console.log("indo para checkout");
  }

  const handleRemoveProduct = (product) => {
    cartServices.removeProductfromCart(product).then((res) => {
      if(res.errors){
        setMessage({text: res.errors, type: "error"});
      }
      else {
        setMessage({text: "Produto removido com sucesso.", type: "success"});
        setCart(res.cart); 
        setProducts(res.products);
      }
    });
  }

  return(
    <div>
      <div id={styles.cabecalho}>
        <p id={styles.p1}>Produto</p>
        <p id={styles.p2p3}>Quantidade</p>
        <p id={styles.p2p3}>Preço</p>
      </div>
      {products && products.map((product) => {
        return <div id={styles.product_container} key={product._id}>
          <div id={styles.product}>
            <img src={product.images[0]} alt={product.name}/>
            <h3>{product.name}</h3>
          </div>
          <div id={styles.qtd}>
            <p>Quantidade: {cart.products.find((p) => p.product === product._id).amount}</p>
            <p>Alterar: </p>
            <form>
              <select name="qtd" selected={product.amount} onChange={(e) => handleSetQtd(e.target.value, product._id)}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
            </form>
            <span onClick={() => handleRemoveProduct(product._id)}>Excluir</span>
          </div>
          <div id={styles.valor}>
            <h5>R$ {product.previousPrice}</h5>
            <h2>R$ {product.price}</h2>
            <h3>Frete de R$ {product.shipping}</h3>
            <h2>Subtotal: R$ {(product.total * cart.products.find((p) => p.product === product._id).amount)}</h2>
          </div>
        </div>
      })}
      <div id={styles.finalize}>
        <div>
          <p>Frete para</p>
          <input type="text" placeholder="00000-00" onChange={(e) => setCep(e.target.value)}/>
        </div>
        <div>
          <h2>Total: R$ {products.reduce((accumulator, currentValue) => accumulator + (currentValue.total * cart.products.find((p) => p.product === currentValue._id).amount), 0)}</h2>
          <button onClick={handleCheckout}>Continuar</button>
        </div>
      </div>
      {message && <Message msg={message.text} type={message.type} />}
    </div>
  )
}