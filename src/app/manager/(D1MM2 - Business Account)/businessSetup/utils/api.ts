import getCoordinates from "@/lib/get-coordinates";
import { FormDataType, FormErrorsType } from "./types";

export default async function createBusinessProfile(formData: FormDataType, managerID: string) {
  const coordinates = await getCoordinates();
  formData.country = formData.country.toLowerCase();
  formData.coordinates = coordinates;
  formData.legalBusinessName = formData.businessName;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/businessCreation/${managerID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const responseData = await res.json();
  if (res.ok) {
    return [null, responseData.data];
  } else {
    let errors: FormErrorsType = {};
    switch (responseData?.message) {
      case 'Code not found': {
        errors.referralCode = 'Enter a valid refrel code';
        errors.message = 'Refrel code not found!';
        break;
      }
      case 'Code is not active': {
        errors.referralCode = 'Enter an active refrel code';
        errors.message = 'Refrel code is not active!';
        break;
      }
      case 'Code is not applicable': {
        errors.referralCode = 'Enter a valid refrel code';
        errors.message = 'Refrel code is not applicable!';
        break;
      }
      default: {
        errors.message = responseData?.message || 'Something went wrong!';
      }
    }
    return [errors, null];
  }
};