import styles from "./productCard.module.css"

export default function ProductCard({ name, image, likes, previousPrice, price }){
  return(
    <div className={styles.produto}>
      <img src={image} alt={name} />
      <p>{name}</p>
      <div>
        <img src="/like" />
        <p>{likes}</p>
      </div>
      <h4>{previousPrice}</h4>
      <h2>{price}</h2>
    </div>
  )
}