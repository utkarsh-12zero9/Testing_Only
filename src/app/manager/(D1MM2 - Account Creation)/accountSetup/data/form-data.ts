import { FormDataType, OptionType } from "../types";

export const requiredFields: (keyof FormDataType)[] = [
  "fullName",
  "contactNumber",
  "gender",
  "dob",
  "role",
  "addressLine1",
  "city",
  "state",
  "country",
  "pincode",
  "tnc1",
  "tnc2"
]

export const GENDER: OptionType[] = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Others" },
]

export const ROLES: OptionType[] = [
  { value: "Owner", label: "Owner - You Own the Business" },
  { value: "Manager", label: "Manager - You Manage the Business" },
  { value: "Owner/Manager", label: "Owner/Manager - You Own & Manage" },
  { value: "System Admin", label: "System Admin - You Manage the System" },
];

export const LANGUAGES: OptionType[] = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Bengali", label: "Bengali" },
  { value: "Marathi", label: "Marathi" },
  { value: "Tamil", label: "Tamil" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Gujarati", label: "Gujarati" },
  { value: "Urdu", label: "Urdu" },
  { value: "Kannada", label: "Kannada" },
  { value: "Odia", label: "Odia" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Assamese", label: "Assamese" },
  { value: "Other", label: "Other" },
]

export const STATES: OptionType[] = [
  { value: "Andaman And Nicobar Islands", label: "Andaman And Nicobar Islands" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "CHHATTISGARH", label: "CHHATTISGARH" },
  { value: "Dadra and Nagar Haveli", label: "Dadra and Nagar Haveli" },
  { value: "Daman and Diu", label: "Daman and Diu" },
  { value: "Delhi", label: "Delhi" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Pondicherry", label: "Pondicherry" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" }
]