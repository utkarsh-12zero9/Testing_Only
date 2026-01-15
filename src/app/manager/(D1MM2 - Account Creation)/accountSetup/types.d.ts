export interface FormDataType {
  fullName: string;
  contactNumber: string;
  gender: string;
  dob: string;
  role: "Manager";
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  languagePreference: string[];
  tnc1: boolean;
  tnc2: boolean;
  coordinates?: [number, number];
};

export type FormErrorsType = Partial<Record<keyof FormDataType, string>> & {
  message?: string;
}

export interface OptionType {
  label: string;
  value: string;
}