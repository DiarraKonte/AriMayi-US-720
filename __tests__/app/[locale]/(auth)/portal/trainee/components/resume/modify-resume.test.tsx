// Mocking window.matchMedia before imports
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

import { renderWithProviders } from "../../../../../../../../__mocks__/test-utils"; // Adjust path
import { screen, fireEvent, waitFor } from "@testing-library/react";
import TraineeModifyResume from "@/app/[locale]/(auth)/portal/trainee/components/resume/modify-resume"; // Adjust path
import { ButtonProps, CardProps, FormProps } from "antd";
import { addExperience, updateExperience, deleteExperience } from "@/app/[locale]/(auth)/portal/trainee/Slice/resume/resumeSlice"; // Adjust path
import { mockRootState, mockExperiences } from "../../../../../../../../__mocks__/mockData"; // Adjust path
import React from "react";
import moment from "moment";

// Mock dependencies
jest.mock("../../../../../../../../locales/client", () => ({
  useI18n: () => (key: string) => `Translated: ${key}`,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("antd", () => {
  const actualAntd = jest.requireActual("antd");
  return {
    ...actualAntd,
    Button: ({ children, style, onClick, htmlType }: ButtonProps & { children: React.ReactNode }) => (
      <button
        style={style}
        onClick={onClick}
        type={htmlType || "button"}
        data-testid={children?.toString().includes("PlusOutlined") ? "add-button" : "other-button"}
      >
        {children}
      </button>
    ),
    Card: ({ children, style }: CardProps & { children: React.ReactNode }) => (
      <div style={style}>{children}</div>
    ),
    Form: Object.assign(
      ({ children, form, onFinish, name }: FormProps & { children: React.ReactNode; form?: any }) => (
        <form
          data-testid={`form-${name}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (onFinish) onFinish(form.getFieldsValue());
          }}
        >
          {children}
        </form>
      ),
      {
        Item: ({ children, name, rules }: { children: React.ReactNode; name: string; rules?: any[] }) => (
          <div data-testid={`form-item-${name}`}>{children}</div>
        ),
        useForm: () => [
          {
            getFieldsValue: jest.fn(() => ({
              title: "New Developer",
              company: "New Co",
              sector: "Tech",
              location: "Lyon",
              dates: [moment("2023-01-01"), moment("2023-12-31")],
            })),
            setFieldsValue: jest.fn(),
            resetFields: jest.fn(),
          },
        ],
      }
    ),
    DatePicker: {
      RangePicker: ({ onChange, format }) => (
        <input
          data-testid="range-picker"
          onChange={(e) => onChange([moment(e.target.value.split("-")[0]), moment(e.target.value.split("-")[1])])}
        />
      ),
    },
    Input: ({ placeholder, onChange }) => <input placeholder={placeholder} onChange={onChange} />,
  };
});

jest.mock("date-fns", () => ({
  format: jest.fn((date) => `${date.getMonth() + 1}/${date.getFullYear()}`),
}));

jest.mock("moment", () => {
  const moment = jest.fn((date) => ({
    format: () => date || "2023-01-01",
  }));
  return moment;
});

describe("TraineeModifyResume", () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = require("react-redux").useSelector;
  const mockUseDispatch = require("react-redux").useDispatch;
  const mockUseParams = require("next/navigation").useParams;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockImplementation((selector) => selector(mockRootState));
    mockUseParams.mockReturnValue({ id: "123" });
  });

  it("displays existing professional experiences", () => {
    renderWithProviders(<TraineeModifyResume />);
    const experienceCard = screen.getByText(mockExperiences[0].title).closest("div");
    expect(screen.getByText(mockExperiences[0].title)).toBeInTheDocument();
    expect(experienceCard).toHaveTextContent(mockExperiences[0].company);
    expect(experienceCard).toHaveTextContent(mockExperiences[0].sector);
    expect(experienceCard).toHaveTextContent(mockExperiences[0].place);
    expect(experienceCard).toHaveTextContent("1/2022 - 1/2023");
  });

  it("adds a new experience via the form", async () => {
    renderWithProviders(<TraineeModifyResume />);
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        addExperience({
          id: expect.any(String),
          title: "New Developer",
          company: "New Co",
          sector: "Tech",
          place: "Lyon",
          startDate: "2023-01-01",
          endDate: "2023-12-31",
        })
      );
    });
  });

  it("modifies an existing experience", async () => {
    renderWithProviders(<TraineeModifyResume />);
    const editButton = screen.getAllByTestId("edit-button")[0];
    fireEvent.click(editButton);

    const addButton = screen.getByTestId("add-button"); // The "Add" button becomes "Update" in edit mode
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        updateExperience({
          id: mockExperiences[0].id,
          data: {
            id: mockExperiences[0].id,
            title: "New Developer",
            company: "New Co",
            sector: "Tech",
            place: "Lyon",
            startDate: "2023-01-01",
            endDate: "2023-12-31",
          },
        })
      );
    });
  });

  it("deletes an existing experience", () => {
    renderWithProviders(<TraineeModifyResume />);
    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith(deleteExperience(mockExperiences[0].id));
  });

  it("displays the experience addition form", () => {
    renderWithProviders(<TraineeModifyResume />);
    expect(screen.getByPlaceholderText("Translated: Resume.professional_experience")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Translated: Resume.form.company")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Translated: Resume.form.sector")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Translated: Resume.location")).toBeInTheDocument();
    expect(screen.getByTestId("range-picker")).toBeInTheDocument();
  });

  it("displays the preview link with the correct ID", () => {
    renderWithProviders(<TraineeModifyResume />);
    const previewButton = screen.getByText("Translated: Resume.preview");
    expect(previewButton).toBeInTheDocument();
    expect(previewButton.closest("a")).toHaveAttribute("href", "/portal/trainee/jobs/123/resume/import");
  });
});
