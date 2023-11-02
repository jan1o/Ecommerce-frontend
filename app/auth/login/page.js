"use client"

import styles from './style.module.css'

import Loading from '@/app/loading'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useAuth } from '@/hooks/useAuth'

import Message from '@/app/components/message'

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [responseState, setResponseState] = useState(false);

  const [auth, loading] = useAuth();

  const handleSubmit = () => {
    return;
  }

  const router = useRouter();
  const redirect = () => {
    router.push("/");
  }

  if(loading){
    return <Loading />
  }
  if(auth){
    return redirect()
  } else {
    return(
      <div id={styles.login}>
        <h2>MyCommerce</h2>
        <p className={styles.subtitle}>Faça login para acessar nossas ferramentas</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome de Usuário" onChange={(e) => setUsername(e.target.value)} value={username || ''} />
          <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ''} />
          <input type="submit" value="Entrar" />
          {responseState && <Message msg={responseState} type="error"/>}
        </form>
        <p>Não tem uma conta? <Link href="/register">Clique aqui</Link></p>
      </div>
    )
  }
}