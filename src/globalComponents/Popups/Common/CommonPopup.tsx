import styles from "./CommonPopup.module.css";

import failedIcon from './icons/failed.svg';
import successIcon from './icons/success.svg';
import processingIcon from './icons/processing.svg';

import PrimaryButton, { PrimaryButtonProps } from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import Image from "next/image";
import Modal from "@/globalComponents/modal/Modal";
import ModalHeading from "@/globalComponents/modal/ModalHeading";
import ModalDivider from "@/globalComponents/modal/ModalDivider";
import ModalMessage from "@/globalComponents/modal/ModalMessage";

interface Props {
  variant: "success" | "warning" | "processing";
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onClick: any;
  className?: string;
  onOutsideClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const VARIANT_TO_ICON = {
  success: successIcon,
  warning: failedIcon,
  processing: processingIcon
}
const VARIANT_TO_BUTTON_VARIANT: Record<string, PrimaryButtonProps['colorVariant']> = {
  success: 'leaf-green',
  warning: 'warning-red',
  processing: 'primary-blue'
}

function CommonPopup({ children, title, buttonText, variant, onClick, className, onOutsideClick }: Props) {

  return (
    <Modal className={className} onOutsideClick={onOutsideClick}>
      <Image className={styles.icon} src={VARIANT_TO_ICON[variant]} alt="icon" height={42} width={42} />
      <div className={styles.content}>
        <ModalHeading>{title}</ModalHeading>
        <ModalDivider />
        <ModalMessage>{children}</ModalMessage>
      </div>
      <PrimaryButton onClick={onClick} colorVariant={VARIANT_TO_BUTTON_VARIANT[variant]}>{buttonText}</PrimaryButton>
    </Modal>
  );
}

export default CommonPopup;
