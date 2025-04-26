import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "@/lib/features/project/projectsSlice";
import { theme } from "antd";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import ProjectsDetail from "@/app/components/projectsDetail";


jest.mock("next/navigation", () => ({
  useParams: jest.fn().mockReturnValue({ id: "1" }),
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  theme: {
    useToken: jest.fn().mockReturnValue({
      token: {
        colorWhite: "#ffffff",
      },
    }),
  },
}));

describe("ProjectsDetail", () => {
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
  const setupStore = (initialState = {}) =>
    configureStore({
      reducer: {
        projects: projectsReducer,
      },
      preloadedState: initialState,
    });

  it("renders the project title and details", () => {
    const mockStore = setupStore({
      projects: {
        projectDetails: {
          name: "Projet Test",
          description: "Description de test",
          requiredSkills: "React, Redux",
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <ProjectsDetail />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );

    expect(
      screen.getByText("Intitulé du projet", { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText("Projet Test")).toBeInTheDocument();
    expect(screen.getByText("Description de test")).toBeInTheDocument();
    expect(screen.getByText("React, Redux")).toBeInTheDocument();
  });

  it("renders fallback texts when project details are missing", () => {
    const mockStore = setupStore({
      projects: {
        projectDetails: null,
      },
    });

    render(
      <Provider store={mockStore}>
        <ProjectsDetail />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );

    expect(screen.getByText("Intitulé du poste")).toBeInTheDocument();
    expect(screen.getByText("Description non disponible")).toBeInTheDocument();
    expect(
      screen.getByText("Technical environnement missing")
    ).toBeInTheDocument();
  });

  it("renders buttons and links correctly", () => {
    const mockStore = setupStore({
      projects: {
        projectDetails: {},
      },
    });

    render(
      <Provider store={mockStore}>
        <ProjectsDetail />
      </Provider>,
      { wrapper: MemoryRouterProvider }
    );

    expect(
      screen.getByRole("button", { name: /Voir les candidatures/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Qualifier le projet/i })
    ).toBeInTheDocument();

    const qualifyProjectLink = screen.getByRole("link", {
      name: /Qualifier le projet/i,
    });
    expect(qualifyProjectLink).toHaveAttribute(
      "href",
      "/portal/admin/project/projects-qualify"
    );
  });
});
