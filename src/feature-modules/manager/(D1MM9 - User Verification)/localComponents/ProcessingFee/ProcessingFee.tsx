import styles from './ProcessingFee.module.css';
import Modal from "@/globalComponents/modal/Modal";
import Image from "next/image";
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import React, { useState } from 'react';

import processingFeeIcon from '../../icons/processing-fee.svg';
import ModalHeading from '@/globalComponents/modal/ModalHeading';
import ModalDivider from '@/globalComponents/modal/ModalDivider';
import ModalMessage from '@/globalComponents/modal/ModalMessage';
import SecondaryButton from '@/globalComponents/buttons/secondaryButton/SecondaryButton';
import { ErrorType,  VerificationTypes } from '../../types';
import createPayment from '../../api/create-payment';
import { useManagerSelector } from '@/app/manager/Redux/hooks';
import PaymentPopUp from '@/feature-modules/common/(D1MM11 - Payment)/PaymentPopUp';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';
import { selectBusinessID } from '@/app/manager/Redux/slice/business-slice';
import { Payment } from '@/feature-modules/common/(D1MM11 - Payment)/types';

interface ProcessingFeeProps {
  type: VerificationTypes | undefined;
  payment: Payment | null;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
  onPay: () => void;
  onCancel: () => void;
  onError: (error: ErrorType) => void;
}
export default function ProcessingFee({ type, payment, setPayment, onPay, onCancel, onError }: ProcessingFeeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const businessID = useManagerSelector(selectBusinessID);

  async function handleCreatePayment() {
    setIsLoading(true);

    try {
      if (!businessID) {
        throw new Error("Could not create the order. BusinessID not found...");
      }

      let orderData = await createPayment(businessID, type as string);
      setPayment(orderData);
    } catch (error: any) {
      onError({
        title: "Something Went Wrong",
        message: error.message || "Could not create the order. Please try again."
      })
      console.log("Payment error:", error);
    }
    finally {
      setIsLoading(false);
    }
  }

  function handlePayment() {
    const localPayment = JSON.parse(localStorage.getItem("kyc-payment") || '{}');
    if (localPayment) {
      localPayment.status = "Success";
      localStorage.setItem("kyc-payment", JSON.stringify(localPayment));
    }
    setPayment({ ...payment, status: "Success"} as Payment);
    onPay();
  }

  return (
    <>
      {
        isLoading &&
        <LoadingPage />
      }
      {
        payment ?
          <PaymentPopUp
            payment={payment}
            setPayment={setPayment}
            description='Unlock Personal & Bank Verification Options.'
            onSuccess={handlePayment}
            onClose={onCancel}
          /> :
          <Modal onOutsideClick={onCancel}>
            <Image className={styles.icon} src={processingFeeIcon} alt="icon" height={42} width={42} />
            <div className={styles.content}>
              <ModalHeading className={styles.heading}>KYC Processing Fee</ModalHeading>
              <ModalDivider />
              <ModalMessage>A <strong>one-time fee</strong> of <strong>₹100</strong> is required to process your KYC.</ModalMessage>
            </div>
            <div className={styles.buttons}>
              <PrimaryButton onClick={handleCreatePayment} className='w-full'>Pay Now</PrimaryButton>
              <SecondaryButton onClick={onCancel} colorVariant='transparent-white'>Cancel</SecondaryButton>
            </div>
          </Modal>
      }
    </>
  )
};
