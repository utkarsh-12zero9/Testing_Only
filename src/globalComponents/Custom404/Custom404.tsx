import styles from './Custom404.module.css';
import Image from 'next/image';
import Breack_Logo from './icons/BreackLogo.svg'
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className={styles.container}>
        <Image src={Breack_Logo} width={0} height={0} className={styles.logo} alt={'logo'}/>
      <h1 className={styles.title}>💀 Oops! Looks Like We Broke Something!</h1>
      <p className={styles.message}>The page you’re looking for isn’t here—maybe it skipped leg day? 🏋️‍♂️</p>
      <Link href="/" className={styles.backLink}>Go Back To Homepage!</Link>
    </div>
  );
};

export default Custom404;
