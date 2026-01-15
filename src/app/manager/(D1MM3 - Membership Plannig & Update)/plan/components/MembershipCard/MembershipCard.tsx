'use client';
import React, { useCallback } from 'react';
import styles from './MembershipCard.module.css';

interface MembershipCardProps {
    planName: string;
    price: number;
    duration: number;
    validity: number;
    maxUsers: number;
    status: 'Upcoming' | 'Active' | 'Expired' | 'Exhausted';
}

const MembershipCard: React.FC<MembershipCardProps> = ({
    planName,
    price,
    duration,
    validity,
    maxUsers,
    status
}) => {
    const getStatusButton = useCallback(() => {
        switch (status) {
            case 'Upcoming':
                return <button className={styles.activateButton}>Activate</button>;
            case 'Active':
                return <button className={styles.upgradeButton}>Upgrade</button>;
            case 'Expired':
                return <button className={styles.renewButton}>Renew</button>;
            case 'Exhausted':
                return <button className={styles.upgradeButton}>Upgrade</button>;
            default:
                return null;
        }
    }, [status]);

    const getStatusClass = useCallback(() => {
        switch (status) {
            case 'Active':
                return styles.statusActive;
            case 'Expired':
                return styles.statusExpired;
            case 'Upcoming':
                return styles.statusUpcoming;
            case 'Exhausted':
                return styles.statusUpcoming;
            default:
                return '';
        }
    }, [status]);

    return (
        <div className={styles.card}>
            <div className={styles.iconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.topRow}>
                    <div className={styles.planInfo}>
                        <h4 className={styles.planName}>{planName}</h4>
                        <p className={styles.price}>
                            <span className={styles.currency}>INR {price}</span>
                            <span className={styles.priceLabel}>Per Month</span>
                        </p>
                    </div>
                    {getStatusButton()}
                </div>

                <div className={styles.statusRow}>
                    <span className={`${styles.status} ${getStatusClass()}`}>{status}</span>
                    <span className={styles.separator}>|</span>
                    <span className={styles.otherStatus}>{duration} Free Slots</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.otherStatus}>{validity} Days Validity</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.otherStatus}>{maxUsers} Max Users</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MembershipCard);
