import CommonPopup from "@/globalComponents/Popups/Common/CommonPopup"
import { ActiveModal, ErrorType, PersonalVerificationStatus, VerificationDetails } from "../../types"

interface ModalsProps {
  activeModal: ActiveModal
  setActiveModal: React.Dispatch<React.SetStateAction<ActiveModal | null>>
  personalVerificationStatus: PersonalVerificationStatus,
  verificationDetails: VerificationDetails;
  error: ErrorType | null
}
export default function Modals({ activeModal, setActiveModal, personalVerificationStatus, verificationDetails, error }: ModalsProps) {
  function handleRedirectToDigio() {
    if (personalVerificationStatus === "In Progress") {
      window.open(verificationDetails?.kyc_verification_url, '_blank', 'noopener,noreferrer');
    }
  }
  return (
    <>
      {
        (activeModal === 'error' || activeModal === 'info') &&
        <CommonPopup
          variant={activeModal === 'info' ? "processing" : "warning"}
          title={error?.title || "Some Error Occured"}
          buttonText="Close"
          onClick={() => setActiveModal(null)}
          onOutsideClick={() => setActiveModal(null)}
        >{error?.message || "Something went wrong. Please try again."}</CommonPopup>
      }
      {
        activeModal == "kyc-status" && personalVerificationStatus === "In Progress" &&
        <CommonPopup
          variant='processing'
          title="Verification In Progress"
          buttonText="Verify"
          onClick={handleRedirectToDigio}
          onOutsideClick={() => setActiveModal(null)}
        >Congratulations! KYC initiated. You will be automatically redirected to Digio website for further verification. You can click below link to be redirected manually.</CommonPopup>
      }
      {
        activeModal == "kyc-status" && personalVerificationStatus === "Verified" &&
        <CommonPopup
          variant='success'
          title="Verification Successful!"
          buttonText="Done"
          onClick={() => setActiveModal(null)}
          onOutsideClick={() => setActiveModal(null)}
        >Your KYC has been successfully verified.</CommonPopup>
      }
    </>
  )
};
