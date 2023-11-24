"use client"

import styles from "./style.module.css"

import { useState, useRef } from "react"

import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const handleSave = () => {
    router.push("/admin/dashboard?view=produtos");
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
      <div id={styles.espec}>
        <h3>Especificações</h3>
        <div id={styles.espec_infos}>
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
            return <div key={e.espec} className={styles.espec_add}>
              <div className={styles.left_espec}>
                <h3>{e.espec}</h3>
              </div>
              <div className={styles.right_espec}>
                <h3>{e.desc}</h3>
              </div>
              <button onClick={() => handleRemoveEspec(e)}>X</button>
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
          {imagens && imagens.map((imagem) => {
            return <div key={imagem.nome} className={styles.imagem_add}>
              <img src={imagem}/>
              <button onClick={() => handleRemoveImage(imagem)}>X</button>
            </div>
          })}
        </div>
      </div>
      <div id={styles.end}>
        <button id={styles.save} onClick={handleSave}>Salvar</button>
        <button id={styles.cancel} onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  )
}

