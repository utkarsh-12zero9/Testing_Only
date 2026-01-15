import kycStatus from "../../api/kyc-status"
import { useState } from "react"
import LoadingPage from "@/globalComponents/LoadingPage/LoadingPage";
import SecondaryButton from "@/globalComponents/buttons/secondaryButton/SecondaryButton";

type KycStatusProps = {
  entityId: string;
  onStatusCheck: (error: any, status: string) => void;
}

export default function KycStatus({ entityId, onStatusCheck }: KycStatusProps) {
  const [loading, setLoading] = useState(false);

  async function checkKycStatus() {
    try {
      setLoading(true);
      const [error, status]: any = await kycStatus(entityId, 'personal');
      onStatusCheck(error, status);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {
        loading &&
        <LoadingPage />
      }
      <SecondaryButton onClick={checkKycStatus}>Check KYC Status</SecondaryButton>
    </>
  )
};
