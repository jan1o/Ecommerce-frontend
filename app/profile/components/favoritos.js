"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { BsHeart, BsHeartFill } from "react-icons/bs";

import productServices from "@/services/productServices"

export default function Favoritos() {

  const [favoritos, setFavoritos] = useState([]);

  const [unfavorites, setUnfavorites] = useState([]);

  useEffect(() => {
    productServices.getUserFavorites().then((res) => setFavoritos(res));
  }, []);

  const handleProcessfavorite = (action, product) => {
    productServices.processFavoriteProduct(product);
    switch(action){
      case "favorite":
        setUnfavorites(unfavorites.filter(item => item !== product));
        break;
      case "unfavorite":
        setUnfavorites(prevList => [...prevList, product]);
        break;
      default:
        break;
    }
  }

  const router = useRouter();

  const handleProduct = (produto) => {
    router.push(`/products/${produto}`);
  }

  return(
    <div id={styles.favoritos_container}>
      <h2>Favoritos</h2>
      <div id={styles.favoritos_cabecalho}>
        <p id={styles.favoritos_p1}>Produto</p>
        <p id={styles.favoritos_p2}>Preço</p>
      </div>
      {favoritos.map((product) => {
        return <div key={product._id} id={styles.favoritos_product_container}>
          <div id={styles.favoritos_product}>
            <img src={product.images[0]} alt={product.name}/>
            <h3>{product.name}</h3>
          </div>
          <div id={styles.favoritos_valor}>
            <h5>R$ {product.previousPrice}</h5>
            <h2>R$ {product.price}</h2>
          </div>
          {!unfavorites.find((element) => element === product._id) ? <BsHeartFill onClick={() => {handleProcessfavorite("unfavorite", product._id)}} /> : <BsHeart onClick={() => {handleProcessfavorite("favorite", product._id)}} />}
          <button onClick={() => {handleProduct(product._id)}}>Ver</button>
        </div>
      })}
    </div>
  )
}