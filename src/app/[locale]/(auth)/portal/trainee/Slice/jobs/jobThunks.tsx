import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/axios/axios";
import { mockJobs } from "./mockJobs";
import { RootState } from "@/lib/store";
import { Job } from "./jobInterfaces";


//TODO : All these function need to be completed to match with upcoming endpoint update

// Asynchronous Redux action to recover job offers
// uses mockery data if the API fails or returns an empty response
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      let response;
      try {
        response = await api.trainee.get("/jobs/"); //
      } catch (error) {
        console.log("API call failed, using mock data:", error);
        return mockJobs;
      }
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      } else {
        console.log("API response is empty or invalid, using mock data.");
        return mockJobs;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Une erreur inconnue s'est produite");
    }
  }
);

// Asynchronous Redux action to recover job offers put in favorites
export const fetchJobFavorites = createAsyncThunk(
  "jobs/fetchJobFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.trainee.get("/job-favorites/");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris :", error);
      return rejectWithValue("Erreur lors de la récupération des favoris");
    }
  }
);

// Asynchronous Redux action to post a job in favorites
//used only in jobinterview for testing
export const postFavorites = createAsyncThunk(
  "jobs/addJobToFavorites",
  async (job: Job, { rejectWithValue }) => {
    try {
      const traineeId = 1; 

      if (!traineeId) {
        throw new Error("ID du trainee non trouvé");
      }

      console.log("BASE_URL:", process.env.BASE_URL);

      // Envoi des données attendues par l'API
      const response = await api.trainee.post("/api/v1/trainee/job-favorites/", {
        job: job.id, 
        trainee: traineeId, 
      });

      return {
        favoriteId: response.data.id, // Favorite ID created by API
        jobId: job.id, 
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erreur lors de l'ajout aux favoris");
    }
  }
);


// Asynchronous Redux action to delete favorite job with favoriteID
//used only in jobinterview.tsx for testing
export const deleteFavorites = createAsyncThunk(
  "jobs/removeJobFromFavorites",
  async ({ jobId }: { jobId: number }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const job = state.jobs.jobs.find((j) => j.id === jobId);
      const favoriteId = job?.favoriteId;

      if (!favoriteId) {
        return rejectWithValue("Favori non trouvé");
      }

      await api.trainee.delete(`/job-favorites/${favoriteId}/`);
      return { jobId }; // Retournez jobId pour la mise à jour
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      return rejectWithValue("Erreur lors de la suppression des favoris");
    }
  }
);

// Asynchronous Redux action to recover candidacy
export const getApplications = createAsyncThunk(
  "jobs/getApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.trainee.get("/job-applications/");
      return response.data; // Retourne un tableau d'objets "application"
    } catch (error: unknown) {
      console.error("Erreur lors de la récupération des candidatures :", error);
      return rejectWithValue("Erreur lors de la récupération des candidatures");
    }
  }
);

// Asynchronous Redux action to create a candidacy
//i used it in togglefavorite,tsx and call in preview-resume.tsx, not finished, trainee credential error
export const postApplication = createAsyncThunk(
  "jobs/postApplication",
  async (job: Job, {rejectWithValue }) => { // Changement : job: Job
    try {
      const traineeId = 1; 

      if (!traineeId) {
        throw new Error("ID du trainee non trouvé. Veuillez vous connecter.");
      }

      console.log("Données envoyées à l'API :", { job: job.id, trainee: traineeId });

      const response = await api.trainee.post("/job-applications/", {
        job: job.id, 
        trainee: traineeId,
      });

      console.log("Réponse de l'API :", response.data);

      return response.data;
    
    } catch (error: any) {
      console.error("Erreur API :", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Erreur lors de la création de la candidature");
    }
  }
);
// Asynchronous Redux action to delete candidacy
export const deleteApplication = createAsyncThunk(
  "jobs/deleteApplication",
  async (applicationId: number, { rejectWithValue }) => {
    try {
      await api.trainee.delete(`/job-applications/${applicationId}/`);
      return { applicationId }; // Retourne l'ID de la candidature supprimée
    } catch (error: unknown) {
      console.error("Erreur lors de la suppression de la candidature :", error);
      return rejectWithValue("Erreur lors de la suppression de la candidature");
    }
  }
);
