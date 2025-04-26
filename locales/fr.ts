import { title } from "process";

export default {
  'contactUs': 'Contactez Nous',
  'sendMessage': 'Envoyer un message',
  'enter.yourName': 'Entrez votre nom',
  'enter.email': 'Entrez une adresse e-mail valide',
  'enter.message': 'Entrez votre message',
  'input.notValid': "L'adresse e-mail saisie n'est pas valide !",
  'input.email': 'Veuillez saisir votre adresse e-mail !',
  'adress': 'Adresse',
  'phone': 'Téléphone',
  'email': 'E-mail',

  Notification: {
    loading: "Chargement...",
    addedToFavorites: 'a été ajouté aux favoris.',
    removedFromFavorites: 'a été supprimé des favoris.',
    addedToFavoritesTitle: 'Préféré ajouté',
    removedFromFavoritesTitle: 'Favori supprimé', // Corrigé "Fouré" → "Favori"
    applicationSubmitted: "Candidature envoyée",
    applicationSuccess: "Votre candidature a été soumise avec succès."
  },

  SearchBar: {
    Favorites: "Favoris",
    Apply: "Candidature",
    Interview: "En entretien",
    EmptyFavorites: "Vous n'avez pas encore de jobs favoris",
    EmptyCandidacy: "Vous n'avez postulé à aucun job",
    EmptyInterviews: "Aucun entretien prévu",
  },

  navbar: {
    home: 'Accueil',
    candidates: 'Candidat.e.s',
    projects: 'Projets',
    cv: 'CV',
    documents: 'Documents',
    login: 'Se connecter',
    logout: 'Se déconnecter',
  },

  adminHome: {
    greeting: 'Bonjour Nom Prénom',
    counters: 'Compteurs',
    partnerCounters: 'Compteurs partenaires',
    traineeCounters: 'Compteur apprenant.e.s',
    jobOffersCounters: 'Compteur offres d’emploi',
    projectCounters: 'Compteur projets',
    available: 'Disponibles :',
    reserved: 'Réservés :',
    pending: 'En attente :',
    total: 'TOTAL :',
    tables: 'Tableaux',
    traineeTable: 'Tableau apprenant.e.s',
    projectTable: 'Tableau projets',
    partnerTable: 'Tableau partenaires',
    jobOffersTable: 'Tableau offres d’emploi',
  },

  projectsList: {
    title: 'Tableau projets',
    filtersButton: 'Filtres',
    searchPlaceholder: 'Rechercher',
    table: {
      columns: {
        title: 'Intitulé',
        partner: 'Partenaire',
        date: 'Date',
        trainee: 'Apprenants',
        status: 'Statut',
      },
      emptyText: 'Aucun projet à afficher.',
    },
    tags: {
      new: 'Nouveau',
      inProgress: 'En cours',
      validated: 'Validé',
      done: 'Terminé',
      draft: 'Brouillon',
      unknown: 'Inconnu',
    },
    partner: {
      unknown: 'Inconnu',
    },
    pagination: {
      defaultCurrent: 1,
    },
    exportButton: 'Télécharger excel/csv',
  },

  projectsDetails: {
    projectTitle: "Intitulé du projet",
    company: "Entreprise",
    address: "Adresse",
    date: "Date",
    description: "Description",
    descriptionUnavailable: "Description non disponible",
    technicalEnvironment: "Environnement technique",
    technicalEnvironmentUnavailable: "Environnement technique non disponible",
    mapPlaceholder: "Carte (à venir)",
    jobTitle: "Intitulé du poste",
    degreeRequired: "Niveau requis",
    contractType: "Type de contrat",
    workOrganisation: "Organisation de travail",
    advantages: "Avantages",
    additionalInfo: "Infos complémentaires",
    views: "Vues",
    applications: "Candidatures",
    seeApplications: "Voir les candidatures",
    qualifyProject: "Qualifier le projet",
    putOnHold: "Mettre en attente",
    commercialFollowUp: "Suivi commercial",
  },

  projectsQualify: {
    title: 'Qualifier le projet',
    cardTitle: 'Informations',
    placeholders: {
      companyName: "Nom de l'entreprise",
      address: "Adresse",
      startDate: "Date de prise de poste",
      jobDescription: "Description de l'offre d'emploi",
      technicalEnvironment: "Environnement technique",
      additionalInformation: "Informations complémentaires",
    },
    buttons: {
      validateProject: 'Valider le projet',
      saveDraft: 'Enregistrer le brouillon',
      projectQualified: 'Le projet est qualifié!',
      backToList: 'Revenir à la liste des projets',
    },
    modal: {
      title: 'Le projet est qualifié!',
    },
  },

  TraineeHome: {
    Hello: "Bonjour",
    FoundAJob: "Trouver un emploi",
    JobOffer: "offre d'emploi",
    Applications: "Candidature",
    Applications1: "Candidatures",
    Apply: "Postuler",
    Pending: "en attente",
    SeeAll: "- Tout Voir",
    Job: "Intitulé du poste 1",
    Favorite: "Vos favoris",
    CandidacyPending: "Vos candidatures en attente",
    ContractType: "Type de contrat",
    FullTime: "Temps plein",
    Views: "vues",
    PublishedTwoWeeksAgo: "Publié il y a ",
    Interview: "En entretien",
    rejected: "Rejeté",
    JobApplications: "POSTULER POUR CE POSTE",
    Available: "emplois disponibles",
    InProgress: "En cours"
  },

  'modal': {
    confirmMessage: "Êtes-vous sûr.e de vouloir envoyer votre candidature ?",
    applyButton: "Postuler",
    cancelButton: "Annuler"
  },

  JobDetails: {
    company: "Entreprise: ",
    address: "Adresse: ",
    Address: "Adresse",
    date: "Date: ",
    Description: "Description",
    technicalEnvironment: "Environnement technique",
    jobTitle: "Titre du poste",
    degreeRequired: "Niveau requis",
    contractType: "Type de contrat",
    workOrganisation: "Organisation du travail",
    additionalInfo: "Informations supplémentaires",
    remotePolicy: "politique de travail à distance",
    workHours: "Horaires de travails",
    salary: "Salaire",
    OfferCandidacy: "Candidature a l'offre",
    cvdownload: "Télécharger le CV"
  },

  TraineeJob: {
    NoJobCandidacyFound: "Aucune offre d'emploi trouvée.",
    NoJobFavoriteFound: "Aucun favori trouvé.",
    NoInterviewApplications: "Vous n'avez pas encore d'entretien",
    FavoriteLoading: "Chargement des offres favorites...",
    AlreadyApplied: "Vous avez déjà postulé pour cette offre",
    PendingProcessing: "Votre candidature est en cours de traitement",
    AdditionalInfo: 'Infos complémentaires',
    NoAdditionalInfo: "Pas d'infos complémentaires",
    degreeRequired: 'Diplôme',
    Details: "Détails",
    NoAvailable: "Aucun emploi disponible",
    Available: "emplois disponibles",
    notFound: "Aucun emploi trouver",
    Rejected: "Votre candidature a été refusée",
    Accepted: "Félicitations, vous avez été accepté pour cette offre",
    JobRefused: "Cette offre a été refusée",
    JobClosed: "L'offre a été fermée ou refusée, vous ne pouvez plus postuler"
  },

  Resume: {
    preview: "Prévisualisation du CV",
    professional_experience: "Expériences professionnelles",
    no_experience: "Aucune expérience ajoutée.",
    education: "Parcours scolaire",
    no_education: "Aucun parcours scolaire ajouté.",
    skills: "Compétences",
    no_skills: "Aucune compétence ajoutée.",
    hobbies: "Loisirs",
    no_hobbies: "Aucun loisir ajouté.",
    location: "Localisation",
    no_location: "Aucune localisation ajoutée.",
    add_experience: "Veuillez ajouter au moins une expérience professionnelle.",
    add_education: "Veuillez ajouter au moins un parcours scolaire.",
    add_skill: "Veuillez ajouter au moins une compétence.",
    add_location: "Veuillez renseigner votre localisation.",
    modifyresume: "Modifier le CV",
    resumeInput: "Saisie du CV",
    city: "Ville", 
    country: "Pays", 
    add_city: "Veuillez renseigner la ville !", 
    add_country: "Veuillez renseigner le pays !" 
  },

  // Formulaire et expériences professionnelles
  'Experienceform': {
    professional_experience: "Expériences professionnelles",
    title: "Titre",
    position : "Poste",
    company: "Société",
    sector: "Secteur d'activité",
    location: "Lieu",
    date: "Date",
    startDate: "Date de début",
    endDate: "Date de fin",
    no_experience: "Aucune expérience",
    requiredPosition: "Le titre du poste est requis !",
    requiredCompany: "Le nom de la société est requis !",
    requiredActivitySector: "Le secteur d'activité est requis !",
    requiredLocation: "La localisation est requise !",
    requiredDate: "La date est requise !",
    description: "Description", 
    no_description: "La description est requise" 
  },

  'educationForm': {
    school: "Scolarité",
    degreeLevel: "Niveau de diplôme",
    programName: "Nom du programme",
    institution: "Nom de l'institution",
    requiredDegreeLevel: "Le niveau de diplôme est requis !",
    requiredProgramName: "Le nom du programme est requis !",
    requiredInstitution: "Le nom de l'institution est requis !",
    documentUrl: "URL du document de diplôme", 
    requiredDocumentUrl: "L'URL du document est requise !",
    Date: "Date",
    startDate: "Date de début", 
    endDate: "Date de fin", 
    requiredDate: "La date est requise !", 
    no_document: "Aucun document fourni", 
    no_start_date: "Non spécifiée", 
    no_end_date: "Non spécifiée" 
  },

  'skillsForm': {
    skill: "Compétences",
    addSkill: "Ajouter une compétence",
    noSkill: "Aucune compétence n'a été saisie",
    level: "Niveau", 
    category: "Catégorie", 
    noLevel: "Le niveau est requis !", 
    noCategory: "La catégorie est requise !" 
  },

  'hobbies': {
    hobbies: "Loisirs",
    addHobby: "Ajouter un loisir",
    noHobby: "Aucun loisir n'a été saisi",
    description: "Description", 
    no_description: "Aucune description",
    emptyField : "Ajout impossible, champ vide",
    recommandation : "Nous vous recommandons d'ajouter au moins un loisir pour enrichir votre CV."
  },

  confirmationPage: {
    "successMessage": "Félicitations ! Votre CV a bien été envoyé à AriMayi.",
    "viewOtherOffers": "Voir d'autres offres",
    "returnHome": "Retour à l'accueil"
  }
} as const;