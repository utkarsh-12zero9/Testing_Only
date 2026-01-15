import React from 'react';
import styles from './LoadingPage.module.css';
import Image from 'next/image';
import Logo from './icon/logo.svg'

const LoadingPage: React.FC = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.loader}>
        <Image alt='logo' src={Logo}
          className={styles.logo} />
      </div>
    </div>
  );
};

export default LoadingPage;
