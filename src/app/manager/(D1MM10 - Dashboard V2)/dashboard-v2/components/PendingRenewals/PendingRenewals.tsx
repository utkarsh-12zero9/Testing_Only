"use client";
import Image from "next/image";
import styles from "./PendingRenewals.module.css";

import pendingIcon from '../../icons/pendingRenewal.svg';
import arrowIcon from '../../icons/down-arrow.svg';
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";

type PendingRenewalsProps = {
  pendingRenewals: {
    currentCount: number;
    percentageChange: number;
  }
}

export default function PendingRenewals({ pendingRenewals }: PendingRenewalsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconHolder}>
        <div className={styles.icon}>
          <Image
            src={pendingIcon}
            alt="Pending Renewals Icon"
            width={15}
            height={16}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.numberContainer}>
          <p className={styles.number}>{pendingRenewals?.currentCount || 0}</p>
          <span className={styles.pending}>Pending Renewals</span>
        </div>
        <hr className={styles.hr} />
        
        <div className={styles.trendInfo}>
          <div className={styles.arrowIcon}>
            <Image src={arrowIcon} alt="Trend Arrow" width={6} height={7} />
          </div>
          <div className={styles.trendText}>
            <span className={styles.trendPercent}>{pendingRenewals?.percentageChange}%</span>
            <span className={styles.trendLabel}>Expired Memberships</span>
          </div>
        </div>
      </div>
      
      <PrimaryButton colorVariant="warning-red" onClick={() => { }}>View</PrimaryButton>
    </div>
  );
}
