'use client';
import React, { useState } from 'react';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import SecondaryButton from '@/globalComponents/buttons/secondaryButton/SecondaryButton';
import styles from './PlanActionPopup.module.css';
import { Trash2, Pencil, Check } from 'lucide-react';
import ModalDivider from '@/globalComponents/modal/ModalDivider';

interface PlanActionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onSecondaryAction?: () => void;
    mode: 'edit' | 'delete' | 'success' | 'remove';
    planName?: string;
}

const PlanActionPopup: React.FC<PlanActionPopupProps> = ({
    isOpen,
    onClose,
    onConfirm,
    onSecondaryAction,
    mode,
}) => {
    const [isAcknowledged, setIsAcknowledged] = useState(false);

    if (!isOpen) return null;

    const config = {
        edit: {
            title: 'Want to Update your Plan?',
            description: 'An Updated plan will only be applicable to New Sign Ups.',
            requireCheckbox: false,
            primaryButtonText: 'Edit',
            primaryButtonColor: 'primary-blue' as const,
            secondaryButtonText: 'Cancel',
            showTwoActions: false,
        },
        remove: {
            title: 'Removing your Trainer?',
            description: 'Once removed, Trainer profile will be de-associated with all trainees and Membership plans',
            requireCheckbox: false,
            primaryButtonText: 'Remove',
            primaryButtonColor: 'primary-blue' as const,
            secondaryButtonText: 'Cancel',
            showTwoActions: false,
        },
        delete: {
            title: 'Want to Remove your Plan?',
            description: 'This membership plan will be permanently deleted in 26 days, based on the most recently joined member\'s validity',
            requireCheckbox: true,
            primaryButtonText: 'Delete Plan',
            primaryButtonColor: 'primary-green' as const,
            secondaryButtonText: 'Cancel',
            showTwoActions: false,
        },
        success: {
            title: 'Membership Created!',
            description: 'Your new plan is now available for members to join.',
            requireCheckbox: false,
            primaryButtonText: 'Go to plans',
            primaryButtonColor: 'primary-blue' as const,
            secondaryButtonText: 'Home',
            showTwoActions: true,
        }
    };

    const currentConfig = config[mode];

    const handleConfirm = () => {
        if (mode === 'delete' && !isAcknowledged) {
            return;
        }
        onConfirm();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <div className={styles.iconContainer}>
                    {mode === 'edit' ? (
                        <Pencil size={20} style={{ color: 'var(--bodytext-pure-white)' }} />
                    ) : mode === 'delete' ? (
                        <Trash2 size={20} style={{ color: 'var(--bodytext-pure-white)' }} />
                    ) : (
                        <Check size={20} style={{ color: 'var(--bodytext-pure-white)' }} />
                    )}
                </div>

                <h2 className={styles.title}>{currentConfig.title}</h2>

                <ModalDivider />

                <p className={mode === 'success' ? styles.successDescription : styles.description}>
                    {mode === 'delete' ? (
                        <>
                            This membership plan will be permanently deleted in <span className={styles.highlight}>26 days</span>, based on the most recently joined member's validity
                        </>
                    ) : mode === 'edit' ? (
                        <>
                            An Updated plan will only be <span className={styles.highlight}>applicable</span> to <span className={styles.highlight}>New Sign Ups</span>.
                        </>
                    ) : (
                        currentConfig.description
                    )}
                </p>

                {currentConfig.requireCheckbox && (
                    <div className={styles.checkboxContainer}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={isAcknowledged}
                                onChange={(e) => setIsAcknowledged(e.target.checked)}
                                className={styles.checkboxInput}
                            />
                            <span className={styles.customCheckbox}>
                                {isAcknowledged && (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="var(--primary-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </span>
                            <span className={styles.checkboxText}>
                                I acknowledge that this action is <span className={styles.irreversible}>irreversible</span>.
                            </span>
                        </label>
                    </div>
                )}

                <div className={styles.buttonGroup}>
                    <SecondaryButton
                        onClick={
                            currentConfig.showTwoActions
                                ? (onSecondaryAction || onClose)
                                : onClose
                        }
                        colorVariant="primary-blue"
                        className={styles.editButton}
                    >
                        {currentConfig.secondaryButtonText}
                    </SecondaryButton>

                    <PrimaryButton
                        onClick={
                            currentConfig.showTwoActions
                                ? onConfirm
                                : handleConfirm
                        }
                        colorVariant={currentConfig.primaryButtonColor}
                        disabled={
                            !currentConfig.showTwoActions &&
                            currentConfig.requireCheckbox &&
                            !isAcknowledged
                        }
                        className={
                            currentConfig.showTwoActions
                                ? styles.equalButton
                                : styles.savePlanButton
                        }
                    >
                        {currentConfig.primaryButtonText}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default PlanActionPopup;
