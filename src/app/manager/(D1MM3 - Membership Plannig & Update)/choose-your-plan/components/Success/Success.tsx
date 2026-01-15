"use client";

import styles from "./Success.module.css";

interface Props {
  message: string;
  onClose: () => void;
}

export default function Success({ message, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <p className={styles.message}>{message}</p>
        <button className={styles.closeBtn} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
