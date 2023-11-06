
import Loading from './loading'
import styles from './page.module.css'

export default function Home() {
  return (
    <div>
      <div id={styles.banner}>
        <h1>MyCommerce</h1>
        <p>O lugar certo para realizar seus sonhos!</p>
      </div>
      <div id={styles.categorias}>
        <div>
          <img src="/images/ui/categoria_temporaria.png" alt='image'/>
          <p>Categoria 1</p>
        </div>
        <div>
          <img src="/images/ui/categoria_temporaria.png" alt='image'/>
          <p>Categoria 2</p>
        </div>
        <div>
          <img src="/images/ui/categoria_temporaria.png" alt='image'/>
          <p>Categoria 3</p>
        </div>
        <div>
          <img src="/images/ui/categoria_temporaria.png" alt='image'/>
          <p>Categoria 4</p>
        </div>
      </div>
      <div id={styles.produtos}>
        produtos
      </div>
    </div>
  )
}
