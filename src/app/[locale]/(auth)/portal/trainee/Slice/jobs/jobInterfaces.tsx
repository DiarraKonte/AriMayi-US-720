// jobInterfaces.ts
//Change can still take place on this interface

export interface JobsState {
  jobs: Job[];
  favorites: number[]; 
  favoritesList: any[]; 
  applicationsList: any[];
  loading: boolean;
  error: string | null;
}

export enum ContractType {
  CDI = "CDI",
  CDD = "CDD",
  INTERNSHIP = "INTERNSHIP",
  APPRENTICESHIP = "APPRENTICESHIP",
  FREELANCE = "FREELANCE",
}

export enum job_status{
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  AVAILABLE = "open",
  INPROGRESS = "in progress"
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  contract_type: ContractType;
  views: number;
  favorite: boolean;
  description: string;
  applied: boolean;
  job_status: job_status;
  publishedDate: string;
  skill: string;
  degreeRequired: string;
  favoriteId?: number; 
  salary: string;
  workOrganisation: string;
  complementaryInfo : string;
}

// JobFavorite : to be able to send favorite using POST
export interface JobFavorite {
  id: number;
  title: string;    
  trainee: number;      
  saved_at: string;    
}
// JobFavorite : to be able to send an application using POST
export interface JobApplication {
  id: number;
  job: number; 
  job_status: job_status;
  created_at: string;
  updated_at: string;
}
