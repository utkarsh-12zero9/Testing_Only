'use client';
import React from 'react';
import styles from './LockedSlotPopup.module.css';

interface LockedSlotPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onBuyNow: () => void;
    title?: string;
    description?: string;
}

const LockedSlotPopup: React.FC<LockedSlotPopupProps> = ({
    isOpen,
    onClose,
    onBuyNow,
    title = "This slot is locked!",
    description = "You can buy this slot to create more plans for your customers."
}) => {
    if (!isOpen) return null;

    const handleBuyNow = () => {
        onBuyNow();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <div className={styles.iconContainer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h2 className={styles.title}>{title}</h2>

                <div className={styles.divider}></div>

                <p className={styles.description}>
                    {description}
                </p>

                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.buyButton} onClick={handleBuyNow}>
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LockedSlotPopup;
