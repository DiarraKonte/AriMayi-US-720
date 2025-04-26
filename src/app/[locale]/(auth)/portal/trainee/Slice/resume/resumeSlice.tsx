import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getExperiences,
  postExperience,
  postSkills,
  postHobby,
  postEducation,
} from "./resumeThunks";
import { loadFromLocalStorage } from "../../localStorage";


// EditAction type
interface EditAction<T> {
  id: string;
  data: T;
}

// Import the provided interfaces
export interface Resume {
  professionalExperience: ProfessionalExperience[];
  schoolCareer: SchoolCareer[];
  leisure: Leisure[];
  locations: Location[];
  skills: Skill[];
}

export interface ProfessionalExperience {
  id: string;
  position: string;
  company: string;
  sector : string,
  place : string,
  start_date: string ;
  end_date?: string | null;
  description: string;
  resume: number;
}

export interface SchoolCareer {
  id: string;
  school: string;
  degree: string;
  programstudy : string,
  start_date: string;
  end_date?: string;
  resume: number;
}

export interface Skill {
  id: string ;
  name: string;
  level: string;
  category: string;
  resume: number;
}

export interface Leisure {
  id: string;
  name: string;
  resume: number;
}

export interface Location {
  id: string;
  city: string;
  country: string;
  resume: number;
}

// Updated ResumeState to match the Resume interface
interface ResumeState {
  professionalExperience: ProfessionalExperience[];
  schoolCareer: SchoolCareer[];
  skills: Skill[];
  leisure: Leisure[];
  locations: Location[]; // Changed from string to array
  draft?: ResumeState;
}

// Load saved data from localStorage
const savedData = loadFromLocalStorage("resumeData") || {};

const initialState: ResumeState = {
  professionalExperience: savedData.professionalExperience || [],
  schoolCareer: savedData.schoolCareer || [],
  skills: savedData.skills || [],
  leisure: savedData.leisure || [],
  locations: savedData.locations || [],
  draft: undefined,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    // Professional Experience
    addExperience: (state, action: PayloadAction<ProfessionalExperience>) => {
      state.professionalExperience.push(action.payload);
    },
    updateExperience: (
      state,
      action: PayloadAction<EditAction<ProfessionalExperience>>,
    ) => {
      const index = state.professionalExperience.findIndex(
        (exp) => exp.id === action.payload.id,
      );
      if (index !== -1) {
        state.professionalExperience[index] = {
          ...state.professionalExperience[index],
          ...action.payload.data,
        };
      }
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.professionalExperience = state.professionalExperience.filter(
        (exp) => exp.id !== action.payload,
      );
    },

    // School Career
    addEducation: (state, action: PayloadAction<SchoolCareer>) => {
      state.schoolCareer.push(action.payload);
    },
    updateEducation: (
      state,
      action: PayloadAction<EditAction<SchoolCareer>>,
    ) => {
      const index = state.schoolCareer.findIndex(
        (edu) => edu.id === action.payload.id,
      );
      if (index !== -1) {
        state.schoolCareer[index] = {
          ...state.schoolCareer[index],
          ...action.payload.data,
        };
      }
    },
    deleteEducation: (state, action: PayloadAction<string>) => {
      state.schoolCareer = state.schoolCareer.filter(
        (edu) => edu.id !== action.payload,
      );
    },

    // Skills
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<EditAction<Skill>>) => {
      const index = state.skills.findIndex(
        (skill) => skill.id === action.payload.id,
      );
      if (index !== -1) {
        state.skills[index] = { ...state.skills[index], ...action.payload.data };
      }
    },
    deleteSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((skill) => skill.id !== action.payload);
    },

    // Leisure
    addHobby: (state, action: PayloadAction<Leisure>) => {
      state.leisure.push(action.payload);
    },
    updateHobby: (state, action: PayloadAction<EditAction<Leisure>>) => {
      const index = state.leisure.findIndex(
        (leisure) => leisure.id === action.payload.id,
      );
      if (index !== -1) {
        state.leisure[index] = { ...state.leisure[index], ...action.payload.data };
      }
    },
    deleteHobby: (state, action: PayloadAction<string>) => {
      state.leisure = state.leisure.filter(
        (leisure) => leisure.id !== action.payload,
      );
    },
    // Locations
    setLocation: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExperiences.fulfilled, (state, action) => {
        state.professionalExperience = action.payload;
      })
      .addCase(postExperience.fulfilled, (state, action) => {
        state.professionalExperience.push(action.payload);
      })
      .addCase(postEducation.fulfilled, (state, action) => {
        state.schoolCareer.push(action.payload);
      })
      .addCase(postSkills.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(postHobby.fulfilled, (state, action) => {
        state.leisure.push(action.payload);
      })
      
  },
});

export const {
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addHobby,
  updateHobby,
  deleteHobby,
 setLocation
} = resumeSlice.actions;

export default resumeSlice.reducer;