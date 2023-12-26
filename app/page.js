"use client"

import Loading from './loading'
import styles from './page.module.css'

import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react'

import productServices from '@/services/productServices'
import categoryServices from '@/services/categoryServices'

import ProductCard from './components/products/productCard'
import CategoryCard from './components/products/categoryCard'

export default function Home() {

  const [categorias, setCategorias] = useState([]);
  const [newest, setNewest] = useState([]);
  const [best, setBest] = useState([]);

  useEffect( () => {
    getDataFromServer();
  }, [])

  const getDataFromServer = async () => {
    const [res1, res2, res3] = await Promise.all([
      categoryServices.getAll(),
      productServices.getNewest(),
      productServices.getBest()
    ]);

    setCategorias(res1);
    setNewest(res2);
    setBest(res3);
  }

  const router = useRouter();

  const handleSearchCategory = (categoria) => {
    router.push(`/search?categoria=${categoria}`);
  }

  const handleProduct = (product) => {
    router.push(`/products/${product}`);
  }

  return (
    <div>
      <div id={styles.banner}>
        <h1>MyCommerce</h1>
        <p>O lugar certo para realizar seus sonhos!</p>
      </div>
      <div id={styles.categorias}>
        {categorias.map((categoria) => {
          return <div key={categoria._id} onClick={() => {handleSearchCategory(categoria._id)}}>
            <CategoryCard nome={categoria.name} imagem={categoria.image} />
          </div>
        })}
      </div>

      <div className={styles.produtos}>
        <h3>O que há de mais novo</h3>
        <div className={styles.produtos_container}>
          {newest.map((produto) => {
            return <div key={produto._id} onClick={() => handleProduct(produto._id)}>
              <ProductCard 
                name={produto.name}
                previousPrice={produto.previousPrice}
                price={produto.price}
                likes={produto.likes.length}
                image={produto.images[0]}
              />
            </div>
          })}
        </div>
      </div>

      <div className={styles.produtos}>
        <h3>O que há de melhor</h3>
        <div className={styles.produtos_container}>
          {best.map((produto) => {
            return <div key={produto._id} onClick={() => handleProduct(produto._id)}>
              <ProductCard 
                name={produto.name} 
                image={produto.image} 
                likes={produto.likes.length} 
                previousPrice={produto.previousPrice} 
                price={produto.price}
              />
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
