import styles from "./styles/Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onOutsideClick?: React.MouseEventHandler<HTMLDivElement>
  className?: string;
}
export default function Modal({ onOutsideClick, className, children }: ModalProps) {
  return (
    <div
      onClick={(e) => onOutsideClick && onOutsideClick(e)}
      className={styles.container} >
      <div className={`${styles.modalWrapper} slideUpAnimation`} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.modal} ${className}`}>

          {children}
        </div>
      </div>
    </div>
  )
};
