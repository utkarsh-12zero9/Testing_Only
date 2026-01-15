'use client';
import { ChangeEvent, memo } from 'react';
import styles from './InputBox.module.css';
import { SharedInputComponentProps } from '../types';

function InputBox({ name, value, error, onChange, label, placeholder, optional, readOnly }: SharedInputComponentProps & {readOnly?: boolean}) {

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({ name, value: e.target.value, type: 'text' });
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
          value={value}
          onChange={handleChange}
          type="text"
          id={name}
          placeholder={placeholder}
          className={styles.input}
          readOnly={readOnly}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default memo(InputBox);