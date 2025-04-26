import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project, ProjectStatus, TProject } from "@/app/@types/projects";
import { api } from "@/axios/axios";

export const getProjects = createAsyncThunk<
  TProject[],
  void,
  { rejectValue: string }
>("projects/getProjects", async (_, { rejectWithValue }) => {
  try {
    const response = await api.admin.projects.get<Project[]>("/projects/");

    const projects: TProject[] = response.data.map((project: any) => ({
      id: project.id,
      titled: project.name,
      partner: project.partner ?? "Inconnu",
      date: project.startDate,
      trainee: `${project.students.length}`,
      tags: [mapProjectStatusToTag(project.project_status)],
    }));
    return projects;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Error while retrieving projects.",
      );
    }
    return rejectWithValue("Unknown error");
  }
});

export const getProjectDetails = createAsyncThunk<
  Project,
  number,
  { rejectValue: string }
>("projects/fetchDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await api.admin.projects.get<Project>(`/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data || "Error while retrieving project details.",
      );
    }
    return rejectWithValue("Unknown error");
  }
});

// [PATCH]
export const updateProject = createAsyncThunk<
  Project,
  { id: number; projectData: Partial<Project> },
  { rejectValue: string }
>(
  "projects/updateProject",
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      const response = await api.admin.projects.patch<Project>(
        `/projects/${id}/`,
        projectData,
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Error while updating the project.",
        );
      }
      return rejectWithValue("Unknown error");
    }
  },
);

// Function to map ProjectStatus to Tags in ProjectList
const mapProjectStatusToTag = (status: ProjectStatus): string => {
  switch (status) {
    case "CREATED":
      return "Nouveau";
    case "IN_PROGRESS":
      return "En cours";
    case "VALIDATED":
      return "Validé";
    case "DONE":
      return "Terminé";
    case "DRAFT":
      return "Brouillon";
    default:
      return "Inconnu";
  }
};
