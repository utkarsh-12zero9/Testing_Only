import getCoordinates from "@/lib/get-coordinates";
import { FormDataType } from "../types";

export default async function createManagerAccount(formData: FormDataType, managerID: string) {
  const coordinates = await getCoordinates();
  formData.coordinates = coordinates;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/createManagerProfile/${managerID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });

  const responseData = await response.json();
  if (response.ok) {
    return [null, formatManagerData(formData)];

  } else {
    return [responseData?.message || 'Something went wrong!', null];
  }
};

function formatManagerData(data: FormDataType) {
  return ({
    fullName: data.fullName,
    contactNumber: data?.contactNumber,
    gender: data?.gender,
    accCreated: 1,
    dob: data?.dob,
    role: data?.role,
    location: {
      addressLine1: data?.addressLine1,
      addressLine2: data?.addressLine2,
      mapLocation: data?.coordinates,
      city: data?.city,
      state: data?.state,
      country: data?.country,
      pincode: data?.pincode,
    },
    language: data?.languagePreference,
  })
}