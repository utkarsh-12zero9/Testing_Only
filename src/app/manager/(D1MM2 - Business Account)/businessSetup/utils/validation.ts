import isClosingAfterOpening from "./time-slot-validation";
import { FormDataType, FormErrorsType, SlotType } from "./types";

const requiredFields = [
  "brandName",
  "businessName",
  "businessType",
  "businessCategory",
  "keyServices",
  "tagline",
  "workingHours",
  "workingDays",
  "maxCapacity",
  "receptionNumber",
  "officialEmail",
  "addressLine1",
  "city",
  "state",
  "country",
  "pincode",
  "addressLine2"
];

const optionalGSTCategories = ['not_yet_registered', 'individual', 'proprietorship'];

export function validateField(key: keyof FormDataType, formData: FormDataType): string | undefined {
  const value = formData[key];
  if (requiredFields.includes(key) && (!value || value.toString().trim() === "")) {
    return "This field is required";
  }

  if (key === 'gstNumber') {
    if (formData.gstNumber && !isValidGST(value as string)) {
      return "Enter a valid GST Number"
    }
    if (formData.businessCategory && !isGSTOptional(formData.businessCategory) && !formData.gstNumber)
      return 'GST number is required';
  }

  // 🔹 keyServices (at least one required)
  if (key === "keyServices") {
    if (formData.keyServices?.length < 4)
      return "Select at least 4 key service";
  }

  // 🔹 workingHours (at least one required)
  if (key === "workingHours") {
    Array.isArray(value) && value.forEach((item: any) => {
      const isValid = isClosingAfterOpening(item?.opening, item?.closing);
      if (!isValid) {
        item.error = 'Closing time must be after opening time for a shift';
      } else {
        item.error = '';
      }
    })
    return;
  }

  // 🔹 workingDays (at least one required)
  if (key === "workingDays" && value?.length === 0) {
    return "Select at least one working day";
  }

  if (key === 'maxCapacity') {
    const numValue = Number(value);
    if (!Number.isSafeInteger(numValue) || numValue <= 0) {
      return "Max capacity must be a valid positive number";
    } else if (numValue > 1000) {
      return "Max capacity must be less than 1000";
    }
  }
  // 🔹 Validate email format
  if (key === "officialEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
    return "Enter a valid email address";
  }

  // 🔹 Validate pincode : India-style 6 digits
  if (key === "pincode" && !/^\d{6}$/.test(value as string)) {
    return "Enter a valid 6-digit PIN code";
  }

  // 🔹 Validate reception number (basic 10-digit format)
  if (key === "receptionNumber" && !/^\d{10}$/.test(value as string)) {
    return "Enter a valid 10-digit phone number";
  }

  // 🔹 Validate max capacity (must be a positive number)
  if (key === "maxCapacity" && (isNaN(Number(value)) || Number(value) <= 0)) {
    return "Enter a valid positive number";
  }

  const trimmedValue = String(value).trim();
  if (key === 'addressLine1' || key === 'addressLine2') {
    if (trimmedValue.length < 5) {
      return "The value must be at least 5 characters long";
    }
    if (trimmedValue.length > 100) {
      return "The value must be less than 100 characters long";
    }
  }

  if (key === 'city' || key === 'state' || key === 'country') {
    if (trimmedValue.length < 2) {
      return "The value must be at least 2 characters long";
    }
    if (trimmedValue.length > 32) {
      return "The value must be less than 32 characters long";
    }
  }
}

export function validateForm(data: FormDataType): FormErrorsType | false {
  const errors: FormErrorsType = {
    message: "Please fix the errors before submitting",
  };
  let hasError: boolean = false;

  Object.keys(data).forEach((field) => {
    const error = validateField(field as keyof FormDataType, data);
    if (error) {
      hasError = true;
      errors[field as keyof typeof errors] = error;
    }
  });

  return hasError ? errors : false;
};

export function isGSTOptional(businessType: string): boolean {
  return optionalGSTCategories.includes(businessType);
}

export function isValidGST(gst: string) {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
  return regex.test(gst);
}