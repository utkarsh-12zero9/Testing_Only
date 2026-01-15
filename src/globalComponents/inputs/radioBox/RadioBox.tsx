// Designed By: Sanju

"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import styles from "./RadioBox.module.css";
import { Option, SharedInputComponentProps } from "../types";
import { memo } from "react";

type RadioBoxProps = SharedInputComponentProps & {
  options: Option[];
}
function RadioBox({ name, value, error, onChange, options, label, }: RadioBoxProps) {

  return (
    <div className={styles.radioBox}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.radioContainer} >
        <RadioGroup
          value={value}
          onValueChange={(value) => onChange({ name, value, type: "radio" })}
          className={`${styles.radioWrapper} grid-cols-3`}
        >
          {options.map((opt) => (
            <div key={opt.value}
              style={{ borderColor: error ? 'var(--bodytext-warning-red)' : '' }}
              className={`${styles.button} ${value === opt.value ? styles.selectedButton : styles.unselectedButton}`}>
              <RadioGroupItem
                value={opt.value}
                id={opt.value}
                className={`
                    border-2 border-gray-400 rounded-full
                    data-[state=checked]:border-(--primary-green)
                    text-(--primary-green)
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    radio
                  `}
                style={{
                  color: "var(--pure-white-30)",
                  fill: "var(--pure-white-30)",
                }}
              />
              {/* <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.75" y="0.75" width="12.5" height="12.5" rx="6.25" stroke="#F4F4F4" strokeWidth="1.5" />
                  <rect x="3" y="3" width="8" height="8" rx="4" fill="white" fillOpacity="0.3" />
                </svg> */}


              <Label
                htmlFor={opt.value}
                className={`cursor-pointer transition-all`}
              >
                {opt.label}
              </Label>
            </div>
          )
          )}
        </RadioGroup>
        {error && <p className={styles.errorText}>{error}</p>}
      </div></div >
  );
}

export default memo(RadioBox);