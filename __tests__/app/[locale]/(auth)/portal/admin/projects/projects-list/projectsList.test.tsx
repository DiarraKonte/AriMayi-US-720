import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import ProjectsList from "@/app/components/projectsList";
import { setupServer } from "msw/node";
import { rest } from "msw";
import "@testing-library/jest-dom";
import { getProjects } from "@/lib/features/project/projectsThunks";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const server = setupServer(
  rest.get("/api/projects", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          titled: "Projet Alpha",
          partner: "Partenaire A",
          date: "2023-01-01",
          trainee: 5,
          tags: ["En cours"],
        },
        {
          id: 2,
          titled: "Projet Beta",
          partner: "Partenaire B",
          date: "2023-02-01",
          trainee: 10,
          tags: ["Validé"],
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ProjectsList Component", () => {
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
  it("renders initial state with loading spinner", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <ProjectsList />
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Projet Alpha")).toBeInTheDocument();
      expect(screen.getByText("Projet Beta")).toBeInTheDocument();
    });
  });

  it("displays projects data correctly", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <ProjectsList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Projet Alpha")).toBeInTheDocument();
      expect(screen.getByText("Partenaire A")).toBeInTheDocument();
      expect(screen.getByText("2023-01-01")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("En cours")).toBeInTheDocument();
    });
  });

  it("navigates to project details when a row is clicked", async () => {
    const mockPush = jest.fn();
    jest.mock("next/navigation", () => ({
      useRouter: jest.fn(() => ({
        push: mockPush,
      })),
    }));

    const store = makeStore();
    render(
      <Provider store={store}>
        <ProjectsList />
      </Provider>
    );

    await waitFor(() => {
      const row = screen.getByText("Projet Alpha");
      fireEvent.click(row);
    });

    expect(mockPush).toHaveBeenCalledWith("/portal/admin/project/1");
  });

  it("displays an error message when the API call fails", async () => {
    server.use(
      rest.get("/api/projects", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
      })
    );

    const store = makeStore();
    render(
      <Provider store={store}>
        <ProjectsList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Aucun projet à afficher.")).toBeInTheDocument();
    });
  });

  it("handles search functionality", async () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <ProjectsList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Projet Alpha")).toBeInTheDocument();
      expect(screen.getByText("Projet Beta")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Rechercher");
    fireEvent.change(searchInput, { target: { value: "Alpha" } });

    await waitFor(() => {
      expect(screen.getByText("Projet Alpha")).toBeInTheDocument();
      expect(screen.queryByText("Projet Beta")).not.toBeInTheDocument();
    });
  });

  it("logs export button click", async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <ProjectsList />
      </Provider>
    );

    const exportButton = screen.getByText("Télécharger excel/csv");
    fireEvent.click(exportButton);
  });
});
