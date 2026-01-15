import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * This function is used to get the manager data. 
 * It checks the local storage for the user data.
 * If the user data is not found, it fetches the user data from the backend using the user ID.
 * 
 * @async
 * @param userID - The ID of the user.
 * @returns The user data.
 * @throws Error("Not Found") - If the user is not found in the local storage or the backend.
*/
const getManagerData = createAsyncThunk(
  'manager/getManagerData',
  async () => {
    try {
      // Check if the user data is already in the local storage
      let userData = JSON.parse(localStorage.getItem("userData") || '{}');

      if (userData?.ID) {
        return userData;
      }

      const searchParams = new URLSearchParams(window.location.search);
      const userID = searchParams.get('userID');

      // if the user data is not in the local storage, check if the user ID is provided
      if (!userData?.ID && !userID) {
        throw new Error("Not Found");
      }

      // if the user data is not in the local storage, fetch it from the backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/getBasicProfile/${userID}`);
      if (response.status === 404) {
        localStorage.clear();
        throw new Error("Not Found");
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch manager data");
      }

      localStorage.setItem('userData', JSON.stringify(result.data));
      return result.data;
    } catch (err: Error | any) {
      let pathname = window.location.pathname;
      if (err.message === "Not Found" && pathname !== "/manager/login") {
        window.location.href = "/manager/login";
      }
    }
  }
);

export default getManagerData;