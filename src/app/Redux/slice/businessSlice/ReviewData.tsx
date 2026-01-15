import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../Store";

interface Review {
  customerName: string;
  planID: string;
  businessID: string;
  review?: string;
  issues?: string;
  rating: number;
  createdOn: string;
}

interface RatingCounts {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

interface PercentChange {
  totalReviews: number;
  averageRating: number;
}

interface ReviewsStatistics {
  totalReviews: number;
  averageRating: number;
  percentChange: PercentChange;
  ratingCounts: RatingCounts;
}

interface Pagination {
  current: number;
  total: number;
  totalResults: number;
}

interface ReviewsData {
  finalReviews: Review[];
  statistics: ReviewsStatistics;
  pagination: Pagination;
}

interface ReviewsState {
  data: ReviewsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchReviewsData = createAsyncThunk(
  "reviews/fetchData",
  async (businessId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review/get?businessId=${businessId}`);
      if (!response.ok) {
        throw new Error("Reviews not found");
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch reviews data");
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch reviews data");
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewsData: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    updateReviewsData: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    addNewReview: (state, action) => {
      if (state.data) {
        state.data.finalReviews = [action.payload, ...state.data.finalReviews];
        
        const stats = state.data.statistics;
        stats.totalReviews += 1;

        const rating = action.payload.rating.toString() as keyof RatingCounts;
        stats.ratingCounts[rating] += 1;
        
        let totalRatingScore = 0;
        const counts = stats.ratingCounts;
        totalRatingScore = counts["1"] + counts["2"] * 2 + counts["3"] * 3 + counts["4"] * 4 + counts["5"] * 5;
        stats.averageRating = parseFloat((totalRatingScore / stats.totalReviews).toFixed(2));
        
        state.data.pagination.totalResults += 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchReviewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
      });
  },
});

export const { 
  clearReviewsData, 
  updateReviewsData,
  addNewReview
} = reviewsSlice.actions;

export const selectReviewsData = (state: RootState) => state.reviews.data;
export const selectReviews = (state: RootState) => state.reviews.data?.finalReviews;
export const selectReviewsLoading = (state: RootState) => state.reviews.loading;
export const selectReviewsError = (state: RootState) => state.reviews.error;
export const selectReviewsStatistics = (state: RootState) => state.reviews.data?.statistics;
export const selectAverageRating = (state: RootState) => state.reviews.data?.statistics.averageRating;
export const selectTotalReviews = (state: RootState) => state.reviews.data?.statistics.totalReviews;
export const selectRatingCounts = (state: RootState) => state.reviews.data?.statistics.ratingCounts;
export const selectReviewsPagination = (state: RootState) => state.reviews.data?.pagination;

export default reviewsSlice.reducer;