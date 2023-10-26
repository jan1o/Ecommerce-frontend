
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <div>
        <p id={styles.ola}>Olá</p>
        <div>
          <p id={styles.mundo}>Mundo!</p>
        </div>
      </div>
    </>
  )
}
