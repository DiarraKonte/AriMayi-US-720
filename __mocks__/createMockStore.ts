/* eslint-disable */
// @ts-nocheck
/**
 * @jest-environment node
 */

import { configureStore } from "@reduxjs/toolkit";
import { mockJobs } from "./mockData";
import { JobsState } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobInterfaces";

// Define an interface for the mock state
interface MockState {
  jobs: JobsState;
}

// Function to create a mock store with an optional initial state override
export const createMockStore = (initialState: Partial<MockState> = {}) => {
  // Default state for the jobs slice
  const defaultState: MockState = {
    jobs: {
      jobs: mockJobs || [],
      jobDetails: mockJobs ? mockJobs[0] : null,
      loading: false,
      error: null,
    },
  };

  // Merge the default state with any initial state provided
  const mergedState: MockState = {
    ...defaultState,
    ...initialState,
    jobs: {
      ...defaultState.jobs,
      ...(initialState.jobs || {}),
    },
  };

  // Configure and return the Redux store with the merged state
  return configureStore({
    reducer: {
      jobs: (state = mergedState.jobs) => state,
    },
    preloadedState: mergedState,
  });
};
