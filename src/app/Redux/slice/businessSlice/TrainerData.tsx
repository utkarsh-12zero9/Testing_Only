/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store";

interface TrainerProfile {
  ID: string;
  name: string;
  businessID: string;
  plans: any[];
  age: number;
  desc: string;
  expertise: string[];
}

interface TrainerState {
  data: TrainerProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainerState = { 
  data: [],
  loading: false,
  error: null,
};

export const fetchTrainerProfiles = createAsyncThunk(
  "trainers/fetchData",
  async (businessId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trainer/trainer-profile?businessID=${businessId}`);
      if (!response.ok) {
        throw new Error("Trainers not found");
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch trainer profiles");
      }
      return result.data.trainerProfiles;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch trainer profiles");
    }
  }
);

const trainerSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {
    clearTrainerData: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
    updateTrainerProfile: (state, action) => {
      const index = state.data.findIndex(
        (profile) => profile.ID === action.payload.ID
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    addTrainerProfile: (state, action) => {
      state.data.push(action.payload);
    },
    deleteTrainerProfile: (state, action) => {
      state.data = state.data.filter(
        (profile) => profile.ID !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainerProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchTrainerProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = [];
      });
  },
});

export const {
  clearTrainerData,
  updateTrainerProfile,
  addTrainerProfile,
  deleteTrainerProfile
} = trainerSlice.actions;


export const selectTrainerData = (state: RootState) => state.trainers.data;
export const selectTrainerLoading = (state: RootState) => state.trainers.loading;
export const selectTrainerError = (state: RootState) => state.trainers.error;
export const selectTrainerNames = (state: RootState) => state.trainers.data.map(trainer => trainer.name);
export const selectTrainerExpertise = (state: RootState) => 
  state.trainers.data.reduce((acc: string[], trainer) => [...acc, ...trainer.expertise], []);
export const selectTrainerById = (id: string) => (state: RootState) => 
  state.trainers.data.find(trainer => trainer.ID === id);
export const selectTrainersByBusinessId = (businessId: string) => (state: RootState) => 
  state.trainers.data.filter(trainer => trainer.businessID === businessId);

export default trainerSlice.reducer;