import React from 'react';
import styles from './MembershipNameInput.module.css';

interface MembershipNameInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function MembershipNameInput({
    value,
    onChange,
    placeholder = "E.g. Gold Membership"
}: MembershipNameInputProps) {
    return (
        <div className={styles.formSection}>
            <label className={styles.label}>Membership Name</label>
            <input
                type="text"
                placeholder={placeholder}
                className={styles.input}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default React.memo(MembershipNameInput);
