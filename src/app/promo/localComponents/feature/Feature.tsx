import Image from "next/image"
import styles from "./Feature.module.css"

interface itemProps {
    id: number,
    imgUrl: string,
    desc: string
}

interface FeatureProps {
    item: itemProps
}
function Feature({item} : FeatureProps) {
  return (
    <div className={styles.feature}>
          <div><Image src={item.imgUrl} alt="" height={16} width={16} /></div>
        <p>{item.desc}</p>
    </div>
  )
}

export default Feature