import styles from './Feature.module.css'
import feature from '../../icons/feature.svg'
import Image from 'next/image'
interface FeatureProps {
  item: string
}
function Feature({item} : FeatureProps) {
  return (
    <div className={styles.feature}>
        <Image src={feature} alt="KeyFeatureImage" height={10} width={10}/>
        <p>{item}</p>
    </div>
  )
}

export default Feature