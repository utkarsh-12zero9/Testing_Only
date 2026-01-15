import React from 'react';
import styles from './MembershipObjectivesPopup.module.css';
import { X } from 'lucide-react';

interface MembershipObjectivesPopupProps {
    isOpen: boolean;
    onClose: () => void;
    selectedObjectives: string[];
    onToggleObjective: (objective: string) => void;
}

const OBJECTIVES_LIST = [
    "Fat Loss",
    "Endurance Improvement",
    "Flexibility & Mobility",
    "Muscle Gain",
    "Strength Building",
    "Muscle Toning",
    "Fat Loss",
    "Endurance Improvement",
    "Flexibility & Mobility",
    "Muscle Gain",
    "Strength Building",
    "Muscle Toning",
    "Fat Loss",
    "Endurance Improvement",
    "Flexibility & Mobility",
    "Muscle Gain",
    "Strength Building",
    "Muscle Toning"
];

const MembershipObjectivesPopup: React.FC<MembershipObjectivesPopupProps> = ({
    isOpen,
    onClose,
    selectedObjectives,
    onToggleObjective
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Membership Objective</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} color="white" />
                    </button>
                </div>

                <div className={styles.grid}>
                    {OBJECTIVES_LIST.map((obj, index) => (
                        <button
                            key={`${obj}-${index}`}
                            className={`${styles.chip} ${selectedObjectives.includes(obj) ? styles.selected : ''}`}
                            onClick={() => onToggleObjective(obj)}
                        >
                            {obj}
                        </button>
                    ))}
                </div>

                <button className={styles.confirmButton} onClick={onClose}>
                    Selected ({selectedObjectives.length})
                </button>
            </div>
        </div>
    );
};

export default MembershipObjectivesPopup;
