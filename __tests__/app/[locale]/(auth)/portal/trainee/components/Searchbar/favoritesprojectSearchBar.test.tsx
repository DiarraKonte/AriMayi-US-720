
//Test similaire pour les autres composants dans le même dossier components/Searchbar de src 
import { renderWithProviders } from "../../../../../../../../__mocks__/test-utils"; // Ajustez le chemin
import { screen } from "@testing-library/react";
import FavoritesProjectSearchBar from "@/app/[locale]/(auth)/portal/trainee/components/Searchbar/favoritesprojectSearchBar"; // Ajustez le chemin
import { ButtonProps, InputProps } from "antd";
import React from "react";

jest.mock("../../../../../../../../locales/client", () => ({
  useScopedI18n: () => (key: string) => `Translated: ${key}`,
  useI18n: () => (key: string) => `Translated: ${key}`,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Grid: {
    useBreakpoint: jest.fn(),
  },
  Button: ({ children, style, "aria-label": ariaLabel }: ButtonProps & { children: React.ReactNode }) => (
    <button style={style} aria-label={ariaLabel}>
      {children}
    </button>
  ),
  Input: ({ placeholder, style, "aria-label": ariaLabel }: InputProps) => (
    <input placeholder={placeholder} style={style} aria-label={ariaLabel} />
  ), // Supprimez prefix car ce n'est pas une prop d'<input> natif
}));
describe("FavoritesProjectSearchBar", () => {
  const mockUseBreakpoint = require("antd").Grid.useBreakpoint;
  const mockUseSelector = require("react-redux").useSelector;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBreakpoint.mockReturnValue({ xs: false, md: true }); // Breakpoint par défaut
    mockUseSelector.mockReturnValue(5); // 5 jobs favoris par défaut
  });

  it("affiche le bouton de filtres avec le texte traduit", () => {
    renderWithProviders(<FavoritesProjectSearchBar />);
    const filterButton = screen.getByText("Translated: projectsList.filtersButton");
    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveStyle({ backgroundColor: "#f5785a" });
  });

  it("affiche le champ de recherche avec le placeholder traduit", () => {
    renderWithProviders(<FavoritesProjectSearchBar />);
    screen.debug(); // Affiche le DOM rendu
    const searchInput = screen.getByPlaceholderText("Rechercher...");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveStyle({ height: "2.5rem" });
  });

  it("affiche le champ de recherche avec le placeholder traduit quand placeholder est undefined", () => {
    renderWithProviders(<FavoritesProjectSearchBar placeholder={null} />);
    const searchInput = screen.getByPlaceholderText("Translated: projectsList.searchPlaceholder");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveStyle({ height: "2.5rem" });
  });

  it("affiche le nombre de jobs favoris", () => {
    renderWithProviders(<FavoritesProjectSearchBar />);
    const jobsCount = screen.getByText("5 Translated: SearchBar.Favorites");
    expect(jobsCount).toBeInTheDocument();
  });

  it("affiche un message vide si aucun job favori", () => {
    mockUseSelector.mockReturnValue(0);
    renderWithProviders(<FavoritesProjectSearchBar />);
    const emptyMessage = screen.getByText("Translated: SearchBar.EmptyFavorites");
    expect(emptyMessage).toBeInTheDocument();
  });
});

