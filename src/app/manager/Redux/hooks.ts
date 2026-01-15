import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Typed dispatch
export const useManagerDispatch = () => useDispatch<AppDispatch>();

// Typed selector
export const useManagerSelector: TypedUseSelectorHook<RootState> = useSelector;
