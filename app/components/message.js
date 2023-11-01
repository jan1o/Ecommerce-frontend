import styles from './message.module.css'

export default function Message({msg, type}) {
  return(
    <>
      {type === "error" && 
        <div className={styles.message} id={styles.error}>
          <p>{msg}</p>
        </div>
      }
      {type === "success" &&
        <div className={styles.message} id={styles.success}>
          <p>{msg}</p>
        </div>
      }
    </>
  )
}