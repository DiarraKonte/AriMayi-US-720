import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectsQualify from "@/app/components/projectsQualify";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";


jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("ProjectsQualify Component", () => {
      beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });
      });
  it("renders the form and buttons correctly", () => {
    render(<ProjectsQualify />);

    expect(screen.getByText("Qualifier le projet")).toBeInTheDocument();
    expect(screen.getByText("Informations")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Nom de l'entreprise")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Adresse")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Date de prise de poste")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description de l'offre d'emploi")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Environnement technique")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Informations complémentaires")).toBeInTheDocument();

    expect(screen.getByText("Valider le projet")).toBeInTheDocument();
    expect(screen.getByText("Enregistrer le brouillon")).toBeInTheDocument();
  });

  it("opens the modal when 'Valider le projet' is clicked", () => {
    render(<ProjectsQualify />);

    const validateButton = screen.getByText("Valider le projet");

    act(() => {
      fireEvent.click(validateButton);
    });

    expect(screen.getByText("Le projet est qualifié!")).toBeInTheDocument();
    expect(screen.getByText("Revenir à la liste des projets")).toBeInTheDocument();
  });

  it("closes the modal when clicking outside or on 'Revenir à la liste des projets'", async () => {
    render(<ProjectsQualify />);
  
    const validateButton = screen.getByText("Valider le projet");
  
    act(() => {
      fireEvent.click(validateButton);
    });
  
    expect(screen.getByText("Le projet est qualifié!")).toBeInTheDocument();
  
    const backToListButton = screen.getByText("Revenir à la liste des projets");
  
    act(() => {
      fireEvent.click(backToListButton);
    });
  });

  it("logs action when 'Enregistrer le brouillon' is clicked", () => {

    render(<ProjectsQualify />);

    const saveDraftButton = screen.getByText("Enregistrer le brouillon");

    act(() => {
      fireEvent.click(saveDraftButton);
    });
  });
});
