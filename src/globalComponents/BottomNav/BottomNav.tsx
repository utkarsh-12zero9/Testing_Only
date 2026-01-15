"use client";
import styles from "./BottomNav.module.css";
import Link from "next/link";

type BottomNavProps = {
  pathname: string;
};

export default function BottomNav({ pathname }: BottomNavProps) {
  const isHome = pathname === "/manager/";
  const isProfile = pathname === "/profile";
  return (
    <nav className={styles.navContainer}>
      {/* Home */}
      <Link href="/manager/" className={`${styles.navItem} ${isHome ? styles.active : ""}`}>
        <img src={isHome ? "/dashboard/Home_active.svg" : "/dashboard/HomeIcon.svg"} alt="Home" />
      </Link>

      {/*  QR */}
      <div className={styles.qrWrapper}>
        <div className={styles.qrButton}>
          <img src="/dashboard/qr_icon.svg" alt="QR" />
        </div>
      </div>

      {/* Profile */}
      <Link href="/profile" className={`${styles.navItem} ${isProfile ? styles.active : ""}`}>
        <img src={isProfile ? "/dashboard/User_active.svg" : "/dashboard/UserIcon.svg"} alt="Profile" />
      </Link>
    </nav>
  );
}
