"use client"

import styles from './navbar.module.css'
import Link from 'next/link'

import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCartFill, BsBoxArrowRight } from 'react-icons/bs'

import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@/context/store'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'


import authService from '@/services/authService'

export default function Navbar(){
  const {userSession, setUserSession} = useContext(UserContext);
  /*const [auth, loading, setUser] = useAuth();

  useEffect(() => {
    setUser(userSession);
  }, [userSession]);*/

  const router = useRouter();

  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();

    if(query){
      router.push(`/search?produto=${query}`);
    }
  }

  const handleLogout = () => {
    authService.logout();
  }

  return (
    <>
    <nav id={styles.nav}>
      <Link href="/">MyCommerce</Link>
      <form id={styles.search_form} onSubmit={handleSearch}>
        <BsSearch />
        <input type='text' placeholder='Pesquisar' onChange={(e) => setQuery(e.target.value)}/>
      </form>
      <ul id={styles.nav_links}>
        {userSession ? (
          <>
            <li>
              <Link href="/"><BsHouseDoorFill/></Link>
            </li>
            <li>
              <Link href={'/cart'}><BsFillCartFill /></Link>
            </li>
            <li>
              <Link href="/profile"><BsFillPersonFill /></Link>
            </li>
            <li>
              <span onClick={handleLogout}><BsBoxArrowRight /></span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/"><BsHouseDoorFill/></Link>
            </li>
            <li>
              <Link href="/auth/login">Entrar</Link>
            </li>
            <li>
              <Link href="/auth/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
    </>
  )
}