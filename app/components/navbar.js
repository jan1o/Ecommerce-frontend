import styles from './navbar.module.css'
import Link from 'next/link'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCartFill } from 'react-icons/bs'

export default function Navbar(){
  return (
    <>
    <nav id={styles.nav}>
      <Link href="/">MyCommerce</Link>
      <form id={styles.search_form}>
        <BsSearch />
        <input type='text' placeholder='Pesquisar'/>
      </form>
      <ul id={styles.nav_links}>
        <li>
          <Link href="/"><BsHouseDoorFill/></Link>
        </li>
        <li>
          <Link href="/auth/login">Entrar</Link>
        </li>
        <li>
          <Link href="/auth/register">Cadastrar</Link>
        </li>
      </ul>
    </nav>
    </>
  )
}