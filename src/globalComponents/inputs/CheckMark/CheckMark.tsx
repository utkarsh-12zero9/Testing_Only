import styles from "./CheckMark.module.css";
import { SharedInputComponentProps } from "../types";
import checkIcon from './icons/mark.svg'
import Image from "next/image";
import { memo } from "react";

type CheckMarkProps = Omit<SharedInputComponentProps, "value" | "onChange" | "label"> & {
  value: boolean;
  onChange: ({ name, value, type }: { name: string, value: boolean, type?: string }) => void;
}

function CheckMark({ name, value, error, onChange }: CheckMarkProps) {
  return (
    <button
      className={`${styles.checkMark} ${value ? styles.checked : ""} ${error ? styles.error : ""}`}
      type="button"
      name={name}
      onClick={(e) => onChange({ name, value: !value, type: "checkmark" })}
    >
      <input type="checkbox"
        id={name}
        checked={value}
        onChange={(e) => onChange({ name, value: e.target.checked, type: 'checkmark' })}
      />
      <Image src={checkIcon} alt="check mark icon" />
    </button>
  )
};

export default memo(CheckMark);