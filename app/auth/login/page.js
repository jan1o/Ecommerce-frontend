"use client"

import styles from './style.module.css'

import Loading from '@/app/loading'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useAuth } from '@/hooks/useAuth'
import authService from '@/services/authService'

import Message from '@/app/components/message'

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [responseState, setResponseState] = useState(false);

  const [auth, loading, getUserInformations] = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }

    const res = authService.login(data).then(redirect());
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
          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email || ''} />
          <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ''} />
          <input type="submit" value="Entrar" />
          {responseState && <Message msg={responseState} type="error"/>}
        </form>
        <p>Não tem uma conta? <Link href="/auth/register">Clique aqui</Link></p>
      </div>
    )
  }
}