"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react"

import userServices from "@/services/userServices"

import Message from "@/app/components/message"


export default function Infos() {
  const [user, setUser] = useState({name: "", birth: "", telephone: "", image: "", email: "", password: ""});

  const [profileImage, setProfileImage] = useState();

  const [message, setMessage] = useState({});

  useEffect(() => {
    userServices.getUser().then((res) => setUser({name: res.name, birth: res.birth, telephone: res.telephone, image: res.image, email: res.email, password: ""}));

  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    //build form data
    const userData = {}

    if(user.name) {
      userData.name = user.name;
    }
    if(user.birth){
      userData.birth = user.birth;
    }
    if(user.telephone){
      userData.telephone = user.telephone
    }
    if(profileImage){
      userData.image = profileImage;
    }
    if(user.password){
      userData.password = user.password;
    }

    userServices.updateUser(userData).then((res) => {
      if(res.errors){
        setMessage({text: res.errors[0], type: "error"});
      }
      else{
        console.log("Imagem: " + res.image);
        setUser({name: res.name, birth: res.birth, telephone: res.telephone, image: res.image, email: res.email, password: ""});
        setMessage({text: "Usuário atualizado com sucesso.", type: "success"});
      }
    });

    
  }

  return(
    <div id={styles.infos_container}>
      <h2>Edite seus dados</h2>
      <div>
        <section>
          <p className={styles.subtitle}>Adicione uma imagem de perfil, queremos te conhecer ...</p>
          {(user.image || profileImage) && <img id={styles.img_perfil} src={profileImage ? URL.createObjectURL(profileImage) : user.image} alt={user.name} />}
        </section>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input type="text" placeholder="Nome" onChange={(e) => setUser(prevState => ({...prevState, name: e.target.value}))} value={user.name || ""}/>
          </label>
          <label>
            <span>Data de nascimento:</span>
            <input type="text" placeholder="Data de Nascimento" onChange={(e) => setUser(prevState => ({...prevState, birth: e.target.value}))} value={user.birth || ""} />
          </label>
          <label>
            <span>Telefone:</span>
            <input type="tel" placeholder="Telefone" onChange={(e) => setUser(prevState => ({...prevState, telephone: e.target.value}))} value={user.telephone || ""} />
          </label>
          <label>
            <span>Email:</span>
            <input type="email" placeholder="Email" disabled value={user.email || ""}/>
          </label>
          <label>
            <span>Image do Perfil:</span>
            <input type="file" onChange={(e) => {setProfileImage(e.target.files[0]); setUser(prevState => ({...prevState, image: URL.createObjectURL(e.target.files[0])}))}}/>
          </label>
          <label>
            <span>Quer alterar sua senha?</span>
            <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setUser(prevState => ({...prevState, password: e.target.value}))} value={user.password || ""}/>
          </label>
          <input type="submit" value="Atualizar" />
          {message && <Message msg={message.text} type={message.type}/>}
        </form>
      </div>
    </div>
  )
}