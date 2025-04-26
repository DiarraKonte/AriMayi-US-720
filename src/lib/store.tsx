import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import resumeSlice from "@/app/[locale]/(auth)/portal/trainee/Slice/resume/resumeSlice";
import contactSlice from "./features/contact/contactSlice";
import projectsSlice from "@/lib/features/project/projectsSlice";
import authSlice from "@/lib/features/auth/authSlice";
import jobsSlice from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobSlice";
import { useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;

// Handling storage for server-side rendering (prevents errors with Next.js SSR)
const createNoopStorage = () => ({
  getItem: async () => null, // Returns null for non-existent storage in SSR
  setItem: async (_key: string, value: any) => value, // No-op function for SSR
  removeItem: async () => {}, // No-op function for SSR
});

// Conditionally use localStorage only in the browser, otherwise use noop storage
const customStorage = typeof window !== "undefined" 
  ? storage 
  : createNoopStorage(); // Uses a fake storage for server-side rendering

const persistConfig = {
  key: "root",
  storage: customStorage, // Custom storage handling for SSR
  whitelist: ["auth", "jobs", "resume"], // Only persist authentication and job data
};

// Combine all reducers into a single root reducer
const combinedReducers = combineReducers({
  contact: contactSlice, 
  projects: projectsSlice, 
  auth: persistReducer(persistConfig, authSlice), // Persist authentication state
  resume: persistReducer(persistConfig, resumeSlice), // Persist resume state
  jobs: persistReducer(persistConfig, jobsSlice), // Persist jobs state
});

// Configure Redux store
export const store = configureStore({
  reducer: combinedReducers, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables warnings caused by non-serializable data (Redux Persist requirement)
    }),
});

// Create a Redux Persistor to persist the store state
export const persistor = persistStore(store);

// Type definitions for TypeScript
export type RootState = ReturnType<typeof store.getState>; // Represents the overall state structure
export type AppDispatch = typeof store.dispatch; // Represents the Redux dispatch type
