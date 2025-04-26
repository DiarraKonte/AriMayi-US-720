import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Job } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobInterfaces";
import { theme } from "@/styles/theme";
import { ConfigProvider } from "antd";
import React from 'react';
import DetailsJobCard from "@/app/[locale]/(auth)/portal/trainee/components/Cards/detailsJobCard";

// With this simpler mock:
jest.mock("next-intl/client", () => ({
  useCurrentLocale: () => "en",
}));

jest.mock("../../../../../../../../locales/client", () => ({
  useI18n: () => (key: string) => {
    if (key === "JobDetails.company") return "Company: ";
    if (key === "JobDetails.address") return "Address: ";
    if (key === "TraineeJob.AlreadyApplied") return "Already Applied";
    if (key === "TraineeHome.Apply") return "Apply";
    if (key === "JobDetails.date") return "Published Date: ";
    if (key === "JobDetails.salary") return "Salary: ";
    return key;
  },
}));

// Mock for Timer

const mockStore = configureStore([]);
// Define store type
type MockStoreType = ReturnType<typeof mockStore>;

const mockJob: Job = {
  id: 1,
  title: 'Full Stack Developer',
  company: { id: 1, companyName: 'Tech Corp' },
  location: 'Paris, France',
  contractType: 'CDI',
  views: 150,
  favorite: false,
  status: 'pending',
  publishedDate: '2024-01-01T00:00:00Z',
  offerDescription: 'Detailed job description',
  applied: false,
  skill: 'React,Node.js',
  degreeRequired: 'Bac+5',
  details: {
    address: '123 Rue de Paris',
    workOrganisation: 'Hybrid',
    salary: { range: '50-60k€' },
    complementaryInfo: {
      workHours: '35h/week'
    }
  }
};

describe('DetailsJobCard', () => {
  let store: MockStoreType;
  
  beforeEach(() => {
    store = mockStore({
      jobs: {
        jobs: [mockJob],
        jobDetails: mockJob
      }
    });
  });

  it('displays the main job information', () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    screen.debug(); // Add this line to inspect the rendered HTML
    

    // Check job title
    expect(screen.getByTestId('job-title')).toHaveTextContent('Full Stack Developer');

    // Check company
    const companyLabel = screen.getByText('Company:');
    expect(companyLabel.parentElement).toHaveTextContent('Tech Corp');

    // Check detailed address if necessary
    const detailedAddress = screen.getByText('123 Rue de Paris');
    expect(detailedAddress).toBeInTheDocument();

    // Check contract type
    expect(screen.getByText('CDI')).toBeInTheDocument();
  });
  
  it('displays the "Apply" button when not applied', () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    expect(screen.getByText('Apply')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/portal/trainee/jobs/${mockJob.id}`
    );
  });

  it('displays the "Already Applied" status when applied', () => {
    const appliedJob = { ...mockJob, applied: true };
    const appliedStore: MockStoreType = mockStore({
      jobs: {
        jobs: [appliedJob],
        jobDetails: appliedJob
      }
    });
    
    render(
      <Provider store={appliedStore}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={appliedJob} />
        </ConfigProvider>
      </Provider>
    );

    expect(screen.getByText('Already Applied')).toBeInTheDocument();
  });

  it('handles the favorite toggle', () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    const heartIcon = screen.getByTestId("favorite-icon");
    fireEvent.click(heartIcon);
    
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'jobs/toggleFavorite', payload: mockJob.id }]);
  });

  it('displays technical skills', () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    mockJob.skill.split(',').forEach(skill => {
      expect(screen.getByText(skill.trim())).toBeInTheDocument();
    });
  });

  it('displays the Timer component', () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    expect(screen.getByTestId("job-timer")).toBeInTheDocument();
  });
});
