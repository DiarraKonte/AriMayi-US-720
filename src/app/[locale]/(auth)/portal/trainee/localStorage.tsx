export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde dans localStorage :", error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const dataString = localStorage.getItem(key);
    if (dataString) {
      const data = JSON.parse(dataString);
      console.log("Données chargées depuis localStorage :", data); // Log pour déboguer
      return data;
    }
    return null;
  } catch (error) {
    console.error("Erreur lors du chargement depuis localStorage :", error);
    return null;
  }
};

export const loadFavoritesFromStorage = (): number[] => {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favoriteJobs");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  return [];
};

export const saveFavoritesToStorage = (favoriteIds: number[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favoriteJobs", JSON.stringify(favoriteIds));
  }
};
