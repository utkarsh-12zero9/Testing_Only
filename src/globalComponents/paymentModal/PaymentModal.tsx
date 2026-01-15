import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import styles from "./PaymentModal.module.css";
// import successIcon from 'paymentIcons/success.svg'
// import failureIcon from 'paymentIcons/failure.svg'
import { useParams, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import SecondaryButton from "../buttons/secondaryButton/SecondaryButton";

interface Props {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  success: number;
  path?: string;
  url?: string;
  title: string;
  button?: string;
  message: string;
}

function PaymentModal({ setIsModalActive, success, path, url, title, button, message }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (((success == 0)) && path) {
      router.push(`${path}`)
    }
  })
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()} >
      {(success == 0) ?
        (
          <div className={styles.modal}>
            <div className={styles.logo}>
              <Image src={"/paymentIcons/success.svg"} alt="" height={32} width={32} />
            </div>
            <div>
              <h1>{title}</h1>
              <hr className={styles.divider} />
              <p>
                {message}
              </p>
            </div>
            <PrimaryButton onClick={() => {
              setIsModalActive(false);
              if (url) window.open(url, '_blank', 'noopener,noreferrer');
            }} >{button ? button : "Done"}</PrimaryButton>
          </div>
        ) : (success == 1) ? (
          <div className={styles.modal}>
            <div className={styles.logo}>
              <Image src={"/paymentIcons/hourglass.svg"} alt="" height={32} width={32} />
            </div>
            <div>
              <h1 className={styles.progress}>{title}</h1>
              <hr className={styles.divider} />
              <p>
                {message}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.modal}>
            <div className={styles.logo}>
              <Image src={"/paymentIcons/failure.svg"} alt="" height={32} width={32} />
            </div>
            <div>
              <h1>{title}</h1>
              <hr className={styles.divider} />
              <p>
                {message}
              </p>
            </div>
            <PrimaryButton onClick={() => setIsModalActive(false)} >{button ? button : "Retry"}</PrimaryButton>
          </div>
        )
      }
    </div>
  );
}

export default PaymentModal;
