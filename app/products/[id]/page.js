"use client"

import styles from './style.module.css'

import { useState } from 'react';

const produto = {
  nome: "Produto x",
  descricao: "Descrição do produto x",
  likes: 28,
  precoAnterior: 25.99,
  preco: 19.99,
  frete: 5.99,
  imagens: [
    {
      id: 0, 
      img: "/images/ui/categoria_temporaria.png"
    }, 
    {
      id: 1, 
      img: "/images/ui/banner_background.png"
    }, 
    {
      id: 2, 
      img: "/images/ui/categoria_temporaria.png"
    }, 
    {
      id: 3, 
      img: "/images/ui/categoria_temporaria.png"
    }, 
    {
      id: 4, 
      img: "/images/ui/categoria_temporaria.png"
    }, 
    {
      id: 5, 
      img: "/images/ui/categoria_temporaria.png"
    }, 
    {
      id: 6, 
      img: "/images/ui/categoria_temporaria.png"
    }, 
  ],
  especificacoes: [
    {
      id: 0,
      espec: "Tamanho",
      desc: "10x10x20cm",
    },
    {
      id: 1,
      espec: "Peso",
      desc: "0.5kg",
    },
    {
      id: 2,
      espec: "Cor",
      desc: "Azul",
    }
  ],
}

export default function Product({ params }){

  const [banner, setBanner] = useState(produto.imagens[0].img);

  const desconto = Math.trunc((1 - (produto.preco / produto.precoAnterior)) * 100);

  const precoTotal = (produto.preco + produto.frete).toFixed(2);

  const handleLike = () => {
    produto.likes += 1;
  }

  const handleAddToCart = () => {
    console.log("Adicionando ao carrinho.");
  }

  return(
    <div>
      <h1 className={styles.titulo}>{produto.nome}</h1>
      {/*produto*/}
      <div id={styles.produto_container}>
        {/*imagem miniaturas*/}
        <div id={styles.miniaturas_container}>
          {produto.imagens?.map((miniatura) => {
            return <div className={styles.miniatura} key={miniatura.id} onClick={() => {setBanner(miniatura.img)}}>
              <img src={miniatura.img} alt={miniatura.img}/>
            </div>
          })}
        </div>
        {/*imagem principal*/}
        <div id={styles.banner_container}>
          <img src={banner} alt="produto" />
        </div>
        {/*infos*/}
        <div id={styles.infos_container}>
          <div>
            <button onClick={handleLike}><img src='/like' /></button>
            <p>{produto.likes}</p>
          </div>
          <h5>R$ {produto.precoAnterior}</h5>
          <h1>R$ {produto.preco}</h1>
          <h6>{'('}{desconto}% de desconto{')'}</h6>
          <h3>R$ {produto.frete} de frete para todo o Brasil</h3>
          <h1>Total de R$ {precoTotal}</h1>
          <button id={styles.addToCart} onClick={handleAddToCart}>Adicionar ao carrinho</button>
        </div>
      </div>
      {/*garantias*/}
      <div>
        <img src='/images' alt='garantias'/>
      </div>
      {/*infos tecnicas*/}
      <div>
        <h2>Informações do produto</h2>
        <h3>{produto.nome}</h3>
        <p>{produto.descricao}</p>
        <div>
          {produto.especificacoes?.map((item) => {
            return <div key={item.id}>
              <div>
                <h3>{item.espec}</h3>
              </div>
              <div>
                <h3>{item.desc}</h3>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}