'use client'
import { ButtonHTMLAttributes, MouseEventHandler, useState } from 'react';
import styles from './PrimaryButton.module.css'

export interface PrimaryButtonProps {
  children: React.ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>;
  colorVariant?: "primary-green" | "leaf-green" | "warning-red" | "primary-blue",
  className?: string;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}


function PrimaryButton({ children, onClick, colorVariant = "primary-green", className, disabled = false, type = "button" }: PrimaryButtonProps) {

  return (
    <button
      className={`${styles.primaryButton} ${styles[colorVariant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <div className={styles.content}>
        {children}
      </div>
    </button>
  )
}

export default PrimaryButton