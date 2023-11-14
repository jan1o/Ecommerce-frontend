"use client"

import styles from "./style.module.css"
import { use, useState } from "react"

export default function Cart(){

  const [cep, setCep] = useState();

  const handleSetQtd = (qtd) => {
    console.log("QTD: ", qtd);
  }

  const handleCheckout = () => {
    console.log("indo para checkout");
  }

  const handleRemoveProduct = (product) => {
    console.log("Removendo o produto ", product, " do carrinho.");
  }

  return(
    <div>
      <div id={styles.cabecalho}>
        <p id={styles.p1}>Produto</p>
        <p id={styles.p2p3}>Quantidade</p>
        <p id={styles.p2p3}>Preço</p>
      </div>
      <div id={styles.product_container}>
        <div id={styles.product}>
          <img src="/images/ui/categoria_temporaria.png" alt="produto"/>
          <h3>Nome do produto</h3>
        </div>
        <div id={styles.qtd}>
          <form>
            <select name="qtd" onChange={(e) => handleSetQtd(e.target.value)}>
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
          <span onClick={() => handleRemoveProduct(product)}>Excluir</span>
        </div>
        <div id={styles.valor}>
          <h5>R$ 24.99</h5>
          <h2>R$ 19.99</h2>
          <h3>Frete de R$ 4.99</h3>
          <h2>Subtotal: R$ 24.98</h2>
        </div>
      </div>
      <div id={styles.finalize}>
        <div>
          <p>Frete para</p>
          <input type="text" placeholder="00000-00" onChange={(e) => setCep(e.target.value)}/>
        </div>
        <div>
          <h2>Total: R$24.98</h2>
          <button onClick={handleCheckout}>Continuar</button>
        </div>
      </div>
    </div>
  )
}