"use client";

// Designed By: Sanju

import React, { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import styles from "./CheckBox.module.css";
import { Option, SharedInputComponentProps } from "../types";
type CheckBoxProps = Omit<SharedInputComponentProps, "value" | "onChange"> & {
  value: string[];
  options: Option[];
  onChange: ({ name, value, type }: { name: string, value: string[], type?: string }) => void;
}

function CheckBox({ name, value, options, error, onChange, label, optional, }: CheckBoxProps) {

  function handleChange(checkedValue: string) {
    let newValue;
    if (value?.includes(checkedValue)) {
      newValue = value.filter((v) => v !== checkedValue)
    } else {
      newValue = [...value, checkedValue];
    }
    onChange({ name, value: newValue, type: 'checkbox' });
  }

  return (
    <div className={styles.radioBox}>
      <label htmlFor={name}>
        {label}
        <span className={styles.optional}>{optional && `(${optional})`}</span>
      </label>
      <div className={`${styles.radioWrapper} grid grid-cols-3 gap-2`}>
        {options.map((opt) => {
          const isSelected = value?.includes(opt.value);
          return (
            <div
              key={opt.value}
              style={{ borderColor: error ? 'var(--bodytext-warning-red)' : '' }}
              className={`${styles.button} ${isSelected ? styles.selectedButton : ''}`}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => handleChange(opt.value)}
                id={opt.value}
                className="sr-only"
              />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
          );
        })}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default memo(CheckBox);