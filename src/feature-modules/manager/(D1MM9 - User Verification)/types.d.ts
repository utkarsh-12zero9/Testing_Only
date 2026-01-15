export type PersonalVerificationStatus = "Pending" | "In Progress" | "Verified" | "Failed";

export type VerificationTypes = "aadhaar" | "driver" | null;

export type ActiveModal = "processing-fee" | "info" | "error" | "kyc-status" | null;

export type VerificationDetails = {
  verifyType: VerificationTypes;
  kyc_verification_url: string;
  kycVerificationFailed: boolean;
  access_token?: {
    entity_id: string;
    created_at: string;
    id: string;
    valid_till: string;
  }
}



export type ErrorType = {
  title: string;
  message: string;
}