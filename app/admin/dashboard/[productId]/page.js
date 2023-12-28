"use client"

import styles from "./style.module.css"

import { useState, useEffect, useRef } from "react"

import { useRouter } from "next/navigation";

import productServices from "@/services/productServices";
import categoryServices from "@/services/categoryServices";

import Message from "@/app/components/message";

export default function Product({ params }){

  const [message, setMessage] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [previousPrice, setPreviousPrice] = useState();
  const [price, setPrice] = useState();
  const [shipping, setShipping] = useState();
  
  const [specifications, setSpecifications] = useState([]);

  const [tempSpec, setTempSpec] = useState("");
  const [tempSpecDesc, setTempSpecDesc] = useState("");

  //controle de imagens
  const [DBImages, setDBImages] = useState([]); //lista de imagens recuperadas do bd (formato de texto)
  const [addedImages, setAddedImages] = useState([]); //lista de imagens adicionadas pelo usuário

  const tempImage = useRef();

  //controle de categorias
  const [categories, setCategories] = useState([]); //lista de categorias recuperadas do banco de categorias
  const [selectedCategories, setSelectedCategories] = useState([]); //lista de categorias selecionadas
  const [productCategories, setProductCategories] = useState([]); //lista de categorias do produto vindo do bd

  useEffect(() => {
    //get do produto no bd caso seja update de produto
    if(params.productId){
      productServices.getProductById(params.productId).then((res) => {
        console.log(res);
        setName(res.name);
        setDescription(res.description);
        setPreviousPrice(res.previousPrice);
        setPrice(res.price);
        setShipping(res.shipping);
        setSpecifications(res.specifications);
        setDBImages(res.images);
        setProductCategories(res.categories);
      });
    }

    //get de categorias no bd
    categoryServices.getAll().then((res) => setCategories(res));

  }, []);

  useEffect(() => {
    if(!productCategories.length){
      productCategories.map((e) => {
        const index = categories.findIndex((element) => element._id === e);
        let list = selectedCategories;
        list.push(categories[index]);
        setSelectedCategories(list);
      })
    }
  }, [categories]);

  const handleAddSpec = (e) => {
    e.preventDefault();

    setSpecifications(prevState => ([...prevState, {spec: tempSpec, desc: tempSpecDesc}]));

    setTempSpec("");
    setTempSpecDesc("");
  }

  const handleRemoveSpec = (e) => {
    setEspec(specifications.filter(item => item.spec !== e.spec));
  }

  const handleAddImage = (e) => {
    e.preventDefault();

    setAddedImages(prevState => ([...prevState, URL.createObjectURL(tempImage.current.files[0])]));
  }

  const handleRemoveDBImage = (image) => {
    setDBImages(DBImages.filter(item => item !== image));
  }

  const handleRemoveAddedImage = (image) => {
    setAddedImages(addedImages.filter(item => item !== image));
  }

  const handleAddCategory = (id) => {
    const categoria = categories.findIndex((e) => e._id === id);

    let categorias = selectedCategories;
    categorias.push(categories[categoria]);

    setSelectedCategories(categorias);
  }

  const handleRemoveCategory = (id) => {
    const categoria = selectedCategories.findIndex((e) => e._id === id);

    let categorias = selectedCategories;
    categorias.splice(categoria, 1);

    setSelectedCategories(categorias);
  }

  const router = useRouter();
  const handleSave = () => {
    const data = {
      name: name,
      description: description, 
      previousPrice: previousPrice, 
      price: price, 
      shipping: shipping, 
      categories: selectedCategories, 
      specifications: specifications
    }

    if(!params.productId){ //add novo produto
      productServices.addNewProduct(data, addedImages).then((res) => {
        if(res.errors){
          setMessage({text: res.errors, type: "error"});
        }
        else{
          setMessage({text: "Produto cadastrado com sucesso.", type: "success"});
          router.push("/admin/dashboard?view=produtos");
        }
      });
    }
    else {
      productServices.updateProduct(params.productId, data, DBImages, addedImages).then((res) => {
        if(res.errors){
          setMessage({text: res.errors, type: "error"});
        }
        else{
          setMessage({text: "Produto atualizado com sucesso.", type: "success"});
          router.push("/admin/dashboard?view=produtos");
        }
      });
    }
  }

  const handleCancel = () => {
    router.push("/admin/dashboard?view=produtos");
  }

  return(
    <div id={styles.produto_container}>
      <h2>Página de Criação e Edição de Produtos</h2>
      <div id={styles.infos}>
        <h3>Infos</h3>
        <form>
          <label>
            <span>Nome:</span>
            <input type="text" placeholder="Nome do produto" onChange={(e) => setName(e.target.value)} value={name || ""}/>
          </label>
          <label>
            <span>Descrição:</span>
            <input type="text" placeholder="Descrição do produto" onChange={(e) => setDescription(e.target.value)} value={description || ""}/>
          </label>
          <label>
            <span>Preço Anterior:</span>
            <input type="number" placeholder="Preço Anterior" onChange={(e) => setPreviousPrice(e.target.value)} value={previousPrice || 0}/>
          </label>
          <label>
            <span>Preço:</span>
            <input type="number" placeholder="Preço" onChange={(e) => setPrice(e.target.value)} value={price || 0}/>
          </label>
          <label>
            <span>Frete:</span>
            <input type="number" placeholder="Frete" onChange={(e) => setShipping(e.target.value)} value={shipping || 0}/>
          </label>
        </form>
      </div>
      <div id={styles.espec}>
        <h3>Especificações</h3>
        <div id={styles.espec_infos}>
          <label>
            <span>Especificação:</span>
            <input type="text" placeholder="Espec." onChange={(e) => setTempSpec(e.target.value)} value={tempSpec || ""}/>
          </label>
          <label>
            <span>Descrição:</span>
            <input type="text" placeholder="Desc." onChange={(e) => setTempSpecDesc(e.target.value)} value={tempSpecDesc || ""}/>
          </label>
          <button onClick={handleAddSpec}>Adicionar</button>
        </div>
        <div>
          {specifications && specifications.map((e) => {
            return <div key={e.spec} className={styles.espec_add}>
              <div className={styles.left_espec}>
                <h3>{e.spec}</h3>
              </div>
              <div className={styles.right_espec}>
                <h3>{e.desc}</h3>
              </div>
              <button onClick={() => handleRemoveSpec(e)}>X</button>
            </div>
          })}
        </div>
      </div>
      <div id={styles.imagens}>
        <h3>Imagens</h3>
        <div id={styles.imagens_infos}>
          <label>
            <span>Selecione uma imagem:</span>
            <input ref={tempImage} type="file" accept="image/jpeg, image/png"/>
          </label>
          <button onClick={handleAddImage}>Adicionar</button>
        </div>
        <div>
          <div>
            {DBImages && <>
              <h3>Imagens recuperadas do Banco de Dados:</h3>
              {DBImages.map((image) => {
                return <div key={image.name} className={styles.imagem_add}>
                  <img src={image}/>
                  <button onClick={() => handleRemoveDBImage(image)}>X</button>
                </div>
              })}
            </>}
          </div>
          <div>
            {addedImages && <>
              <h3>Imagens Adicionadas:</h3>
              {addedImages.map((image) => {
                return <div key={image.name} className={styles.imagem_add}>
                  <img src={image}/>
                  <button onClick={() => handleRemoveAddedImage(image)}>X</button>
                </div>
              })}
            </>}
          </div>
        </div>
      </div>
      <div id={styles.categories}>
        <h3>Categorias</h3>
        <div>
          {categories && categories.map((category) => {
            return <div key={category._id}>
              <image src={category.image} alt={category.name}/>
              <p>{category.name}</p>
              <button onClick={() => handleAddCategory(category._id)}>Adicionar</button>
            </div>
          })}  
        </div>  
        <div>
          {selectedCategories && <>
            <h4>Categorias selecionadas:</h4>
            {selectedCategories.map((category) => {
              return <div key={category._id}>
                <p>{category.name}</p>
                <button onClick={() => handleRemoveCategory(category._id)}>Remover</button>
              </div>
            })}
          </>}
        </div>   
      </div>
      <div id={styles.end}>
        <button id={styles.save} onClick={handleSave}>Salvar</button>
        <button id={styles.cancel} onClick={handleCancel}>Cancelar</button>
      </div>
      {message && <Message msg={message.text} type={message.type} />}
    </div>
  )
}

