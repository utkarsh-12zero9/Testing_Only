const KYC_STATUS_COOLDOWN = 5 * 60 * 1000; // 5 minutes

export default async function kycStatus(entity_id: string, type: string) {
  if (!canCheckKYCStatus()) {
    // const remaining = Math.ceil(getRemainingTimeForStatusCheck() / 1000);
    return [{
      type: "info",
      title: "Please Wait",
      message: "You can check your KYC status after few minutes.",
    }, null];
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/kyc/status/${entity_id}?typeOfVerification=${type}`);
    saveLastStatusCheckTime();

    if (response.status == 400) {
      return [null, 'progress'];
    }
    if (response.status !== 400 && !response.ok) {
      throw new Error("Some Error Occured");
    }

    const result = await response.json();
    const status = result.data.status;
    if (status === "rejected" || status === "failed" || status === "expired" || status === "skipped") {
      updateLocalStorage();
      return [null, 'failed'];
    } else if (status == "approved") {
      updateLocalStorage();
      return [null, "verified"];
    }

    return [null, "progress"];
  } catch (error) {
    return [{
      title: "Try Again",
      message: "Verification status could not be fetched",
    }, null];
  }
}

function updateLocalStorage(failed?: boolean) {
  if (failed) {
    const userData = {
      kycVerificationFailed: true,
      verifyType: null,
      kyc_verification_url: '',
      access_token: {
        created_at: '',
        entity_id: "",
        id: "",
        valid_till: ""
      }
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    return
  }

  const businessData = JSON.parse(localStorage.getItem("businessData") || '');
  if (businessData) {
    businessData.KYCVerified = true;
    localStorage.setItem("businessData", JSON.stringify(businessData));
  }
}

function saveLastStatusCheckTime() {
  localStorage.setItem("lastKycStatusCheck", Date.now().toString());
}

function canCheckKYCStatus() {
  const last = localStorage.getItem("lastKycStatusCheck");

  if (!last) return true; // No previous check → allowed

  const elapsed = Date.now() - Number(last);
  return elapsed >= KYC_STATUS_COOLDOWN;
}

function getRemainingTimeForStatusCheck() {
  const last = localStorage.getItem("lastKycStatusCheck");
  if (!last) return 0;

  const elapsed = Date.now() - Number(last);
  return Math.max(KYC_STATUS_COOLDOWN - elapsed, 0);
}
