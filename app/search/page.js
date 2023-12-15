"use client"

import styles from "./style.module.css"

import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation" 

import { useState, useEffect } from "react"

import ProductCard from "../components/products/productCard"

export default function Search() {

  const searchParams = useSearchParams();
  const categoria = searchParams.get('categoria');
  const produto = searchParams.get('produto');

  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async() => {
    let res;
    if(produto){
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/search/product/${produto}`).then((res) => res.json());
    }
    else if(categoria){
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/search/category/${categoria}`).then((res) => res.json());
    }
    else{
      return;
    }

    console.log(res);
    setProdutos(res);
  }

  const router = useRouter();

  const handleProduct = (product) => {
    router.push(`/products/${product}`);
  }

  return (
    <div>
      {(produto || categoria) && <>
        {produtos && <>
          <h2 className={styles.titulo}>Resultado da sua pesquisa:</h2>
          <div id={styles.container}>
            {produtos.map((produto) => {
              return <div key={produto._id} onClick={() => handleProduct(produto._id)}>
                <ProductCard 
                  name={produto.name} 
                  image={produto.images[0]} 
                  likes={produto.likes.length} 
                  previousPrice={produto.previousPrice} 
                  price={produto.price}
                />
              </div>
            })}
          </div>
        </>}
      </>}
      {(!produto && !categoria) && <h2 className={styles.titulo}>Nenhum resultado obtido, tente novamente</h2>}
    </div>
  )
}