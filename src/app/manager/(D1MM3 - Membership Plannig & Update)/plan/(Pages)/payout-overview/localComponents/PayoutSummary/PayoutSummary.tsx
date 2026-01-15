import React, { useState } from 'react';
import Image from 'next/image';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import SecondaryButton from '@/globalComponents/buttons/secondaryButton/SecondaryButton';
import ModalDivider from '@/globalComponents/modal/ModalDivider';
import styles from './PayoutSummary.module.css';

interface PayoutSummaryProps {
    totalPayout?: number;
    totalPlanCharges?: number;
    onEdit?: () => void;
    onAccept?: () => void;
}

export default function PayoutSummary({
    totalPayout = 0,
    totalPlanCharges = 0,
    onEdit,
    onAccept
}: PayoutSummaryProps) {
    const [taxConsent, setTaxConsent] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(true);

    const handleAccept = () => {
        if (termsAccepted && onAccept) {
            onAccept();
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <Image src="/paymentIcons/bag.svg" alt="" height={25} width={25} />
                <h2 className={styles.title}>Pay-out Summary</h2>
            </div>

            {/* Instructions */}
            <div className={styles.instructions}>
                <h3 className={styles.instructionsTitle}>Instructions</h3>
                <p className={styles.instructionsText}>
                    The total plan charges will be the sum total of your Expected pay-out and additional charges given below.
                </p>
            </div>

            {/* Divider */}
            <ModalDivider />

            {/* Total Pay-Out */}
            <div className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Total Pay-Out</span>
                <span className={styles.fieldValue}>INR {totalPayout}/-</span>
            </div>

            {/* Divider */}
            <ModalDivider />

            {/* Total Plan Charges */}
            <div className={styles.chargesSection}>
                <h3 className={styles.chargesTitle}>Total Plan Charges</h3>
                <span className={styles.chargesValue}>INR {totalPlanCharges} /-</span>
            </div>

            {/* Checkboxes */}
            <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={taxConsent}
                        onChange={(e) => setTaxConsent(e.target.checked)}
                        className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                        I consent for any tax deduction at source to be charged from the pay-out, if applicable
                    </span>
                </label>

                <label className={`${styles.checkboxLabel} ${styles.accepted}`}>
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className={styles.checkbox2}
                    />
                    <span className={styles.checkboxText}>
                        I accept the terms and conditions and acknowledge that I have read and agree to abide by the company's policies and guidelines.
                    </span>
                </label>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonContainer}>
                <SecondaryButton onClick={onEdit || (() => { })} className={styles.editButton}>
                    Edit
                </SecondaryButton>
                <PrimaryButton
                    onClick={handleAccept}
                    className={styles.acceptButton}
                    disabled={!termsAccepted}
                >
                    Accept & Continue
                </PrimaryButton>
            </div>
        </div>
    );
}
