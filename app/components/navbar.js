"use client"

import styles from './navbar.module.css'
import Link from 'next/link'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCartFill, BsBoxArrowRight } from 'react-icons/bs'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getUser } from '@/utils/userUtils'

export default function Navbar(){

  const [ auth ] = useAuth();
  const [user, setUser] = useState(getUser());

  const handleLogout = () => {
    //logout
    console.log("logout");
  }

  return (
    <>
    <nav id={styles.nav}>
      <Link href="/">MyCommerce</Link>
      <form id={styles.search_form}>
        <BsSearch />
        <input type='text' placeholder='Pesquisar'/>
      </form>
      <ul id={styles.nav_links}>
        {auth ? (
          <>
            <li>
              <Link href="/"><BsHouseDoorFill/></Link>
            </li>
            {user && 
              <li>
                <Link href={`/cart/${user._id}`}><BsFillCartFill /></Link>
              </li>
            }
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