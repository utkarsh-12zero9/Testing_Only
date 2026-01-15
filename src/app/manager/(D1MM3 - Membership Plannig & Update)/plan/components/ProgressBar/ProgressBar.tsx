import React, { useMemo } from 'react';
import { FileText, BadgeCheck, Banknote, UserCheck } from 'lucide-react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
    currentStep?: number;
}

function ProgressBar({ currentStep = 1 }: ProgressBarProps) {
    // Memoize steps array to prevent recreation on every render
    const steps = useMemo(() => [
        { icon: <FileText className={styles.icon} />, label: "Details" },
        { icon: <BadgeCheck className={styles.icon} />, label: "Verify" },
        { icon: <Banknote className={styles.icon} />, label: "Payment" },
        { icon: <UserCheck className={styles.icon} />, label: "Profile" },
    ], []);

    return (
        <div className={styles.container}>
            {steps.map((step, index) => {
                const isActive = index + 1 <= currentStep;
                const isConnectorActive = index + 1 < currentStep;

                return (
                    <div key={index} className={styles.stepWrapper}>
                        <div className={`${styles.stepCircle} ${isActive ? styles.active : ''}`}>
                            {step.icon}
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`${styles.connector} ${isConnectorActive ? styles.activeConnector : ''}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default React.memo(ProgressBar);
