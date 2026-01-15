/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import styles from './styles/Enquire.module.css'
import arrow1 from './icons/right-arrow1.svg'
import arrow2 from './icons/right-arrow2.svg'
function EnquireButton({ type, action }: { type: number, action: any }) {
  return (
    <div className={styles.enquireButton} onClick={() => action("contactSection")} style={{
      backgroundColor: type === 1 ? "" : "var(--primary-green)",

    }}>
      <p style={{
        color: type === 1 ? "" : "var(--bodytext-dark-green)"
      }}>Enquire Now</p>
      <div style={{
        backgroundColor: type === 1 ? "" : "var(--bodyfill-dark-green)"
      }}>
        <Image src={type === 1 ? arrow1 : arrow2} alt='' height={20} width={20} />
      </div>
    </div>
  )
}

export default EnquireButton