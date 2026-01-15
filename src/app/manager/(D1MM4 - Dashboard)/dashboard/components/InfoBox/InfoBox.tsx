import styles from "./InfoBox.module.css";

export default function InfoBox() {
  return (
    <>
      <div className={styles.quickInfo}>
        <div className={styles.lockBox}>
          <img src="/dashboard/lockIcon.svg" />
        </div>
        <div className={styles.lockBox}>
          <img src="/dashboard/lockIcon.svg" />
        </div>
      </div>
      <div className={styles.inforBox}>
        <img src="/dashboard/lockIcon.svg" />
      </div>
    </>
  )
};
