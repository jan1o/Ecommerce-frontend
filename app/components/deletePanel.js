import styles from './deletePanel.module.css'

export default function DeletePanel({ text, functionYes, functionNo }){
  return(
    <div id={styles.container}>
      <h3>{text}</h3>
      <div>
        <button id={styles.btn_yes} onClick={functionYes}>Sim</button>
        <button id={styles.btn_no} onClick={functionNo}>Não</button>
      </div>
    </div>
  )
}