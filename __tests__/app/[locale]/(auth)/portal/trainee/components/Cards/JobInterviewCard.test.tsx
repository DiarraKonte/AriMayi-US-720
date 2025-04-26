import { render, screen, fireEvent } from "@testing-library/react";
import InterviewCard from "@/app/[locale]/(auth)/portal/trainee/components/Cards/JobInterviewCard";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Job } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobInterfaces";
import { theme } from "@/styles/theme";
import { ConfigProvider } from "antd";
import { toggleFavorite } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobSlice";
import React from "react";

// Simuler le hook de locale de next-intl
jest.mock("next-intl/client", () => ({
  useCurrentLocale: () => "fr",
}));

// On simule le hook de traduction avec le nouveau mock
jest.mock("../../../../../../../../locales/client", () => ({
  useScopedI18n: () => (key: string) => `Translated: ${key}`,
  useI18n: () => (key: string) => `Translated: ${key}`,
}));


const mockStore = configureStore([]);

const mockJob: Job = {
  id: 1,
  title: "Développeur Front-end Senior",
  company: { id: 1, companyName: "Tech Innovators" },
  location: "Lyon, France",
  contractType: "CDI",
  views: 245,
  favorite: false,
  status: "pending",
  publishedDate: "2024-03-01T09:00:00Z",
  offerDescription: "Description détaillée",
  applied: true,
  skill: "React, TypeScript",
  degreeRequired: "Bac+5",
  details: {
    address: "456 rue de Lyon",
    workOrganisation: "Hybride",
    salary: { range: "50-60k€" },
  },
};

describe("InterviewCard", () => {
  const onClickMock = jest.fn();
  let store: any;

  beforeEach(() => {
    store = mockStore({
      jobs: {
        jobs: [mockJob],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche correctement les informations du job", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <InterviewCard job={mockJob} onClick={onClickMock} isSelected={false} />
        </ConfigProvider>
      </Provider>
    );

    expect(screen.getByText("Développeur Front-end Senior")).toBeInTheDocument();
    expect(screen.getByText("Tech Innovators")).toBeInTheDocument();
    expect(screen.getByText("Lyon, France")).toBeInTheDocument();
    expect(screen.getByText("CDI")).toBeInTheDocument();
  });

  it("affiche le tag d'entretien pour le statut pending", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <InterviewCard job={mockJob} onClick={onClickMock} isSelected={false} />
        </ConfigProvider>
      </Provider>
    );

    // La clé "TraineeHome.Interview" est traduite en "Translated: TraineeHome.Interview"
    const tag = screen.getByText("Translated: TraineeHome.Interview");
    console.log("Tag trouvé :", tag.textContent);

    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass("ant-tag-orange");
    expect(tag.textContent).toBe("Translated: TraineeHome.Interview");
  });

  it("manages the click on the favorite", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <InterviewCard job={mockJob} onClick={onClickMock} isSelected={false} />
        </ConfigProvider>
      </Provider>
    );

    const heartIcon = screen.getByTestId("favorite-icon");
    fireEvent.click(heartIcon);
    expect(store.getActions()).toEqual([toggleFavorite(mockJob.id)]);
  });

  it("redirect to the details of the job", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <InterviewCard job={mockJob} onClick={onClickMock} isSelected={false} />
        </ConfigProvider>
      </Provider>
    );

    const link = screen.getByTestId("job-card");
    expect(link).toHaveAttribute("href", "/portal/trainee/jobs/1");

    // Vérifier que le clic sur le lien fonctionne
    fireEvent.click(link);
    // Pour tester la redirection, il faudrait mocker la navigation ou utiliser une bibliothèque comme next-router-mock.
  });

  it("Display the selection border", () => {
    const { container } = render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <InterviewCard job={mockJob} onClick={onClickMock} isSelected={true} />
        </ConfigProvider>
      </Provider>
    );

    expect(container.firstChild).toHaveStyle("border: 2px solid #6EC3F5");
  });
});
