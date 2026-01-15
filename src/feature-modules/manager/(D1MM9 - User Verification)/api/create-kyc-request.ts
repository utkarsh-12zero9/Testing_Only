import { VerificationTypes } from "../types";

const manual = ["aadhaar", "driver", "pan"]

const KYC_COOLDOWN = 5 * 60 * 1000; // 5 mins in ms

export default async function createKycRequest(managerData: any, type: VerificationTypes): Promise<any> {
  if (!canChangeKYCType()) {
    // const secondsLeft = Math.ceil(getRemainingTime() / 1000);
    return [{
      type: "info",
      title: "Please Wait",
      message: "You can change your KYC type after few minutes.",
    }, null];
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/kyc/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: managerData?.email,
          managerID: managerData.ID,
          typeOfVerification: type,
          manual: manual.includes(type as string) ? true : false
        }),
      }
    );


    if (!response.ok || (response.status != 200 && response.status != 201)) {
      // action(false)
      throw new Error("KYC verification failed");
    }

    const { data } = await response.json();

    let verificationDetails = {
      kyc_verification_url: data.verification_url,
      verifyType: type,
      access_token: {
        created_at: data.created_at,
        entity_id: data.entity_id,
        id: data.verification_id,
        valid_till: data.valid_till
      }
    };

    localStorage.setItem("verificationDetails", JSON.stringify(verificationDetails));
    saveKYCInitiateTime();

    return [null, verificationDetails];
  } catch (e: any) {
    return [{
      title: "Some Error Occured",
      message: e.message || "An Unknown Error Occured",
    }, null];
  }
};

function saveKYCInitiateTime() {
  localStorage.setItem("lastKYCInitiate", Date.now().toString());
}

function canChangeKYCType() {
  const last = localStorage.getItem("lastKYCInitiate");
  if (!last) return true; // No previous attempt → allowed

  const elapsed = Date.now() - Number(last);
  return elapsed >= KYC_COOLDOWN;
}

function getRemainingTime() {
  const last = localStorage.getItem("lastKYCInitiate");
  if (!last) return 0;

  const elapsed = Date.now() - Number(last);
  return Math.max(KYC_COOLDOWN - elapsed, 0);
}
