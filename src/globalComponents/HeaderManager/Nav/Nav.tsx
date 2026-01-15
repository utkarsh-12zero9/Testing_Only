import styles from './Nav.module.css'
import bellIcon from '../icons/bell.svg'
import hamburgorIcon from '../icons/hamburger.svg'
import Image from 'next/image'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <button className={styles.bellButton}>
        <Image src={bellIcon} width={12} height={14} alt="back button" />
        <p>4</p>
      </button>

      <button className={styles.hamburgorButton}>
        <Image src={hamburgorIcon} alt='hamburgor icon' />
      </button>
    </nav>
  )
};
