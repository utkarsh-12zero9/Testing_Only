import styles from "./styles/Modal.module.css";

interface ModalMessageProps {
  children: React.ReactNode;
  className?: string;
}
export default function ModalMessage({ children, className }: ModalMessageProps) {
  return <p className={`${styles.modalMessage} ${className}`}>{children}</p>
};
