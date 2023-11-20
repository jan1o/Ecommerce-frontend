import styles from "./categoryCard.module.css"

export default function CategoryCard({ nome, imagem }){
  return(
    <div className={styles.categoria}>
      <img src={imagem} alt={nome}/>
      <p>{nome}</p>
    </div>
  )
}