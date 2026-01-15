import { BusinessTypeValue } from "./business-data";

export interface SlotType {
  opening: string;
  closing: string;
  error?: string;
}
export interface FormDataType {
  brandName: string;
  businessName: string;
  businessType: BusinessTypeValue;
  gstNumber: string;
  businessCategory: string;
  description: string;
  keyServices: string[];
  tagline: string;
  workingHours: SlotType[];
  workingDays: string[];
  maxCapacity: string;
  receptionNumber: string;
  officialEmail: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  addressLine2: string;
  referralCode: string;
  coordinates?: [number, number];
  legalBusinessName?: string;
};

export type FormErrorsType = Partial<Record<keyof FormDataType, string>> & {
  message?: string;
}