import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { job_status } from "./jobInterfaces";

// Base selector for the jobs state
// This function retrieves the global jobs state. If no jobs state is found, a default state is returned.
const selectJobsState = (state: RootState) =>
  state.jobs || { jobs: [], loading: false, error: null, jobDetails: null };


// Selector for all jobs
export const selectAllJobs = createSelector(
  selectJobsState,
  (jobsState) => jobsState.jobs, // Access the list of jobs
);

export const selectJobById = (jobId: number) =>
  createSelector(
    (state: RootState) => state.jobs,
    (jobsState) => {
      console.log("All jobs:", jobsState.jobs);  // to display all job
      return jobsState.jobs.find((job) => job.id === jobId) || null;
    }
  );

// Selector for the jobs related to applications (applied, in progress, or rejected)
export const selectAllCandidacyJobs = createSelector(
  selectJobsState,
  (jobsState) =>
    jobsState.jobs.filter(
      (job) =>
        (job.job_status === job_status.REJECTED && job.applied) || 
        (job.job_status === job_status.INPROGRESS && job.applied) || 
        job.job_status === job_status.PENDING, 
    ),
);

// Selector for the jobs who trainee candidates (efused or in progress job)
export const selectCandidacyJobs = createSelector(
  selectJobsState,
  (jobsState) =>
    jobsState.jobs.filter(
      (job) =>
        (job.job_status === job_status.REJECTED && job.applied) || 
        (job.job_status === job_status.INPROGRESS  && job.applied),
    ),
);


// Selector for the available jobs
export const selectAvailableJobs = createSelector(
  [selectAllJobs],
  (jobs) => jobs.filter((job) => !job.applied && job.job_status === "open"), // Filters jobs that are open and not applied
);


// Show the length of the jobs in the candidacy(accepted AND rejected) for applysearchbar
export const selectCandidacyJobsLength = createSelector(
  selectCandidacyJobs,
  (candidacyJobs) => candidacyJobs.length, // Counts the number of jobs in the selection
);

//return all his candidacy (rejected, in progress, pending) so he can see all his candidacy
export const selectAllCandidacyJobsLength = createSelector(
  selectAllCandidacyJobs,
  (candidacyJobs) => candidacyJobs.length, // Counts the number of jobs in the selection
);

// Selector for the favorite jobs
export const selectFavoriteJobs = createSelector(
  selectJobsState,
  (jobsState) => jobsState.jobs.filter((job) => job.favorite), // Filters the favorite jobs
);

// Selector for the number of favorite jobs
export const selectFavoriteJobsLength = createSelector(
  selectFavoriteJobs,
  (favoriteJobs) => favoriteJobs.length, // Counts the number of favorite jobs
);

// Selector for the jobs in pending status
export const selectPendingJobs = createSelector(
  selectJobsState,
  (jobsState) => jobsState.jobs.filter((job) => job.job_status === "pending"), // Filters the jobs in pending status
);

// Selector for the number of pending jobs
export const selectPendingJobsLength = createSelector(
  selectPendingJobs,
  (pendingJobs) => pendingJobs.length, // Counts the number of pending jobs
);



// Selector for the total number of submitted applications
export const selectSubmittedApplicationsCount = createSelector(
  selectJobsState,
  (jobsState) =>
    jobsState.jobs.filter(
      (job) =>
        job.job_status === "pending" ||
        job.job_status === "rejected" ||
        job.job_status === "accepted",
    ).length, // Counts the number of submitted jobs
);


// Selector for the loading state of jobs
export const selectJobsLoading = createSelector(
  selectJobsState,
  (jobsState) => jobsState.loading, // Returns the loading state
);

// Selector for errors related to jobs
export const selectJobsError = createSelector(
  selectJobsState,
  (jobsState) => jobsState.error, // Returns the error in the jobs state
);


