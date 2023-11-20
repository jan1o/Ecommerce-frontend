import styles from "./productCard.module.css"

export default function ProductCard({ nome, imagem, likes, precoAnterior, preco }){
  return(
    <div className={styles.produto}>
      <img src={imagem} alt={nome} />
      <p>{nome}</p>
      <div>
        <img src="/like" />
        <p>{likes}</p>
      </div>
      <h4>{precoAnterior}</h4>
      <h2>{preco}</h2>
    </div>
  )
}