import React, { useState } from 'react';
import styles from './MembershipObjectivesSection.module.css';

interface MembershipObjectivesSectionProps {
    objectives: string[];
    selectedObjectives: string[];
    onObjectiveToggle: (objective: string) => void;
}

export default function MembershipObjectivesSection({
    objectives,
    selectedObjectives,
    onObjectiveToggle
}: MembershipObjectivesSectionProps) {
    const [showAll, setShowAll] = useState(false);

    return (
        <div className={styles.formSection}>
            <label className={styles.label}>
                Membership Objectives
                <span className={styles.optionalText}>(Select at-least four options)</span>
            </label>

            <div className={styles.objectivesGrid}>
                {(showAll ? objectives : objectives.slice(0, 6)).map((obj, index) => (
                    <button
                        key={`${obj}-${index}`}
                        className={`${styles.objectiveChip} ${selectedObjectives.includes(obj) ? styles.selected : ''}`}
                        onClick={() => onObjectiveToggle(obj)}
                    >
                        {obj}
                    </button>
                ))}
                {!showAll && (
                    <button
                        className={styles.objectiveChipSeeAll}
                        onClick={() => setShowAll(true)}
                    >
                        See all..
                    </button>
                )}
            </div>
        </div>
    );
}
