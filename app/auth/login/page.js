"use client"

import styles from './style.module.css'

import Loading from '@/app/loading'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useDispatch, useSelector } from "react-redux";
import {login, reset} from "@/slices/authSlice"

import { useAuth } from '@/hooks/useAuth'

import Message from '@/app/components/message'

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loading, error} = useSelector((state) => state.auth);

  const [auth, load] = useAuth();

  const dispatch = useDispatch()
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    dispatch(login(user));
  }

  //Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const redirect = () => {
    router.push("/");
  }

  if(load){
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
          {!loading && <input type="submit" value="Entrar" />}
          {loading && <input type="submit" value="Aguarde..." disabled />}
          {error && <Message msg={error} type="error"/>}
        </form>
        <p>Não tem uma conta? <Link href="/auth/register">Clique aqui</Link></p>
      </div>
    )
  }
}