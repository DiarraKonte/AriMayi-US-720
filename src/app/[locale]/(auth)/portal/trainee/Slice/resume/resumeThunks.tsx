import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProfessionalExperience, Skill } from "./resumeSlice";

// (GET) Fetch experiences from the API
export const getExperiences = createAsyncThunk(
  "resume/getExperiences", // Action name
  async (_, thunkAPI) => {
    // The second parameter is for the thunkAPI, which contains utility methods
    try {
      const response = await axios.get("/api/experiences"); // Making a GET request to fetch experiences
      return response.data; // Return the data from the API response
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch experiences"); // Reject with an error message if fetching fails
    }
  },
);

// (GET) Fetch education from the API
export const getEducation = createAsyncThunk(
  "resume/getEducation", // Action name
  async (_, thunkAPI) => {
    // Using thunkAPI for error handling
    try {
      const response = await axios.get("/api/education"); // GET request to fetch education data
      return response.data; // Return the response data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch education"); // Reject if there's an error
    }
  },
);

// (GET) Fetch skills from the API
export const getSkills = createAsyncThunk(
  "resume/getSkills", // Action name
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/skills"); // GET request for skills
      return response.data; // Return fetched skills data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch skills"); // Error handling if failed
    }
  },
);

// (GET) Fetch hobbies from the API
export const getHobbies = createAsyncThunk(
  "resume/getHobbies", // Action name
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/hobbies"); // GET request for hobbies
      return response.data; // Return the fetched hobbies data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch hobbies"); // Handle errors
    }
  },
);

// (POST) Add a new experience to the API
export const postExperience = createAsyncThunk(
  "resume/postExperience", // Action name
  async (experience: ProfessionalExperience, thunkAPI) => {
    // Pass experience as the payload
    try {
      const response = await axios.post("/api/experiences", experience); // POST request to add experience
      return response.data; // Return the added experience data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add experience"); // Handle errors
    }
  },
);

// (POST) Add a new education entry to the API
export const postEducation = createAsyncThunk(
  "resume/postEducation", // Action name
  async (education: string, thunkAPI) => {
    // Pass education data as a string
    try {
      const response = await axios.post("/api/education", { education }); // POST request to add education
      return response.data; // Return the added education data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add education"); // Error handling
    }
  },
);

// (POST) Add a new hobby to the API
export const postHobby = createAsyncThunk(
  "resume/postHobby", // Action name
  async (hobby: string, thunkAPI) => {
    // Pass hobby data as a string
    try {
      const response = await axios.post("/api/hobbies", { hobby }); // POST request to add hobby
      return response.data; // Return the added hobby data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add hobby"); // Error handling
    }
  },
);

// (POST) Add a new skill to the API
export const postSkills = createAsyncThunk(
  "resume/postSkills",
  async (skill: Skill, thunkAPI) => { // Skill complet
    try {
      const response = await axios.post("/api/skills", skill); // Envoyer l'objet complet
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add skill");
    }
  }
);

// (DELETE) Remove an experience by its ID
export const deleteExperience = createAsyncThunk(
  "resume/deleteExperience", // Action name
  async (id: string, thunkAPI) => {
    // Pass the ID of the experience to be deleted
    try {
      await axios.delete(`/api/experiences/${id}`); // DELETE request to remove experience by ID
      return id; // Return the ID of the deleted experience
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete experience"); // Error handling
    }
  },
);

// (DELETE) Remove education entry by its ID
export const deleteEducation = createAsyncThunk(
  "resume/deleteEducation", // Action name
  async (id: string, thunkAPI) => {
    // Pass the ID of the education entry to delete
    try {
      await axios.delete(`/api/education/${id}`); // DELETE request to remove education by ID
      return id; // Return the ID of the deleted education
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete education"); // Handle errors
    }
  },
);

// (DELETE) Remove hobby by its ID
export const deleteHobby = createAsyncThunk(
  "resume/deleteHobby", // Action name
  async (id: string, thunkAPI) => {
    // Pass the ID of the hobby to delete
    try {
      await axios.delete(`/api/hobbies/${id}`); // DELETE request to remove hobby by ID
      return id; // Return the ID of the deleted hobby
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete hobby"); // Error handling
    }
  },
);

// (DELETE) Remove skill by its ID
export const deleteSkill = createAsyncThunk(
  "resume/deleteSkill", // Action name
  async (id: string, thunkAPI) => {
    // Pass the ID of the skill to delete
    try {
      await axios.delete(`/api/skills/${id}`); // DELETE request to remove skill by ID
      return id; // Return the ID of the deleted skill
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete skill"); // Handle errors
    }
  },
);
