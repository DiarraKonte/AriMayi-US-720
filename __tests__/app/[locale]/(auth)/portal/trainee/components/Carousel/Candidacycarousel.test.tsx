import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import CandidacyCarousel from "@/app/[locale]/(auth)/portal/trainee/components/Carousels/Candidacycarousel";
import { createMockStore } from "../../../../../../../../__mocks__/createMockStore";
import { mockJobs } from "../../../../../../../../__mocks__/mockData";
import { waitFor } from "@testing-library/react";


// Mock des traductions
jest.mock("../../../../../../../../locales/client", () => ({
  useScopedI18n: () => (key: string) => `Translated: ${key}`,
  useI18n: () => (key: string) => `Translated: ${key}`,
}));

// Mock des JobCandidacyCards
jest.mock(
  "../../../../../../../../src/app/[locale]/(auth)/portal/trainee/components/Cards/JobCandidacyCards",
  () => ({
    __esModule: true,
    default: ({ job }: { job: any }) => (
      <div data-testid={`job-candidacy-card-${job.id}`}>{job.title}</div>
    ),
  })
);

describe("CandidacyCarousel", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      partnerJob: {
        jobs: mockJobs,
        previewJob: mockJobs[0],
        loading: { fetch: false, submit: false, update: false, delete: false },
        error: { fetch: false, submit: false, update: false, delete: false },
      },
    });

    // Simuler une taille d'écran pour 3 éléments visibles (largeur > 1024px)
    global.innerWidth = 1200;
    global.dispatchEvent(new Event("resize"));
  });

  it("affiche le carousel avec le bon nombre d'éléments visibles", () => {
    render(
      <Provider store={store}>
        <ConfigProvider>
          <CandidacyCarousel items={mockJobs} />
        </ConfigProvider>
      </Provider>
    );

    const cards = screen.getAllByTestId(/job-candidacy-card-/);
    expect(cards.length).toBe(mockJobs.length);
  });

  it("Displays the 'Next 'button when the carousel is not at the last index ", () => {
    render(
      <Provider store={store}>
        <ConfigProvider>
          <CandidacyCarousel items={mockJobs} />
        </ConfigProvider>
      </Provider>
    );

    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeInTheDocument();
  });

  it("Hide the 'previous' button when the carousel is at the first index", () => {
    render(
      <Provider store={store}>
        <ConfigProvider>
          <CandidacyCarousel items={mockJobs} />
        </ConfigProvider>
      </Provider>
    );

    const prevButton = screen.queryByTestId("prev-button");
    expect(prevButton).toBeNull();
  });

  it("Advance the carousel when click on the' next 'button", () => {
    render(
      <Provider store={store}>
        <ConfigProvider>
          <CandidacyCarousel items={mockJobs} />
        </ConfigProvider>
      </Provider>
    );

    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    const carouselInner = screen.getByTestId("carousel-inner-container");
    expect(carouselInner).toHaveStyle("transform: translateX(-335px)");
  });


  it("Manages navigation via pagination points", async () => {
    render(<CandidacyCarousel  items={mockJobs}/>);
  
    // Récupérer tous les boutons de pagination en fonction de leur rôle (button) ou de leur label
    const dots = screen.getAllByRole("button", { name: /Page/ });
  
    // Vérifier que les dots sont présents
    expect(dots).toHaveLength(4); // Ou ajustez ce nombre en fonction de vos boutons de pagination
  
    // Cliquez sur le deuxième point de pagination
    fireEvent.click(dots[1]);
  
    // Attendre que le carousel change de position
    await waitFor(() => screen.getByTestId("carousel-inner"));
  
    const carouselInner = screen.getByTestId("carousel-inner");
    expect(carouselInner).toHaveStyle("transform: translateX(-670px)");
  });
  
  
});