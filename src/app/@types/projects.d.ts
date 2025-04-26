export type ProjectStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "VALIDATED"
  | "DONE"
  | "DRAFT";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface TProject {
  id: number;
  titled: string;
  partner: string;
  date: string;
  trainee: string;
  tags: string[];
}

// Structure based on Swager
export interface Project {
  id: number;
  name: string;
  description: string;
  acceptedDate: string | null;
  startDate: string;
  creationDate: string;
  requiredSkills: string;
  partner: number | null;
  teachers: User[];
  students: User[];
  mentors: User[];
  projectDuration: string;
  project_status: ProjectStatus;
  companyName?: string;
  deletionReason?: string | null;
  techEnvironment?: string;
  additionalInfo?: string;
}
