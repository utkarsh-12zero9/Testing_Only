import styles from './GSTInputBox.module.css'
import { SharedInputComponentProps } from '../types';
import { ChangeEvent, useState } from 'react';
import formatValue from './utils/format-value';

export default function GSTInputBox({ name, value, error, onChange, label, placeholder, optional }: SharedInputComponentProps) {
  const [isFocused, setIsFocused] = useState(false);
  const displayValue = formatValue(value, !isFocused && !error);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/-/g, "").slice(0, 15);
    onChange({ name, value: raw.toUpperCase(), type: 'gst' });
  }

  return (
    <div className={styles.inputBox}>
      <label htmlFor={name}>
        {label}
        <span className={styles.optional}>{optional && `(${optional})`}</span>
      </label>

      <div
        className={styles.inputContainer}
        style={{ borderColor: error ? 'var(--bodytext-warning-red)' : '' }}
      >

        <input
          name={name}
          value={displayValue}
          onChange={handleChange}
          type="text"
          id={name}
          placeholder={placeholder}
          className={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  )
};
