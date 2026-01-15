
import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from './slice/CounterSlice';
import BusinessData from './slice/businessSlice/BusinessData';
import TrainerData from './slice/businessSlice/TrainerData';
import MembershipPlanData from './slice/businessSlice/MembershipPlanData';
import ReviewsData from './slice/businessSlice/ReviewData';
import KeyFeatures from './slice/businessSlice/KeyServices'

export type AppDispatch = typeof Store.dispatch;

export const Store = configureStore({
    reducer: {
        counter: CounterSlice,  
        business: BusinessData,
        trainers: TrainerData,
        membershipPlans : MembershipPlanData,
        reviews: ReviewsData,
        services: KeyFeatures,
    }
});


export type RootState = ReturnType<typeof Store.getState>;