import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store";

interface Service {
  label: string;
  value: string;
  description: string;
  icon: string;
}

interface ServicesResponse {
  success: boolean;
  message: string;
  data: {
    businessType: string;
    services: Service[];
  };
}

interface ServicesState {
  services: Service[];
  businessType: string;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  businessType: "",
  loading: false,
  error: null,
};

export const fetchKeyServices = createAsyncThunk(
  "services/fetchKeyServices",
  async (businessType: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dropdown/keyServices/${businessType}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const result: ServicesResponse = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch services");
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch services"
      );
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearServices: (state) => {
      state.services = [];
      state.businessType = "";
      state.error = null;
      state.loading = false;
    },
    updateService: (state, action) => {
      const { value, updates } = action.payload;
      const serviceIndex = state.services.findIndex(
        (service) => service.value === value
      );
      if (serviceIndex !== -1) {
        state.services[serviceIndex] = {
          ...state.services[serviceIndex],
          ...updates,
        };
      }
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    removeService: (state, action) => {
      state.services = state.services.filter(
        (service) => service.value !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKeyServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKeyServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.services;
        state.businessType = action.payload.businessType;
        state.error = null;
      })
      .addCase(fetchKeyServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.services = [];
        state.businessType = "";
      });
  },
});

export const { clearServices, updateService, addService, removeService } =
  servicesSlice.actions;

export const selectAllServices = (state: RootState) => state.services.services;
export const selectServicesByType = (state: RootState) =>
  state.services.businessType;
export const selectServicesLoading = (state: RootState) =>
  state.services.loading;
export const selectServicesError = (state: RootState) => state.services.error;
export const selectServiceByValue = (value: string) => (state: RootState) =>
  state.services.services.find((service) => service.value === value);

export default servicesSlice.reducer;
