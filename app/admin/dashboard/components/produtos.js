"use client"

import styles from "./produtos.module.css"

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import productServices from "@/services/productServices";

import Message from "@/app/components/message";
import DeletePanel from "@/app/components/deletePanel";

export default function Produtos(){

  const [message, setMessage] = useState({});

  const [products, setProducts] = useState([]);

  useEffect(() => {
    productServices.getAllProducts().then((res) => setProducts(res));
  }, []);

  const router = useRouter();

  const handleAdd = () => {
    router.push("/admin/dashboard/AddNew");
  }

  const handleEdit = (produto) => {
    router.push(`/admin/dashboard/${produto}`);
  }

  //delete product
  const [productToDelete, setProductToDelete] = useState();
  const [deletePanel, setDeletePanel] = useState(false);

  useEffect(() => {
    if(productToDelete === undefined){
      return;
    }

    handleDeletePanel();
  }, [productToDelete]);

  const handleDeletePanel = () => {
    deletePanel ? (setDeletePanel(false), setProductToDelete()) : setDeletePanel(true)
  }

  const handleDelete = () => {
    productServices.deleteProduct(productToDelete).then((res) => {
      if(res.errors){
        setMessage({text: res.errors, type: "error"});
      }
      else{
        setMessage({text: res.message, type: "success"});

        let list = products;
        
        const index = list.findIndex((e) => e._id === productToDelete);
        list.splice(index, 1);

        setProducts(list);
      }
    });

    handleDeletePanel();
  }

  return(
    <div id={styles.produtos_container}>
      <h2>Produtos</h2>
      <button onClick={handleAdd}>Add Novo</button>
      {message && <Message msg={message.text} type={message.type} />}
      {products.map((product) => {
        return <div key={product._id} className={styles.produto_container}>
          <div>
            <p>{product._id}</p>
          </div>
          <div>
            <img src={product.images[0]}/>
          </div>
          <div>
            <p>{product.name}</p>
            <h4>R$ {product.previousPrice}</h4>
            <h3>R$ {product.price}</h3>
          </div>
          <div>
            <button onClick={() => handleEdit(product._id)}>Editar</button>
            <button onClick={() => setProductToDelete(product._id)}>Deletar</button>
          </div>
        </div>
      })}
      {deletePanel && <DeletePanel text={"Deseja deletar o produto " + productToDelete} functionYes={handleDelete} functionNo={handleDeletePanel} />}
    </div>
  )
}