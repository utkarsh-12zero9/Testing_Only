import { createSlice } from "@reduxjs/toolkit";
import { BusinessState } from "./business-slice.types";
import getBusinessData from "../thunks/get-business-data";

const initialState: BusinessState = {
  data: null,
  status: "idle",
  error: null,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    clearManager(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
    businessCreated(state, { payload }) {
      const { businessID, business } = payload;
      const newBusinessData = {
        ID: businessID,
        managerID: business?.managerID,
        KYCVerified: false,
        packageID: null,
        name: business.businessName,
        tagline: business.tagline,
        type: business.businessType,
        keyServices: business.keyServices,
        workingDays: business.workingDays,
        capacity: business.maxCapacity,
        receptionNumber: business.receptionNumber,
        officialEmail: business.officialEmail,
        referralCode: business.referralCode,
        location: business.location
      }
      state.data = newBusinessData;
      localStorage.setItem("businessData", JSON.stringify(newBusinessData));

    },
    /**This function will partially update manager data and save it to local storage */
    updateBusiness(state, action) {
      const newBusinessData = {
        ...state.data,
        ...action.payload
      }
      state.data = newBusinessData;
      localStorage.setItem("businessData", JSON.stringify(newBusinessData));
    }
  },
  extraReducers(builder) {
    builder
      .addAsyncThunk(getBusinessData, {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'success';
          state.data = action.payload;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error.message || "Something went wrong";
        }
      })
  },
  selectors: {
    selectBusiness: (state) => state.data,
    selectBusinessID: (state) => state.data?.ID,
    selectBusinessStatus: (state) => state.status,
    selectBusinessError: (state) => state.error,
  }
});

// selectors
export const { selectBusiness, selectBusinessID, selectBusinessStatus, selectBusinessError } = businessSlice.selectors;

// actions
export const { clearManager, businessCreated, updateBusiness } = businessSlice.actions;
export default businessSlice.reducer;