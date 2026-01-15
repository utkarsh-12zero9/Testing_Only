import styles from './Slot.module.css';
import { useEffect, useState } from "react";
import polygonIcon from '../icons/polygon.svg';

import { OptionType } from "../utils/types";
import Image from 'next/image';

interface SlotProps {
  label: string,
  options: OptionType[],
  selected: string,
  onchange: (value: string) => void
  error?: boolean;
}

export default function Slot({ label, options, selected, onchange, error }: SlotProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const selectedLabel = options.find(opt => opt.value === selected)?.label || '';

  // hide dropdown when user click outside dropdown menu
  useEffect(() => {
    if (!showDropdown) return;

    function hideDropdown() {
      setShowDropdown(false);
    }

    document.addEventListener('click', hideDropdown);
    return () => {
      document.removeEventListener('click', hideDropdown);
    }
  }, [showDropdown]);

  return (
    <div className={`${styles.inputWrapper} ${error ? styles.error : ''} ${showDropdown ? styles.active : ''}`} onClick={() => setShowDropdown(!showDropdown)}>
      <label className={styles.slotLabel}>{label}</label>

      <div className={styles.input}>
        <p>{selectedLabel}</p>
        <div className={styles.devider}></div>
        <Image src={polygonIcon} alt="polygon icon" className={showDropdown ? styles.rotate : ''} width={15} height={15} />
      </div>
      {
        showDropdown && (
          <div className={styles.dropdown}>
            {
              options.map((opt) => (
                <p key={opt.value} onClick={() => onchange(opt.value)}>{opt.label}</p>
              ))
            }
          </div>
        )
      }
    </div>
  )
}