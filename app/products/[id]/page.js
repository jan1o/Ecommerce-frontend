"use client"

import styles from './style.module.css'

import { useState, useEffect } from 'react';
import Loading from '@/app/loading';

import Message from '@/app/components/message';

import { getUser } from '@/utils/userUtils';

import productServices from '@/services/productServices';
import cartServices from '@/services/cartServices';

import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function Product({ params }){

  const [produto, setProduto] = useState();


  useEffect(() => {
    getProductFromAPI();
  }, []);

  const getProductFromAPI = async() => {
    const product = await fetch(`http://localhost:5000/api/products/product/${params.id}`);

    setProduto(await product.json());
  }

  const [banner, setBanner] = useState();
  const [desconto, setDesconto] = useState();
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if(!produto) return;

    setBanner(produto.images[0]);
    setDesconto(Math.trunc((1 - (produto.price / produto.previousPrice)) * 100));
    setLikes(produto.likes.length);
    if(produto.likes.find((element) => element === getUser()._id)){
      setIsLiked(true);
    }
  }, [produto])

  const handleLike = async (action) => {

    productServices.processFavoriteProduct(params.id);
    switch(action){
      case "favorite":
        setIsLiked(true);
        setLikes(likes + 1);
        break;
      case "unfavorite":
        setIsLiked(false);
        setLikes(likes - 1);
        break;
      default:
        break;
    }
  }

  const [message, setMessage] = useState({});
  const handleAddToCart = () => {

    cartServices.addProductToCart(params.id).then((res) => {
      if(res.errors){
        setMessage({text: res.errors[0], type: "error"});
      }
      else {
        setMessage({text: "Produto adicionado ao carrinho.", type: "success"});
      }
    });

  }

  if(!produto){
    return(<Loading/>)
  }
  else{
    return(
      <div>
        <h1 className={styles.titulo}>{produto.name}</h1>
        {/*produto*/}
        <div id={styles.produto_container}>
          {/*imagem miniaturas*/}
          <div id={styles.miniaturas_container}>
            {produto.images?.map((miniatura) => {
              return <div className={styles.miniatura} key={miniatura} onClick={() => {setBanner(miniatura)}}>
                <img src={miniatura} alt="miniatura"/>
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
              {isLiked ? <BsHeartFill onClick={() => {handleLike("unfavorite")}} /> : <BsHeart onClick={() => {handleLike("favorite")}} />}
              <p>{likes}</p>
            </div>
            <h5>R$ {produto.previousPrice}</h5>
            <h1>R$ {produto.price}</h1>
            <h6>{'('}{desconto}% de desconto{')'}</h6>
            <h3>R$ {produto.shipping} de frete para todo o Brasil</h3>
            <h1>Total de R$ {produto.total}</h1>
            <button id={styles.addToCart} onClick={() => handleAddToCart()}>Adicionar ao carrinho</button>
          </div>
        </div>
        {message && <Message msg={message.text} type={message.type} />}
        {/*garantias*/}
        <div id={styles.garantias_container}>
          <img src='/images/ui/banner_background.png' alt="garantias"/>
        </div>
        {/*infos tecnicas*/}
        <div id={styles.detalhes_container}>
          <div className={styles.infos_box}>
            <h1>Informações do produto</h1>
            <h3>{produto.name}</h3>
            <p>{produto.description}</p>
          </div>
          <div id={styles.especificacoes_container}>
            {produto.specifications?.map((item) => {
              return <div key={item._id} className={styles.espec}>
                <div className={styles.left_espec}>
                  <h3>{item.spec}</h3>
                </div>
                <div className={styles.right_espec}>
                  <h3>{item.desc}</h3>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }
}