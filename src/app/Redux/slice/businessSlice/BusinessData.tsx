import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store";

  

interface SocialMediaLink {
  _id: string;
  platform: string;
  link: string;
}

interface Photo {
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  _id: string;
  uploadDate: string;
}

interface VideoTour {
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  _id: string;
  uploadDate: string;
}

interface BusinessData {
  URL: string;
  businessName: string;
  businessID: string;
  businessType: string;
  keyServices: string[];
  location: [number, number];
  tagline: string;
  description: string;
  email: string;
  phone: string;
  socialMediaLinks: SocialMediaLink[];
  photoGallery: Photo[];
  videoTour?: VideoTour;
}

interface BusinessState {
  data: BusinessData | null;
  loading: boolean;
  error: string | null;
}

const initialState: BusinessState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBusinessData = createAsyncThunk(
  "business/fetchData",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/webpage/get/${id}`);
      // ${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/webpage/get/BUS-e1fb3feb-d73d-4d82-84a8-d0f608d58750

      if (!response.ok) {
        throw new Error("Business not found");
      }
      const result = await response.json();
      // console.log(result);
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch business data");
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch business data");
    }
  }
);

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearBusinessData: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    updateBusinessData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchBusinessData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
      });
  },
});

export const { clearBusinessData, updateBusinessData } = businessSlice.actions;

// Selectors
export const selectBusinessData = (state: RootState) => state.business.data;
export const selectBusinessLoading = (state: RootState) => state.business.loading;
export const selectBusinessError = (state: RootState) => state.business.error;
export const selectBusinessName = (state: RootState) => state.business.data?.businessName;
export const selectBusinessID = (state: RootState) => state.business.data?.businessID;
export const selectBusinessType = (state: RootState) => state.business.data?.businessType;
export const selectKeyServices = (state: RootState) => state.business.data?.keyServices;
export const selectSocialMediaLinks = (state: RootState) => state.business.data?.socialMediaLinks;
export const selectPhotoGallery = (state: RootState) => state.business.data?.photoGallery;
export const selectVideoTour = (state: RootState) => state.business.data?.videoTour;

export default businessSlice.reducer;