'use client';

import styles from './page.module.css';

import HeaderManager from "@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader";
import Heading from '@/globalComponents/Heading/Heading';
import Form from './components/Form';
import { usePathname } from "next/navigation";
import BottomNav from '@/globalComponents/BottomNav/BottomNav';

export default function page() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <HeaderManager moduleName="Business Account" />
      <main className={styles.mainArea}>
        <Heading
          title="Business Profile"
          description="Share Your Business with the World"
        />
        <div className={styles.blurWrapper}>
          <div className={styles.blurBackground}></div>
          <div className={styles.content}>
            <Form />
          </div>
        </div>
      </main>
      <BottomNav pathname={pathname} />
    </div>
  )
};
