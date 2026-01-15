import styles from './Verification.module.css';
import Image from 'next/image';
import { PersonalVerificationStatus, VerificationTypes } from '../../types';

import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';

interface VerificationProps {
  onVerification: (type: VerificationTypes) => void;
  personalVerificationStatus: PersonalVerificationStatus
  children: React.ReactNode
}

export default function Verification({ onVerification, personalVerificationStatus, children }: VerificationProps) {
  return (
    <div className={styles.verificationSummary}>
      <div className={styles.verificationSummaryTextboxWrapper}>
        <div className={styles.verificationSummaryTextbox}>
          <h1>Personal Verification</h1>
          <p
            className={
              personalVerificationStatus === "Verified"
                ? styles.verified
                // : personalVerificationStatus === "Failed"
                //   ? styles.failed
                : styles.pending
            }
          >
            {personalVerificationStatus}
          </p>
        </div>
        <Image src={"/userVerification/bankIcon.svg"} alt="Bank Icon"
          width={35} height={35} />
      </div>
      <p className={styles.description}>Verify your identity using Aadhar or Driving License to ensure secure transactions.</p>
      {
        personalVerificationStatus !== "Verified" &&
        <div className={styles.CTA}>
          <PrimaryButton className='w-full' onClick={() => { onVerification("aadhaar") }} >Aadhar</PrimaryButton>
          <p>OR</p>
          <PrimaryButton className='w-full' onClick={() => { onVerification("driver") }} >Driving License</PrimaryButton>
        </div>
      }
      {children}
    </div>
  )
};
