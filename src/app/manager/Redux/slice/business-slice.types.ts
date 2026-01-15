export interface Location {
  mapLocation: [number, number];
  city: string;
  state: string;
  country: string;
  pincode: string;
  addressLine1: string;
  addressLine2: string;
}


export interface Business {
  ID: string;
  managerID: string;
  KYCVerified: boolean;
  packageID: string | null;
  name: string;
  tagline: string;
  type: string;
  keyServices?: string[];
  workingDays: string[];
  capacity: number;
  receptionNumber: string;
  officialEmail: string;
  referralCode: string;
  location?: Location;
}

export interface BusinessState {
  data: Business | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}