import React from 'react';
import styles from '../../page.module.css';

interface InfoElementProps {
    value: string | number;
    unit: string;
    label: string;
}

const InfoElement: React.FC<InfoElementProps> = ({ value, unit, label }) => {
    return (
        <div className={styles.infoElement}>
            <div className={styles.infoMain}>
                <span className={styles.infoValue}>{value}</span>
                <span className={styles.infoUnit}>{unit}</span>
            </div>
            <div className={styles.infoDividerLine}></div>
            <span className={styles.infoLabel}>{label}</span>
        </div>
    );
};

export default InfoElement;