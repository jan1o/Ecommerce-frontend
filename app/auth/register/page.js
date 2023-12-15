"use client"

import styles from './style.module.css'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

import { useSelector, useDispatch } from "react-redux"
import {register, reset} from "@/slices/authSlice"

import Loading from '@/app/loading';
import Message from '@/app/components/message';

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    };

    dispatch(register(user));
  };

  //clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);


  //redirect
  const [auth, load] = useAuth();

  const router = useRouter();

  const redirect = () => {
    router.push("/");
  }

  if(load){
    return <Loading />
  }
  if(auth){
    return redirect()
  } else {
    return (
      <div id={styles.register}>
        <h2>MyCommerce</h2>
        <p className={styles.subtitle}>Cadastre-se para realizar compras.</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          {!loading && <input type="submit" value="Cadastrar" />}
          {loading && <input type="submit" value="Aguarde..." disabled />}
          {error && <Message msg={error} type="error"/>}
        </form>
        <p>
          Já tem conta? <Link href="/auth/login">Clique aqui.</Link>
        </p>
      </div>
    )
  }
}