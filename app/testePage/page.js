'use client'

import styles from './testePage.module.css'

import Botao from '../components/botao'

export default function TestePage() {
  return(
    <>
      <p id={styles.teste}>Testando 123</p>
      <Botao />
    </>
  )
}