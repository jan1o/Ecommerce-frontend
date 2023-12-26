"use client"

import styles from "./style.module.css"

import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation" 

import { useState, useEffect } from "react"

import productServices from "@/services/productServices"

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
      productServices.searchProductByName(produto).then((res) => setProdutos(res));
    }
    else if(categoria){
      res = productServices.searchProductByCategory(categoria).then((res) => setProdutos(res));
    }
    else{
      return;
    }
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