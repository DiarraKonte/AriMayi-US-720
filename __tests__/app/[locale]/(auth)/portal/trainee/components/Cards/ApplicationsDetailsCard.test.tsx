import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DetailsJobCard from "@/app/[locale]/(auth)/portal/trainee/components/Cards/detailsJobCard";
import { Job } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobInterfaces";
import { theme } from "@/styles/theme";
import { ConfigProvider } from "antd";
import React from 'react';

// Mock translations
jest.mock("../../../../../../../../locales/client", () => ({
  useI18n: () => (key: string) => {
    if (key === "projectsQualify.placeholders.jobDescription") return "Job Description";
    if (key === "projectsQualify.placeholders.technicalEnvironment") return "Technical Environment";
    if (key === "JobDetails.Address") return "Detailed Address";
    if (key === "TraineeJob.Details") return "Job Details";
    if (key === "projectsDetails.jobTitle") return "Job Title";
    if (key === "TraineeJob.degreeRequired") return "Required Degree";
    if (key === "projectsDetails.contractType") return "Contract Type";
    if (key === "projectsDetails.workOrganisation") return "Work Organisation";
    if (key === "JobDetails.salary") return "Salary";
    if (key === "projectsDetails.additionalInfo") return "Additional Info";
    if (key === "JobDetails.workHours") return "Work Hours";

    return key;
  },
}));

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const mockStore = configureStore([]);

const mockJob: Job = {
  id: 1,
  title: "Full Stack Developer",
  company: { id: 1, companyName: "Tech Corp" },
  location: "Paris, France",
  contractType: "CDI",
  views: 150,
  favorite: false,
  status: "pending",
  publishedDate: "2024-01-01T00:00:00Z",
  offerDescription: "Detailed job description",
  applied: false,
  skill: "React, Node.js",
  degreeRequired: "Bac+5",
  details: {
    address: "123 Rue de Paris",
    workOrganisation: "Hybrid",
    salary: { range: "50-60k€" },
    complementaryInfo: {
      workHours: "35h/week"
    }
  }
};

describe("DetailsJobCard", () => {
  const store = mockStore({
    jobs: {
      jobs: [mockJob],
      jobDetails: mockJob,
    }
  });

  beforeEach(() => {
    store.clearActions();
  });

  it("correctly displays job details", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    console.log(screen.debug());  // This will print out the DOM tree at this point

    // Check main elements
    expect(screen.getByTestId('job-title')).toHaveTextContent('Full Stack Developer');
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("Paris, France")).toBeInTheDocument();
    expect(screen.getByText("CDI")).toBeInTheDocument();
  });

  it("displays the technical skills section", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    expect(screen.getByText("Technical Environment")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("displays additional details", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    screen.debug();  // Inspect the rendered DOM

    expect(screen.getByText(/Required Degree/)).toBeInTheDocument();
    expect(screen.getByText(/Bac\+5/)).toBeInTheDocument();
    expect(screen.getByText(/Salary/)).toBeInTheDocument();
    expect(screen.getByText(/50-60k€/)).toBeInTheDocument();
    expect(screen.getByText(/Work Hours/)).toBeInTheDocument();
    expect(screen.getByText(/35h\/week/)).toBeInTheDocument();
  });

  it("handles the favorite toggle", () => {
    render(
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <DetailsJobCard job={mockJob} />
        </ConfigProvider>
      </Provider>
    );

    const heartButton = screen.getByRole("img", { name: /heart/i });
    fireEvent.click(heartButton);
    
    const actions = store.getActions();
    expect(actions[0].type).toBe("jobs/toggleFavorite");
    expect(actions[0].payload).toBe(1);
  });
});
