'use client';
import React from 'react';
import styles from './PaymentSuccessful.module.css';

interface PaymentSuccessfulProps {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
}

const PaymentSuccessful: React.FC<PaymentSuccessfulProps> = ({
    isOpen,
    onClose,
    message = "Congratulations! Membership Slot is Unlocked."
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <img
                    src="/paymentIcons/success.svg"
                    alt="Payment Success"
                    className={styles.iconContainer}
                />

                <h2 className={styles.title}>Payment Successful!</h2>

                <div className={styles.divider}></div>

                <p className={styles.message}>{message}</p>

                <button className={styles.doneButton} onClick={onClose}>
                    Done
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessful;
