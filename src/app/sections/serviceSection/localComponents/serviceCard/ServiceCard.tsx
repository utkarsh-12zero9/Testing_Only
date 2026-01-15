import { convertGoogleDriveLink } from '@/lib/convertGoogleDriveLink';
import styles from './ServiceCard.module.css'
import Image from 'next/image';

interface itemProps {
    icon : string,
    description: string,
    label: string,
    value: string
}

interface cardProps{
    item : itemProps
}

function ServiceCard({item} : cardProps) {

  const convertedUrl = convertGoogleDriveLink(item.icon);
  return (
    <div className={styles.serviceCard}>
        <Image src={convertedUrl} alt={item.label} height={40} width={40}/>
        <div className={styles.text}>
            <h1>{item.label}</h1>
            <p>{item.description}</p>
        </div>
    </div>
  )
}

export default ServiceCard