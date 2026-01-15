/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import styles from './styles/ObjectiveCard.module.css'


function ObjectiveCard({objectiveData} : any) {
  return (
    <div className={styles.objectiveCard}>
        <div className={styles.iconContainer}>
            <Image src={objectiveData.icon} alt='' height={30} width={30}/>
        </div>
        <div>
          <h1 >{objectiveData.title}</h1>
          <p>{objectiveData.desc}</p>
        </div>
    </div>
  )
}

export default ObjectiveCard