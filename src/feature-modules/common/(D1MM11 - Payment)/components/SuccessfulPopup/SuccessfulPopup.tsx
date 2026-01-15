import styles from "./SuccessfulPopup.module.css";
import Modal from "@/globalComponents/modal/Modal";
import Image from "next/image";
import successIcon from '../../icons/success.svg'
import ModalHeading from "@/globalComponents/modal/ModalHeading";
import ModalDivider from "@/globalComponents/modal/ModalDivider";
import ModalMessage from "@/globalComponents/modal/ModalMessage";
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import SecondaryButton from "@/globalComponents/buttons/secondaryButton/SecondaryButton";
import sendInvoiceToEmail from "../../api/send-invoice-to-email";
import { useState } from "react";
import LoadingPage from "@/globalComponents/LoadingPage/LoadingPage";
import CommonPopup from "@/globalComponents/Popups/Common/CommonPopup";

type SuccessfullPopupProps = {
  paymentID: string;
  onContinue: () => void
}
export default function SuccessfulPopup({ paymentID, onContinue }: SuccessfullPopupProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);

  async function handleSendEmail() {
    try {
      setIsLoading(true);
      const result = await sendInvoiceToEmail(paymentID);
      setIsInvoiceModalOpen(true);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading && (
        <LoadingPage />
      )}
      {
        isInvoiceModalOpen ?
          <CommonPopup
            title="Invoice"
            buttonText="Close"
            variant='success'
            onClick={()=>setIsInvoiceModalOpen(false)}
            onOutsideClick={()=>setIsInvoiceModalOpen(false)}
          >Invoice will be sent to the registered email shortly</CommonPopup>
          :
          <Modal>
            <Image src={successIcon} alt="icon" height={42} width={42} />
            <div className={styles.content}>
              <ModalHeading className={styles.heading}>Payment Successful!</ModalHeading>
              <ModalDivider />
              <ModalMessage>Your payment has been successfully processed.</ModalMessage>
            </div>
            <div className={styles.buttons}>
              <SecondaryButton onClick={handleSendEmail}>Send invoice to email</SecondaryButton>
              <PrimaryButton onClick={onContinue} >Continue</PrimaryButton>
            </div>
          </Modal>
      }
    </>
  )
};
