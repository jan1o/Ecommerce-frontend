"use client"

import styles from "./style.module.css"

import { useState, useEffect } from "react"

export default function Infos() {
  const [usuario, setUsuario] = useState({nome: "", nascimento: "", telefone: "", imagem: "", email: "", login: "", senha: ""});

  useEffect(() => {
    setUsuario({nome: "Jânio Fernandes", nascimento: "14/09/1998", telefone: "84999163036", imagem: "/images/ui/categoria_temporaria.png", email: "janiojr14@hotmail.com", login: "Jan1o", senha: "janio123"});
  }, [])

  const handleSubmit = () => {
    return;
  }

  return(
    <div>
      <h2>Edite seus dados</h2>
      <p className={styles.subtitle}>Adicione uma imagem de perfil, queremos te conhecer ...</p>
      <img src={usuario.imagem} alt={usuario.nome} />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setUsuario(prevState => ({...prevState, nome: e.target.value}))} value={usuario.nome || ""}/>
        <input type="text" placeholder="Data de Nascimento" onChange={(e) => setUsuario(prevState => ({...prevState, nascimento: e.target.value}))} value={usuario.nascimento || ""} />
        <input type="tel" placeholder="Telefone" onChange={(e) => setUsuario(prevState => ({...prevState, telefone: e.target.value}))} value={usuario.telefone || ""} />
        <input type="email" placeholder="Email" disabled value={usuario.email || ""}/>
        <label>
          <span>Image do Perfil:</span>
          <input type="file" onChange={(e) => setUsuario(prevState => ({...prevState, imagem: e.target.files[0]}))}/>
        </label>
        <label>
          <span>Deseja mudar seu nome de usuário?</span>
          <input type="text" placeholder="Digite seu novo usuario" onChange={(e) => setUsuario(prevState => ({...prevState, login: e.target.value}))} value={usuario.login || ""}/>
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} value={usuario.senha || ""}/>
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  )
}