"use client"

import styles from "./style.module.css"

import { useSearchParams } from 'next/navigation'

export default function Search() {

  const searchParams = useSearchParams();
  const categoria = searchParams.get('categoria');
  const produto = searchParams.get('produto');

  return (
    <>
      <h1>Sua pesquisa:</h1>
      {categoria && <h2>Categoria: {categoria}</h2>}
      {produto && <h2>Produto: {produto}</h2>}
    </>
  )
}