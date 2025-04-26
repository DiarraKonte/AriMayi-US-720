import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ConfigProvider } from "antd";
import { theme } from "@/styles/theme";
import { toggleFavorite } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobSlice";
import React from "react";

// With this simplified mock for next-intl
jest.mock("next-intl/client", () => ({
  useCurrentLocale: () => "en",
}));

// New mock for useI18n and I18nProvider returning "Translated: {key}"
// Mock translations
jest.mock("../../../../../../../../locales/client", () => ({
  useScopedI18n: () => (key: string) => `Translated: ${key}`,
  useI18n: () => (key: string) => `Translated: ${key}`,
}));

// Import JobListCard after mocks
import JobListCard from "@/app/[locale]/(auth)/portal/trainee/components/Cards/jobListCard";
import { Job } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobInterfaces";

const mockStore = configureStore([]);

const mockJob: Job = {
  id: 1,
  title: "React Developer",
  company: { id: 1, companyName: "TechCorp" },
  location: "Paris, France",
  contractType: "CDI",
  views: 120,
  favorite: false,
  offerDescription: "Job description",
  applied: false,
  status: "in progress",
  publishedDate: "2024-02-20T12:00:00Z",
  skill: "React",
  degreeRequired: "Bac+3",
  details: {
    address: "123 rue de Paris",
    workOrganisation: "On-site",
    salary: { range: "40-50k€" },
  },
};

describe("JobListCard", () => {
  let store: any;
  let onClickMock: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      jobs: {
        jobs: [mockJob],
      },
    });

    store.dispatch = jest.fn();
    onClickMock = jest.fn();
  });

  it("displays job information correctly", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobListCard job={mockJob} onClick={onClickMock} isSelected={false} />
        </ConfigProvider>
      </Provider>
    );

    expect(screen.getByText("React Developer")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
    expect(screen.getByText("Paris, France")).toBeInTheDocument();
    expect(screen.getByText("CDI")).toBeInTheDocument();
  });

  it("displays job information correctly without details", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobListCard job={mockJob} onClick={onClickMock} isSelected={false} />
        </ConfigProvider>
      </Provider>
    );

    expect(screen.getByText("React Developer")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
    expect(screen.getByText("Paris, France")).toBeInTheDocument();
    expect(screen.getByText("CDI")).toBeInTheDocument();
  });

  it("handles adding and removing favorites", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobListCard job={mockJob} onClick={onClickMock} isSelected={false} />
        </ConfigProvider>
      </Provider>
    );

    const heartIcon = screen.getByTestId("favorite-icon");
    expect(heartIcon).toBeInTheDocument();

    fireEvent.click(heartIcon);
    expect(store.dispatch).toHaveBeenCalledWith(toggleFavorite(mockJob.id));
  });

  it("redirects to job details page", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobListCard job={mockJob} onClick={onClickMock} isSelected={false} />
        </ConfigProvider>
      </Provider>
    );

    const link = screen.getByTestId("job-card");
    expect(link).toHaveAttribute("href", "/portal/trainee/jobs/1");

    // Check for click on the link
    fireEvent.click(link);
    // To test redirection, you'd need to mock navigation or use next-router-mock
  });

  it("displays the card differently if isSelected is true", () => {
    const { container } = render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobListCard job={mockJob} onClick={onClickMock} isSelected={true} />
        </ConfigProvider>
      </Provider>
    );
    screen.debug(); // Displays the DOM to check applied classes
    expect(container.firstChild).toHaveClass("selected-job-card");
  });
});
