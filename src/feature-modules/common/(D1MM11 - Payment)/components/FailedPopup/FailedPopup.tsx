import CommonPopup from "@/globalComponents/Popups/Common/CommonPopup";

type FailedPopupProps = {
  onClick: () => void;
}
export default function FailedPopup({ onClick }: FailedPopupProps) {
  return (
    <CommonPopup
      title="Payment Failed!"
      buttonText="Close"
      variant="warning"
      onClick={onClick}
      onOutsideClick={onClick}
    >Please reach to your banking partner.</CommonPopup>
  )
};
