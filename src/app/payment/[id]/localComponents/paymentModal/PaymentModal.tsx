import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import styles from "./PaymentModal.module.css";
import successIcon from '../../icons/success.svg'
import failureIcon from '../../icons/failure.svg'
import { useParams, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    success: boolean;
    businessID: string;
}

function PaymentModal({setIsModalActive, success, businessID} : Props) {  
  const router = useRouter();

  useEffect(() => {
    if(success) {
      router.push(`/business/${businessID}`)
    }
  })
  return (
    <div className={styles.container} >
      { success ?
      (
        <div className={styles.modal}>
          <div className={styles.logo}>
              <Image src={successIcon} alt="" height={16} width={16}/>
          </div>
          <div>
              <h1>Payment Successful!</h1>
              <hr className={styles.divider}/>
              <p>
              Congratulations! Membership slot is Unlocked. You will be redirected in a few seconds...
              </p>
          </div>
          <PrimaryButton text="Done" action={() => {
              setIsModalActive(false);
          }} />
        </div>
      ) : (
        <div className={styles.modal}>
          <div className={styles.logo}>
              <Image src={failureIcon} alt="" height={16} width={16}/>
          </div>
          <div>
              <h1>Payment Failed!</h1>
              <hr className={styles.divider}/>
              <p>
                Please reach out to your banking partner.
              </p>
          </div>
          <PrimaryButton text="Retry" action={() => {
              setIsModalActive(false);
          }} />
        </div>
      ) }
    </div>
  );
}

export default PaymentModal;
