import styles from './TextArea.module.css'
import { SharedInputComponentProps } from '../types';
import { memo } from 'react';

type TextAreaProps = SharedInputComponentProps;

function TextArea({ name, value, error, onChange, label, placeholder, optional }: TextAreaProps) {

  return (
    <div className={styles.textArea}>
      <label htmlFor="desc">
        {label} {optional && `(${optional})`}
      </label>
      <div
        className={styles.inputBox}
        style={{ borderColor: error ? 'var(--bodytext-warning-red)' : '' }}
      >
        <textarea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) => onChange({ name, value: e.target.value, type: 'textarea' })}
          id={name}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div >
  )
}

export default memo(TextArea);