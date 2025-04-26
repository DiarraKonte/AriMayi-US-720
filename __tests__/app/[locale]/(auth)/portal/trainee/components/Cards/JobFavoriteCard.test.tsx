
  

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import JobFavoriteCard from "@/app/[locale]/(auth)/portal/trainee/components/Cards/JobFavoriteCard";
import { theme } from "@/styles/theme";
import { ConfigProvider } from "antd";
import React from "react";
import { mockJobs } from "../../../../../../../../__mocks__/mockData";
import { createMockStore } from "../../../../../../../../__mocks__/createMockStore";
import { Store, AnyAction } from "@reduxjs/toolkit";

// Mock jobSlice
jest.mock("@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobSlice", () => ({
  toggleFavorite: jest.fn((id) => ({ type: "jobs/toggleFavorite", payload: id })),
}));

// Mock hooks and components
jest.mock("next-intl/client", () => ({
  useCurrentLocale: () => "fr",
}));

jest.mock("../../../../../../../../locales/client", () => ({
  useScopedI18n: () => (key: string) => `Translated: ${key}`,
  useI18n: () => (key: string) => `Translated: ${key}`,
}));

jest.mock("next/link", () => ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href}>{children}</a>
));

interface MockStoreState {
  jobs: {
    jobs?: typeof mockJobs;
    jobDetails: typeof mockJobs[0] | null;
    loading: boolean;
    error: string | null;
  };
}

describe("JobFavoriteCard", () => {
  const onClickMock = jest.fn();
  const onToggleFavoriteMock = jest.fn();
  let store: Store<MockStoreState, AnyAction>;

  beforeEach(() => {
    store = createMockStore({
      jobs: {
        jobs: mockJobs,
        jobDetails: null,
        loading: false,
        error: null,
      },
    });
    store.dispatch = jest.fn();
    onClickMock.mockClear();
    onToggleFavoriteMock.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche correctement les informations du job", () => {
    const job = mockJobs[0];
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobFavoriteCard
            job={job}
            onClick={onClickMock}
            isSelected={false}
            onToggleFavorite={onToggleFavoriteMock}
          />
        </ConfigProvider>
      </Provider>
    );

    expect(screen.getByText(job.title)).toBeInTheDocument();
    expect(screen.getByText(job.company.companyName)).toBeInTheDocument();
    expect(screen.getByText(job.location)).toBeInTheDocument();
    expect(screen.getByText(job.contractType)).toBeInTheDocument();
  });

  it("manages the click on the favorite", () => {
    const job = mockJobs[0];
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobFavoriteCard
            job={job}
            onClick={onClickMock}
            isSelected={false}
            onToggleFavorite={onToggleFavoriteMock}
          />
        </ConfigProvider>
      </Provider>
    );

    const heartIcon = screen.getByTestId("favorite-icon");
    fireEvent.click(heartIcon);
  });

  it("redirect to the details of the job", () => {
    const job = mockJobs[0];
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobFavoriteCard 
            job={job} 
            onClick={onClickMock} 
            isSelected={false} 
            onToggleFavorite={onToggleFavoriteMock} 
          />
        </ConfigProvider>
      </Provider>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/portal/trainee/jobs/${job.id}`);

    fireEvent.click(link);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("Display the selection border", () => {
    const job = mockJobs[0];
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <JobFavoriteCard 
            job={job} 
            onClick={onClickMock} 
            isSelected={true} 
            onToggleFavorite={onToggleFavoriteMock} 
          />
        </ConfigProvider>
      </Provider>
    );

    const card = screen.getByTestId("job-favorite-card");
    expect(card).toHaveStyle("border: 2px solid #6EC3F5");
  });

});