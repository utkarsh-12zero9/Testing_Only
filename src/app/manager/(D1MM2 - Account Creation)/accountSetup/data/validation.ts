import { FormDataType, FormErrorsType } from "../types";
import { requiredFields } from "./form-data";

export function validateField(key: keyof FormDataType, value: any): string | undefined {
  if (requiredFields.includes(key) && (!value || value.toString().trim() === "")) {
    return "This field is required";
  }
  if (key === "contactNumber" && !/^\d{10}$/.test(value)) {
    return "Phone number should be 10 digits long";
  }
  if (key === "pincode" && !/^\d{6}$/.test(value)) {
    return "Pincode should be 6 digits long";
  }
}

export function validateForm(data: FormDataType): FormErrorsType | false {
  const errors: FormErrorsType = {
    message: "Please fix the errors before submitting",
  };
  let hasError: boolean = false;

  requiredFields.forEach((field) => {
    let currentValue = data[field as keyof FormDataType];

    const error = validateField(field, currentValue);
    if (error) {
      hasError = true;
      errors[field as keyof FormErrorsType] = error;
    }
  });

  return hasError ? errors : false;
};