import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveFavoritesToStorage, loadFavoritesFromStorage, saveToLocalStorage, loadFromLocalStorage } from "../../localStorage";
import { createSelector } from "reselect";
import { RootState } from "@/lib/store";
import { Job, JobsState, JobApplication, job_status } from "./jobInterfaces";
import { fetchJobs, fetchJobFavorites, postFavorites, deleteFavorites, postApplication, deleteApplication } from "./jobThunks";

const initialState: JobsState = {
  jobs: [],
  favorites: [],
  favoritesList: [],
  applicationsList: [],
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const jobIndex = state.jobs.findIndex((job) => job.id === action.payload);
      if (jobIndex !== -1) {
        const updatedFavorite = !state.jobs[jobIndex].favorite;
        state.jobs[jobIndex].favorite = updatedFavorite;

        // Updates local storage with the list of favorite job IDs after toggling
        const favoriteIds = state.jobs.filter((job) => job.favorite).map((job) => job.id);
        saveFavoritesToStorage(favoriteIds);
      }
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      // Maps over all jobs and sets their favorite status based on the provided array of IDs
      state.jobs = state.jobs.map((job) => ({
        ...job,
        favorite: action.payload.includes(job.id),
      }));
    },
    setFavoriteId: (state, action: PayloadAction<{ jobId: number; favoriteId: number }>) => {
      const jobIndex = state.jobs.findIndex((job) => job.id === action.payload.jobId);
      if (jobIndex !== -1) {
        // Assigns a favoriteId to a specific job, typically after a successful POST to the API
        state.jobs[jobIndex].favoriteId = action.payload.favoriteId;
      }
    },
    applyToJob: (state, action: PayloadAction<number>) => {
      const jobIndex = state.jobs.findIndex((job) => job.id === action.payload);
      if (jobIndex !== -1) {
        state.jobs[jobIndex].applied = true;
        state.jobs[jobIndex].job_status = job_status.INPROGRESS;
        // Persists the updated jobs list to local storage after applying to a job
        saveToLocalStorage("jobs", state.jobs);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false;
        const favoriteIds = loadFavoritesFromStorage();
        const appliedJobs = loadFromLocalStorage("jobs") || [];
        // Merges fetched jobs with local storage data for favorites and applied status
        state.jobs = action.payload.map((job) => {
          const storedJob = appliedJobs.find((j: Job) => j.id === job.id);
          return {
            ...job,
            favorite: favoriteIds.includes(job.id),
            applied: storedJob ? storedJob.applied : job.applied,
            job_status: storedJob ? storedJob.job_status : job.job_status,
          };
        });
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchJobFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoritesList = action.payload;
        // Updates job favorite status based on fetched favorites, matching by job title
        state.jobs = state.jobs.map((job) => {
          const favorite = action.payload.find((fav: any) => fav.job_title === job.title);
          return {
            ...job,
            favorite: !!favorite,
            favoriteId: favorite ? favorite.id : undefined,
          };
        });
      })
      .addCase(fetchJobFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(postFavorites.fulfilled, (state, action: PayloadAction<{ favoriteId: number; jobId: number }>) => {
        const { favoriteId, jobId } = action.payload;
        const jobIndex = state.jobs.findIndex(job => job.id === jobId);
        if (jobIndex > -1) {
          // Marks a job as favorite and assigns the favoriteId after a successful POST
          state.jobs[jobIndex].favorite = true;
          state.jobs[jobIndex].favoriteId = favoriteId;
        }
      })
      .addCase(postFavorites.rejected, (state, action) => {
        state.error = action.error.message || "Erreur lors de l'ajout aux favoris";
      })
      .addCase(deleteFavorites.fulfilled, (state, action: PayloadAction<{ jobId: number }>) => {
        const { jobId } = action.payload;
        const jobIndex = state.jobs.findIndex((job) => job.id === jobId);
        if (jobIndex !== -1) {
          // Removes favorite status and favoriteId from a job after deletion
          state.jobs[jobIndex].favorite = false;
          state.jobs[jobIndex].favoriteId = undefined;
        }
        // Updates local storage with the new list of favorite IDs
        const favoriteIds = state.jobs.filter((job) => job.favorite).map((job) => job.id);
        saveFavoritesToStorage(favoriteIds);
      })
      .addCase(deleteFavorites.rejected, (state, action) => {
        state.error = action.error.message || "Erreur lors de la suppression des favoris";
      })
      .addCase(postApplication.fulfilled, (state, action: PayloadAction<JobApplication>) => {
        state.loading = false;
        // Adds the new application to the applications list
        state.applicationsList.push(action.payload);
        const jobIndex = state.jobs.findIndex((job) => job.id === action.payload.job);
        if (jobIndex !== -1) {
          // Updates the job's applied status and sets it to "in progress" after a successful application
          state.jobs[jobIndex].applied = true;
          state.jobs[jobIndex].job_status = job_status.INPROGRESS;
        }
        saveToLocalStorage("jobs", state.jobs);
      })
      .addCase(postApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la création de la candidature";
      })
      .addCase(deleteApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApplication.fulfilled, (state, action: PayloadAction<{ applicationId: number }>) => {
        state.loading = false;
        const { applicationId } = action.payload;
        const applicationIndex = state.applicationsList.findIndex((app) => app.id === applicationId);
        if (applicationIndex !== -1) {
          // Removes the application from the list and resets the job's applied status
          const jobId = state.applicationsList[applicationIndex].job;
          state.applicationsList.splice(applicationIndex, 1);
          const jobIndex = state.jobs.findIndex((job) => job.id === jobId);
          if (jobIndex !== -1) {
            state.jobs[jobIndex].applied = false;
            state.jobs[jobIndex].job_status = job_status.AVAILABLE;
          }
          saveToLocalStorage("jobs", state.jobs);
        }
      })
      .addCase(deleteApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression de la candidature";
      });
  },
});

export const selectJobs = (state: RootState) => state.jobs.jobs;
export const selectJobFavorites = createSelector(
  [selectJobs],
  (jobs) => jobs.filter((job) => job.favorite)
);
export const { toggleFavorite, setFavorites, setFavoriteId, applyToJob } = jobsSlice.actions;
export default jobsSlice.reducer;