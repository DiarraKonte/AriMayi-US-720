import { createSlice } from "@reduxjs/toolkit";
import { getProjects, getProjectDetails } from "./projectsThunks";
import { Project, TProject } from "@/app/@types/projects";

interface ProjectsState {
  data: TProject[];
  loading: boolean;
  error: string | null;
  projectDetails: Project | null;
}

const initialState: ProjectsState = {
  data: [],
  loading: false,
  error: null,
  projectDetails: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProjectDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.projectDetails = action.payload; // Stockez les détails du projet
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
