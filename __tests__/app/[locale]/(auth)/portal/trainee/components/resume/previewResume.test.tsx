beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Déprécié, mais utilisé par certains vieux codes
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});


import React from "react";
import { renderWithProviders } from "../../../../../../../../__mocks__/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import PreviewResume from "@/app/[locale]/(auth)/portal/trainee/components/resume/previewResume";
import { useSelector, useDispatch } from "react-redux";
import { mockRootState} from "../../../../../../../../__mocks__/mockData";

jest.mock('@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobSlice', () => ({
  applyToJob: jest.fn(),
  default: (state = { jobs: [] }, action: any) => state,
}));

jest.mock("../../../../../../../../locales/client", () => ({
  useScopedI18n: () => (key: string) => `Translated: ${key}`,
  useI18n: () => (key: string) => `Translated: ${key}`,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("antd", () => {
  const React = require("react");
  const ButtonMock = ({ children, style, type, "aria-label": ariaLabel }) => (
    <button style={style} data-type={type} aria-label={ariaLabel}>{children}</button>
  );
  const CardMock = ({ children, style }) => <div style={style}>{children}</div>;
  const AlertMock = ({ message, type, showIcon }) => (
    <div data-testid="alert" data-type={type} data-show-icon={showIcon}>{message}</div>
  );
  return { ...jest.requireActual("antd"), Button: ButtonMock, Card: CardMock, Alert: AlertMock };
});

jest.mock("../../../../../../../../src/app/[locale]/(auth)/portal/trainee/components/Modals/applymodal", () => {
  const React = require("react");
  const ApplyModalMock = ({ onValidate, disabled }) => (
    <button data-testid="apply-modal-button" onClick={onValidate} disabled={disabled}>Apply</button>
  );
  return ApplyModalMock;
});

jest.mock("date-fns", () => ({
  format: jest.fn((date) => `${date.getMonth() + 1}/${date.getFullYear()}`),
}));

describe("PreviewResume", () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
  const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockImplementation((selector) => selector(mockRootState));
  });

  it("displays professional experiences", () => {
    renderWithProviders(<PreviewResume />);
    expect(screen.getByText("Translated: Resume.professional_experience")).toBeInTheDocument();
  });

  it("displays education information", () => {
    renderWithProviders(<PreviewResume />);
    expect(screen.getByText("Translated: Resume.education")).toBeInTheDocument();
  });

  it("displays skills", () => {
    renderWithProviders(<PreviewResume />);
    expect(screen.getByText("Translated: Resume.skills")).toBeInTheDocument();
  });

  it("displays hobbies", () => {
    renderWithProviders(<PreviewResume />);
    expect(screen.getByText("Translated: Resume.hobbies")).toBeInTheDocument();
  });

  it("displays location", () => {
    renderWithProviders(<PreviewResume />);
    expect(screen.getByText("Translated: Resume.location")).toBeInTheDocument();
  });


  it("disables ApplyModal when the form is invalid", () => {
    mockUseSelector.mockImplementation((selector) => selector({ ...mockRootState, resume: { experiences: [], education: [], skills: [], hobbies: [], location: "" } }));
    renderWithProviders(<PreviewResume />);
    expect(screen.getByTestId("apply-modal-button")).toBeDisabled();
  });

  it("enables ApplyModal and dispatches applyToJob when the form is valid", () => {
    renderWithProviders(<PreviewResume />);
    const applyButton = screen.getByTestId("apply-modal-button");
    fireEvent.click(applyButton);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
