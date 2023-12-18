"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react"

import userServices from "@/services/userServices"

import Message from "@/app/components/message"


export default function Infos() {
  const [user, setUser] = useState({name: "", birth: "", telephone: "", image: "", email: "", password: ""});

  const [message, setMessage] = useState({});

  useEffect(() => {
    //setUsuario({nome: "Jânio Fernandes", nascimento: "14/09/1998", telefone: "84999163036", imagem: "/images/ui/categoria_temporaria.png", email: "janiojr14@hotmail.com", login: "Jan1o", senha: "janio123"});
    let userGet = null;
    getUserData().then((res) => setUser({name: res.name, telephone: res.telephone, image: res.image, email: res.email, password: ""}));

  }, []);

  const getUserData = async() => {
    const res = await userServices.getUser();
    return res;
  }


  const handleSubmit = async() => {
    const res = await fetch(api + "/users/")
    const status = res.status;
    await res.json();

    //error
    if(status === 422){
      setMessage({text: await res.json(), type: error});
    }
    //ok
    else if(status === 200){
      setUser({name: res.name, birth: res.birth, telephone: res.telephone, image: res.image, email: res.email, password: ""});
      setMessage({text: "Usuário atualizado com sucesso.", type: "success"});
    }
    
  }

  return(
    <div id={styles.infos_container}>
      <h2>Edite seus dados</h2>
      <div>
        <section>
          <p className={styles.subtitle}>Adicione uma imagem de perfil, queremos te conhecer ...</p>
          <img id={styles.img_perfil} src={user.image} alt={user.name} />
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
            <input type="file" onChange={(e) => setUsuario(prevState => ({...prevState, image: e.target.files[0]}))}/>
          </label>
          <label>
            <span>Quer alterar sua senha?</span>
            <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} value={user.password || ""}/>
          </label>
          <input type="submit" value="Atualizar" />
          {message && <Message msg={message.text} type={message.type}/>}
        </form>
      </div>
    </div>
  )
}