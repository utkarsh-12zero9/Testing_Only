import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * This function is used to get the business data. 
 * It checks the local storage for the user data.
 * If the business data is not found, it fetches the business data from the backend using the manager ID.
 * 
 * @async
 * @param managerID - The ID of the manager.
 * @returns The user data.
 * @throws Error("Not Found") - If the business is not found in the local storage or the backend.
*/
const getBusinessData = createAsyncThunk(
  'manager/business/getBusinessData',
  async (managerID: string) => {
    // Check if the business data is already in the local storage
    let businessData = JSON.parse(localStorage.getItem("businessData") || '{}');

    if (businessData?.ID) {
      return businessData;
    }

    // if the business data is not in the local storage, fetch it from the backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/getAllBusinessProfiles/${managerID}`);

    const result = await response.json();
    if (!result.data || !response.ok) {
      throw new Error(result.message || "Failed to fetch business data");
    }

    localStorage.setItem('businessData', JSON.stringify(result.data[0]));
    return result.data[0];
  }
);

export default getBusinessData;