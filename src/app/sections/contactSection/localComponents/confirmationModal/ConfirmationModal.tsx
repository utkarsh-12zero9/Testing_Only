import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import styles from "./ConfirmationModal.module.css";
import accepted from '../../icons/accepted.svg'
import Image from "next/image";

interface Props {
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmationModal({ setIsModalActive }: Props) {
  return (
    <div className={styles.container} >
      <div className={styles.modal}>
        <div className={`bg-leaf-green ${styles.logo}`}>
          <Image src={accepted} alt="" height={16} width={16} />
        </div>
        <div>
          <h1>Request Submitted!</h1>
          <hr className={styles.divider} />
          <p>
            Your request for the Enterprise Pack has been submitted. Our team will
            contact you shortly to discuss your requirements and finalize your
            plan.
          </p>
        </div>
        <PrimaryButton onClick={() => setIsModalActive(false)} >Close</PrimaryButton>
      </div>
    </div>
  );
}

export default ConfirmationModal;
