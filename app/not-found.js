import Link from "next/link"
import styles from "./not-found.module.css"

export default function NotFound() {
  return(
    <div className={styles.container}>
      <h1>404</h1>
      <p>Parece que esta página não existe!</p>
      <p>Clique <Link className={styles.link} href="/">aqui</Link> para voltar a página inicial</p>
    </div>
  )
}