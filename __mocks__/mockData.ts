/* eslint-disable */
// @ts-nocheck
/**
 * @jest-environment node
 */
import { Job } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobInterfaces";
import { Hobby, Experience, Skill, Education } from "@/app/[locale]/(auth)/portal/trainee/Slice/types/resumeInteface";

export const mockJobs: Job[] = [
  {
    id: 1,
    title: "Développeur Front-End",
    company: {
      id: 101,
      companyName: "Tech Innovators",
    },
    location: "Paris",
    contractType: "CDI",
    views: 150,
    favorite: false,
    applied: false, 
    status: "open",
    publishedDate: "2025-02-27T09:00:00Z",    
    offerDescription: "Développement et optimisation de l'interface utilisateur en React.",
    skill: "React, TypeScript, CSS, Ant Design",
    degreeRequired: "Bac+5",
    details: {
      address: "15 Rue de l'Innovation, 75001 Paris",
      workOrganisation: "Télétravail partiel (2j/semaine)",
      complementaryInfo: 
        {
          workHours: "9h-18h",
        },
      salary: {
        range: "40K+",
      },
    }
  },
  {
    id: 2,
    title: "Développeur Back-End",
    company: {
      id: 102,
      companyName: "FinTech Solutions",
    },
    location: "Lyon",
    contractType: "CDD",
    views: 250,
    favorite: false,
    applied: true, 
    status: "refused",
    publishedDate: "2025-01-25T14:30:00Z", 
    offerDescription: "Mise en place d'API sécurisées et gestion de bases de données.",
    skill: "Node.js, Express, MongoDB, Docker",
    degreeRequired: "Bac+3",
    details: {
      address: "25 Avenue des Finances, 69002 Lyon",
      workOrganisation: "Sur site",
      complementaryInfo: 
        {
          workHours: "8h30-17h30",
        },
      salary: {
        range: "30K-35K",
      }
    }
  },
  {
    id: 3,
    title: "Développeur Full-Stack",
    company: {
      id: 103,
      companyName: "Creative Labs",
    },
    location: "Marseille",
    contractType: "CDD",
    views: 180,
    favorite: false,
    applied: false,
    status: "open",
    publishedDate: "2025-02-20T08:00:00Z", 
    offerDescription: "Développement d'applications web en MERN stack.",
    skill: "React, Node.js, MongoDB, GraphQL",
    degreeRequired: "Bac+4",
    details: {
      address: "8 Boulevard Créatif, 13001 Marseille",
      workOrganisation: "Télétravail complet",
      complementaryInfo: 
        {
          workHours: "Flexible",
        },
      salary: {
        range: "35K-40K",
      },
    }
  },
  {
    id: 4,
    title: "Développeur Mobile",
    company: {
      id: 104,
      companyName: "Global Tech",
    },
    location: "Paris",
    contractType: "CDI",
    views: 220,
    favorite: false,
    applied: true, 
    status: "pending",
    publishedDate: "2025-01-15T16:45:00Z", 
    offerDescription: "Développement et maintenance d'applications mobiles en Flutter.",
    skill: "Flutter, Dart, Firebase, REST API",
    degreeRequired: "Bac+3",
    details: {
      address: "45 Rue Technologique, 75008 Paris",
      workOrganisation: "Hybride",
      complementaryInfo: 
        {
          workHours: "9h-18h",
        },
      salary: {
        range: "35K-40K",
      },
    }
  },
  
  {
    id: 5,
    title: "Ingénieur Data",
    company: {
      id: 105,
      companyName: "DataCorp",
    },
    location: "Lyon",
    contractType: "CDI",
    views: 300,
    favorite: false,
    applied: false, 
    status: "open",
    publishedDate: "2025-01-01T09:30:00Z", // Il y a 27 jours
    offerDescription: "Analyse et traitement des données massives pour des solutions IA.",
    skill: "Python, TensorFlow, SQL, BigQuery",
    degreeRequired: "Bac+5",
    details: {
      address: "12 Rue des Données, 69003 Lyon",
      workOrganisation: "Sur site",
      complementaryInfo: 
        {
          workHours: "9h-18h",
        },
      salary: {
        range: "40K+",
      },
    }
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: {
      id: 104,
      companyName: "Global Tech",
    },
    location: "Paris",
    contractType: "CDI",
    views: 220,
    favorite: false,
    applied: false, 
    status: "open",
    publishedDate: "2025-02-15T09:00:00Z", // Il y a 1 mois et 13 jours
    offerDescription: "Mise en place et maintenance de l'infrastructure cloud et CI/CD.",
    skill: "Docker, Kubernetes, AWS, Jenkins",
    degreeRequired: "Bac+5",
    details: {
      address: "45 Rue Technologique, 75008 Paris",
      workOrganisation: "Hybride",
      complementaryInfo: 
        {
          workHours: "9h-18h",
        },
      salary: {
        range: "40K+",
      },
    }
  },
  {
    id: 7,
    title: "UX/UI Designer",
    company: {
      id: 106,
      companyName: "DesignWorks",
    },
    location: "Paris",
    contractType: "CDI",
    views: 180,
    favorite: false,
    applied: false, 
    status: "open",
    publishedDate: "2025-02-10T16:00:00Z", // Il y a 1 mois et 18 jours
    offerDescription: "Conception d'interfaces utilisateur innovantes et centrées sur l'utilisateur.",
    skill: "Figma, Adobe XD, Sketch, User Research",
    degreeRequired: "Bac+3",
    details: {
      address: "30 Rue du Design, 75011 Paris",
      workOrganisation: "Télétravail partiel",
      complementaryInfo: 
        {
          workHours: "10h-19h",
        },
      salary: {
        range: "30K-35K",
      },
    }
  },
  {
    id: 8,
    title: "Product Manager",
    company: {
      id: 107,
      companyName: "ProductFirst",
    },
    location: "Paris",
    contractType: "CDI",
    views: 250,
    favorite: false,
    applied: false, 
    status: "open",
    publishedDate: "2025-02-25T14:30:00Z", // Il y a 3 jours
    offerDescription: "Gestion de produits numériques de la conception au lancement.",
    skill: "Agile, JIRA, Product Vision, Market Analysis",
    degreeRequired: "Bac+5",
    details: {
      address: "18 Avenue du Produit, 75016 Paris",
      workOrganisation: "Hybride",
      complementaryInfo: 
        {
          workHours: "9h-18h",
        },
      salary: {
        range: "40K+",
      },
    }
  },
  {
    id: 9,
    title: "QA Engineer",
    company: {
      id: 104,
      companyName: "Global Tech",
    },
    location: "Paris",
    contractType: "CDI",
    views: 210,
    favorite: false,
    applied: true, 
    status: "pending",
    publishedDate:  "2025-02-05T14:30:00Z",
    offerDescription: "Gestion de produits numériques de la conception au lancement.",
    skill: "Selenium, Cypress, Jest, Manual Testing",
    degreeRequired: "Bac+3",
    details: {
      address: "45 Rue Technologique, 75008 Paris",
      workOrganisation: "Sur site",
      complementaryInfo: 
        {
          workHours: "9h-18h",
        },
      salary: {
        range: "25K-30K",
      },
    }
  },

  {
    id: 10,
    title: "Développeur Mobile",
    company: {
      id: 104,
      companyName: "Global Tech",
    },
    location: "Paris",
    contractType: "CDI",
    views: 220,
    favorite: false,
    applied: true, 
    status: "pending",
    publishedDate:  "2025-02-01T14:30:00Z",
    offerDescription: "Développement et maintenance d'applications mobiles en Flutter.",
    skill: "Flutter, Dart, Firebase, REST API",
    degreeRequired: "Bac+3",
    details: {
      address: "45 Rue Technologique, 75008 Paris",
      workOrganisation: "Hybride",
      complementaryInfo: 
        {
          workHours: "9h-18h",
        },
      salary: {
        range: "35K-40K",
      },
    }
  },
  {
    id: 11,
    title: "Développeur Mobile",
    company: {
      id: 104,
      companyName: "Global Tech",
    },
    location: "Paris",
    contractType: "CDI",
    views: 220,
    favorite: false,
    applied: true, 
    status: "pending",
    publishedDate: "2025-01-17T14:00:00Z", 
    offerDescription: "Développement et maintenance d'applications mobiles en Flutter.",
    skill: "Flutter, Dart, Firebase, REST API",
    degreeRequired: "Bac+3",
    details: {
      address: "45 Rue Technologique, 75008 Paris",
      workOrganisation: "Hybride",
      complementaryInfo: 
        {
          workHours: "9h-18h",
        },
      salary: {
        range: "35K-40K",
      },
    }
  },
];
 



// -------------------------
// Define your mock experiences
// -------------------------
export const mockExperiences: Experience[] = [
  {
    id: "exp1",
    title: "Developer",
    company: "Tech Co",
    sector: "IT",
    place: "Paris",
    startDate: "2022-01-01",
    endDate: "2023-01-01",
  },
  {
    id: "exp2",
    title: "Junior Developer",
    company: "StartUp Inc",
    sector: "Software",
    place: "Lyon",
    startDate: "2021-01-01",
    endDate: "2021-12-31",
  },
];


// -------------------------
export const mockEducation: Education[] = [
  {
    id: "edu1",
    degree: "Master",
    programstudy: "Computer Science",
    institution: "University of Paris",
  },
  {
    id: "edu2",
    degree: "Bachelor",
    programstudy: "Information Technology",
    institution: "Tech Institute",
  },
];


export const mockSkills: Skill[] = [
  { id: "skill1", name: "React" },
  { id: "skill2", name: "TypeScript" },
  { id: "skill3", name: "Node.js" },
];


export const mockHobbies: Hobby[] = [
  { id: "hobby1", name: "Reading" },
  { id: "hobby2", name: "Hiking" },
];


export const mockRootState = {
  resume: {
    experiences: mockExperiences,
    education: mockEducation,
    skills: mockSkills,
    hobbies: mockHobbies,
    location: "Paris",
  },
};