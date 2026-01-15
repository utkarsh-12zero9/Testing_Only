/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store";

interface MembershipPlan {
  ID: string;
  name: string;
  businessID: string;
  QR: {};
  objective: string[];
  membershipType: string;
  keyFeatures: string[];
  durationDetails: any;
  enableOnlinePayment: boolean;
  totalPrice: number;
  avgRating: number;
  totalReviews: number;
}

interface MembershipPlanState {
  plans: MembershipPlan[];
  thirtyDayPlans: MembershipPlan[];
  ninetyDayPlans: MembershipPlan[];
  loading: boolean;
  error: string | null;
}

const initialState: MembershipPlanState = {
  plans: [],
  thirtyDayPlans: [],
  ninetyDayPlans: [],
  loading: false,
  error: null,
};

export const fetchMembershipPlans = createAsyncThunk(
  "membershipPlans/fetchAll",
  async (businessId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/plan/getMembershipPlan?businessID=BUS-56b2af56-64ec-4323-bb1f-a3ee24a82541`
        // Replaced Static Business ID with Dynamic ID
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/plan/getMembershipPlan?businessID=${businessId}`

      );
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch membership plans");
      }
      return result.data.membershipPlans;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch plans");
    }
  }
);

export const fetchThirtyDayPlans = createAsyncThunk(
  "membershipPlans/fetchThirtyDay",
  async (businessId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/plan/getMembershipPlan?businessID=${businessId}&period=30`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch 30-day plans");
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch 30-day plans");
      }
      return result.data.membershipPlans;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch 30-day plans");
    }
  }
);

export const fetchNinetyDayPlans = createAsyncThunk(
  "membershipPlans/fetchNinetyDay",
  async (businessId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/plan/getMembershipPlan?businessID=${businessId}&period=90`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch 90-day plans");
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch 90-day plans");
      }
      return result.data.membershipPlans;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch 90-day plans");
    }
  }
);

const membershipPlanSlice = createSlice({
  name: "membershipPlans",
  initialState,
  reducers: {
    clearPlans: (state) => {
      state.plans = [];
      state.thirtyDayPlans = [];
      state.ninetyDayPlans = [];
      state.error = null;
      state.loading = false;
    },
    filterPlansByType: (state, action) => {
      state.plans = state.plans.filter(plan =>
        plan.membershipType === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchMembershipPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembershipPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
        state.error = null;
      })
      .addCase(fetchMembershipPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // 30-day plans
      .addCase(fetchThirtyDayPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThirtyDayPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.thirtyDayPlans = action.payload;
        state.error = null;
      })
      .addCase(fetchThirtyDayPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // 90-day plans
      .addCase(fetchNinetyDayPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNinetyDayPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.ninetyDayPlans = action.payload;
        state.error = null;
      })
      .addCase(fetchNinetyDayPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPlans, filterPlansByType } = membershipPlanSlice.actions;

export const selectAllPlans = (state: RootState) => state.membershipPlans.plans;
export const selectThirtyDayPlans = (state: RootState) => state.membershipPlans.thirtyDayPlans;
export const selectNinetyDayPlans = (state: RootState) => state.membershipPlans.ninetyDayPlans;
export const selectPlanById = (state: RootState, planID: string) => state.membershipPlans.plans.find(plan => plan.ID === planID);
export const selectPlanLoading = (state: RootState) => state.membershipPlans.loading;
export const selectPlanError = (state: RootState) => state.membershipPlans.error;

export default membershipPlanSlice.reducer;