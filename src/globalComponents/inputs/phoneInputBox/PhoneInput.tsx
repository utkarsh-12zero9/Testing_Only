"use client";
import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import styles from "./PhoneInput.module.css";
import { SharedInputComponentProps } from "../types";
import formatValue from "./utils/format-value";

type PhoneInputProps = Omit<SharedInputComponentProps, "label"> & {
  code: string;
}

function PhoneInput({ code, value, onChange, name, error }: PhoneInputProps) {
  const displayValue = formatValue(value);
  const ref = useRef<HTMLInputElement>(null);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange({ name, value: raw, type: 'phone' });
  };

  return (
    <div className={styles.inputBox}>
      <label htmlFor="phoneInput">Phone Number</label>
      <div
        className={styles.phoneInput}
        onClick={() => ref.current?.focus()}
        style={{ borderColor: error ? 'var(--bodytext-warning-red)' : '' }}
      >
        <div>
          <p>{code}</p>
          <hr className={styles.verticalDivider} />
          <div className={styles.maskedInputContainer}>
            {!displayValue && (
              <span className={styles.placeholderMask}></span>
            )}
            <input
              id="phoneInput"
              type="tel"
              inputMode="numeric"
              ref={ref}
              name={name || "phone"}
              value={displayValue}
              placeholder=""
              onChange={handleInputChange}
              className={styles.visibleInput}
              style={{ borderColor: (error) ? 'var(--bodytext-warning-red)' : '' }}
            />
          </div>
        </div>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default memo(PhoneInput);
