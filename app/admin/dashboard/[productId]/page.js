"use client"

import styles from "./style.module.css"

import { useState, useRef } from "react"

export default function Product({ params }){

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [precoAnterior, setPrecoAnterior] = useState();
  const [preco, setPreco] = useState();
  const [frete, setFrete] = useState();
  const [imagens, setImagens] = useState([]);
  const [espec, setEspec] = useState([]);

  const [tempEspec, setTempEspec] = useState("");
  const [tempEspecDesc, setTempEspecDesc] = useState("");

  const tempImage = useRef();

  const handleAddEspec = () => {
    setEspec(prevState => ([...prevState, {espec: tempEspec, desc: tempEspecDesc}]));

    setTempEspec("");
    setTempEspecDesc("");
  }

  const handleRemoveEspec = (e) => {
    setEspec(espec.filter(item => item.espec !== e.espec));
  }

  const handleAddImage = () => {

    const img = new Image();
    img.src = URL.createObjectURL(tempImage.current.files[0]);

    img.onload = () => {
      setImagens(prevState => ([...prevState, img.src]));
    }

  }

  const handleRemoveImage = (image) => {
    setImagens(imagens.filter(item => item !== image));
  }

  return(
    <div>
      <h2>Página de Criação e Edição de Produtos</h2>
      <div>
        <form>
          <label>
            <span>Nome:</span>
            <input type="text" placeholder="Nome do produto" onChange={(e) => setNome(e.target.value)} value={nome || ""}/>
          </label>
          <label>
            <span>Descrição:</span>
            <input type="text" placeholder="Descrição do produto" onChange={(e) => setDescricao(e.target.value)} value={descricao || ""}/>
          </label>
          <label>
            <span>Preço Anterior:</span>
            <input type="number" placeholder="Preço Anterior" onChange={(e) => setPrecoAnterior(e.target.value)} value={precoAnterior || 0}/>
          </label>
          <label>
            <span>Preço:</span>
            <input type="number" placeholder="Preço" onChange={(e) => setPreco(e.target.value)} value={preco || 0}/>
          </label>
          <label>
            <span>Frete:</span>
            <input type="number" placeholder="Frete" onChange={(e) => setFrete(e.target.value)} value={frete || 0}/>
          </label>
        </form>
      </div>
      <div>
        <div>
          <label>
            <span>Especificação:</span>
            <input type="text" placeholder="Espec." onChange={(e) => setTempEspec(e.target.value)} value={tempEspec || ""}/>
          </label>
          <label>
            <span>Descrição:</span>
            <input type="text" placeholder="Desc." onChange={(e) => setTempEspecDesc(e.target.value)} value={tempEspecDesc || ""}/>
          </label>
          <button onClick={handleAddEspec}>Adicionar</button>
        </div>
        <div>
          {espec && espec.map((e) => {
            return <div key={e.espec}>
              <h3>{e.espec}</h3>
              <h3>{e.desc}</h3>
              <button onClick={() => handleRemoveEspec(e)}>Remover</button>
            </div>
          })}
        </div>
      </div>
      <div>
        <div>
          <label>
            <span>Selecione uma imagem:</span>
            <input ref={tempImage} type="file" accept="image/jpeg, image/png"/>
          </label>
          <button onClick={handleAddImage}>Adicionar</button>
          </div>
        <div>
          {imagens && imagens.map((imagem) => {
            return <div>
              <img src={imagem} width={50} height={50}/>
              <button onClick={() => handleRemoveImage(imagem)}>Remover</button>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

