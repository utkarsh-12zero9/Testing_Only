import styles from "./styles/Modal.module.css";

type ModalHeadingProps = {
  children: React.ReactNode;
  className?: string;
}

export default function ModalHeading({ children, className }: ModalHeadingProps) {
  return (
    <p className={`${styles.modalHeading} ${className}`}>{children}</p>
  )
};
