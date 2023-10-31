"use client"

import Link from 'next/link';
import styles from './style.module.css'

import { useState, useEffect } from 'react'

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user);
  }

  return (
    <div id={styles.register}>
      <h2>MyCommerce</h2>
      <p className={styles.subtitle}>Cadastre-se para realizar compras.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link href="/auth/login">Clique aqui.</Link>
      </p>
    </div>
  )
}