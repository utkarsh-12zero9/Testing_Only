import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import styles from './SecondaryButton.module.css'

interface SecondaryButtonProps {
  children: React.ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>;
  colorVariant?: "primary-blue" | "transparent-white",
  className?: string;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

function SecondaryButton({ children, onClick, colorVariant = "primary-blue", className, disabled = false, type = "button" }: SecondaryButtonProps) {
  return (
    <button
      className={`${styles.secondaryButton} ${styles[colorVariant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default SecondaryButton