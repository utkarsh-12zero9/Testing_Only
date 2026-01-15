import { createSlice } from "@reduxjs/toolkit";
import type { ManagerState } from "./manager-slice.types"
import getManagerData from "../thunks/get-manager-data";

const initialState: ManagerState = {
  data: null,
  status: "loading",
  error: null,
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    clearManager(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
    /**This function will partially update manager data and save it to local storage */
    updateManager(state, action) {
      const newManagerData = {
        ...state.data,
        ...action.payload
      }
      state.data = newManagerData;
      localStorage.setItem("userData", JSON.stringify(newManagerData));
    }
  },
  extraReducers(builder) {
    builder
      .addAsyncThunk(getManagerData, {
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
    selectManager: (state) => state.data,
    selectManagerID: (state) => state.data?.ID,
    selectManagerProgress: (state) => state.data?.accCreated,
    selectManagerStatus: (state) => state.status,
    selectManagerError: (state) => state.error,
  }
});

// selectors
export const { selectManager, selectManagerID, selectManagerProgress, selectManagerStatus, selectManagerError } = managerSlice.selectors;

// actions
export const { clearManager, updateManager } = managerSlice.actions;
export default managerSlice.reducer;