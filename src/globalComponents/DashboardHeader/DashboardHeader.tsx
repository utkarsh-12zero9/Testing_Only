import styles from './DashboardHeader.module.css'
import PrimaryButton from '../buttons/primaryButton/PrimaryButton';

import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  profilePicture: string;
  fullName: string
}

export default function DashboardHeader({ profilePicture, fullName }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div>
        {
          profilePicture && <img src={profilePicture} className={styles.profilePicture} />
        }
      </div>
      <div className={styles.headerDiv}>
        <span className={styles.name}>Hi {fullName}</span>
        <p className={styles.tagline}>
          This is <span>Rablo..</span>
        </p>
      </div>
      <div className={styles.logout}>
        <PrimaryButton
          onClick={() => {
            localStorage.clear();
            router.push("/manager/login");
          }}
        >Logout</PrimaryButton>
      </div>
    </div>
  )
};