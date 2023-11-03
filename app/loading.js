import Image from "next/image"
import styles from "./loading.module.css"

export default function Loading(){
  return(
    <>
      <div className={styles.banner}>
        <Image src="/loading.gif" width={100} height={100}/>
      </div>
    </>
  )
}