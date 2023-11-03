import styles from './skeleton.module.css'

export default function Skeleton() {
  return(
    <>
      <div id={styles.banner}>Loading</div>
      <div className={styles.container}>
        <div className={styles.box}>
          <img src="none" alt='image.png'/>
          <div>loading</div>
        </div>
        <div className={styles.box}>
          <img src="none" alt='image.png'/>
          <div>loading</div>
        </div>
        <div className={styles.box}>
          <img src="none" alt='image.png'/>
          <div>loading</div>
        </div>
        <div className={styles.box}>
          <img src="none" alt='image.png'/>
          <div>loading</div>
        </div>

      </div>
    </>
  )
}