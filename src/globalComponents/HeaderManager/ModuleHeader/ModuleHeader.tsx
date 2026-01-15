import styles from './ModuleHeader.module.css'
import Image from 'next/image';

import backIcon from '../icons/back.svg'
import Nav from '../Nav/Nav';

interface HeaderManagerModuleProps {
  moduleName: string;
}

export default function HeaderManagerModule({ moduleName }: HeaderManagerModuleProps) {
  return (
    <header className={styles.header}>
      <div className={styles.leftFrame}>
        <button>
          <Image src={backIcon} width={6} height={12} alt="back button" />
        </button>
        <p>{moduleName}</p>
      </div>

      <Nav />
    </header>
  )
};
