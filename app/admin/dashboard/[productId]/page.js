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
  const [addedImages, setAddedImages] = useState([]); //lista de imagens adicionadas pelo usuário (url)
  const [addedImagesData, setAddedImagesData] = useState([]); //lista de objetos de imagens com data (imagem em si) e url

  const tempImage = useRef();

  //controle de categorias
  const [categories, setCategories] = useState([]); //lista de categorias recuperadas do banco de categorias
  const [selectedCategories, setSelectedCategories] = useState([]); //lista de categorias selecionadas
  const [productCategories, setProductCategories] = useState([]); //lista de categorias do produto vindo do bd

  useEffect(() => {
    //get do produto no bd caso seja update de produto
    if(params.productId && params.productId !== "AddNew"){
      productServices.getProductById(params.productId).then((res) => {
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
    if(productCategories === undefined || categories === undefined || selectedCategories === undefined){
      return;
    }

    if(productCategories.length === 0 || categories.length === 0 || selectedCategories.length !== 0){
      return;
    }
    else{
      productCategories.map((e) => {
        const index = categories.findIndex((element) => element._id === e);
        let list = selectedCategories;

        list.push(categories[index]);
        setSelectedCategories(list);
      });

      
    }
  }, [categories, productCategories]);

  const handleAddSpec = (e) => {
    e.preventDefault();

    //se o array estiver vazio
    if(specifications === undefined || specifications.length === 0) {
      setSpecifications([{spec: tempSpec, desc: tempSpecDesc}]);
    }
    else{
      setSpecifications(prevState => ([...prevState, {spec: tempSpec, desc: tempSpecDesc}]));
    }

    setTempSpec("");
    setTempSpecDesc("");
  }

  const handleRemoveSpec = (e) => {
    setSpecifications(specifications.filter(item => item.spec !== e.spec));
  }

  const handleAddImage = (e) => {
    e.preventDefault();

    const url = URL.createObjectURL(tempImage.current.files[0]);

    setAddedImages(prevState => ([...prevState, url]));
    setAddedImagesData(prevState => ([...prevState, {data: tempImage.current.files[0], url: url}]));
  }

  const handleRemoveAddedImage = (image) => {
    setAddedImages(addedImages.filter(item => item !== image));
    setAddedImagesData(addedImagesData.filter(item =>  item.url !== image));
  }

  const handleRemoveDBImage = (image) => {
    setDBImages(DBImages.filter(item => item !== image));
  }

  const handleAddCategory = (id) => {
    const categoria = categories.findIndex((e) => e._id === id);

    setSelectedCategories(prevState => ([...prevState, categories[categoria]]));
  }

  const handleRemoveCategory = (id) => {
    setSelectedCategories(selectedCategories.filter(item => item._id !== id));
  }

  const router = useRouter();
  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      description: description, 
      previousPrice: previousPrice, 
      price: price, 
      shipping: shipping, 
      categories: selectedCategories, 
      specifications: specifications
    }

    if(params.productId === "AddNew"){ //add novo produto
      productServices.addNewProduct(data, addedImagesData).then((res) => {
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
      productServices.updateProduct(params.productId, data, DBImages, addedImagesData).then((res) => {
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
            <input type="number" placeholder="Digite um valor" onChange={(e) => setPreviousPrice(e.target.value)} value={previousPrice || undefined}/>
          </label>
          <label>
            <span>Preço:</span>
            <input type="number" placeholder="Digite um valor" onChange={(e) => setPrice(e.target.value)} value={price || undefined}/>
          </label>
          <label>
            <span>Frete:</span>
            <input type="number" placeholder="Digite um valor" onChange={(e) => setShipping(e.target.value)} value={shipping || undefined}/>
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
        <div className={styles.categories_panel}>
          {categories.map((category) => {
            return <div key={category._id} className={styles.category_panel}>
              <p>{category.name}</p>
              <button className={styles.add_category_btn} onClick={() => handleAddCategory(category._id)}>Add</button>
            </div>
          })}  
        </div>  
        <h4>Categorias Selecionadas:</h4>
        <div className={styles.categories_panel}>
          {selectedCategories.map((category) => {
            return <div key={category._id} className={styles.category_panel}>
              <p>{category.name}</p>
              <button className={styles.rmv_category_btn} onClick={() => handleRemoveCategory(category._id)}>Del</button>
            </div>
          })}
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

