
import Loading from './loading'
import styles from './page.module.css'


export default function Home() {

  const categorias = [
    {
      id: 1,
      nome: "Categoria 1",
      img: "/images/ui/categoria_temporaria.png"
    },
    {
      id: 2,
      nome: "Categoria 2",
      img: "/images/ui/categoria_temporaria.png"
    },
    {
      id: 3,
      nome: "Categoria 3",
      img: "/images/ui/categoria_temporaria.png"
    },
    {
      id: 4,
      nome: "Categoria 4",
      img: "/images/ui/categoria_temporaria.png"
    },
    {
      id: 5,
      nome: "Categoria 5",
      img: "/images/ui/categoria_temporaria.png"
    },
    {
      id: 6,
      nome: "Categoria 6",
      img: "/images/ui/categoria_temporaria.png"
    },
    {
      id: 7,
      nome: "Categoria 7",
      img: "/images/ui/categoria_temporaria.png"
    },
    {
      id: 8,
      nome: "Categoria 8",
      img: "/images/ui/categoria_temporaria.png"
    },
  ]

  return (
    <div>
      <div id={styles.banner}>
        <h1>MyCommerce</h1>
        <p>O lugar certo para realizar seus sonhos!</p>
      </div>
      <div id={styles.categorias}>
        {categorias.map((categoria) => {
          return <div key={categoria.id}>
                  <img src={categoria.img} alt={categoria.nome}/>
                  <p>{categoria.nome}</p>
                </div>
        })}
      </div>
      <div id={styles.produtos}>
        <div className={styles.titulo}>
          <h1>O que há de melhor</h1>
        </div>
        <div className={styles.product_container}>
          <div className={styles.produto}>
            
          </div>
        </div>
      </div>
    </div>
  )
}
