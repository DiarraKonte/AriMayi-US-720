import { renderWithProviders, mockNotification } from "../../../../../../../../__mocks__/test-utils"; // Ajustez le chemin
import { screen, fireEvent, waitFor } from "@testing-library/react";
import ApplyModal from "@/app/[locale]/(auth)/portal/trainee/components/Modals/applymodal";
import { useI18n } from "../../../../../../../../locales/client";
import { useParams, useRouter } from "next/navigation";
import { ButtonProps, ModalProps } from "antd";
import React from "react";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("../../../../../../../../locales/client", () => ({
  useI18n: () => (key: string) => `Translated: ${key}`,
}));

jest.mock("antd", () => {
  const actualAntd = jest.requireActual("antd");
  return {
    ...actualAntd,
    Button: ({
      children,
      onClick,
      disabled,
      loading,
      style,
    }: ButtonProps & { children: React.ReactNode }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        data-loading={loading ? "true" : "false"}
        style={style}
      >
        {children}
      </button>
    ),
    Modal: ({
      open,
      onCancel,
      children,
      styles,
    }: ModalProps & { children: React.ReactNode }) => (
      open ? (
        <div data-testid="modal" style={styles?.body}>
          {children}
          <button data-testid="modal-cancel" onClick={onCancel} style={{ display: "none" }}>
            Close
          </button>
        </div>
      ) : null
    ),
  };
});

describe("ApplyModal", () => {
  const onValidateMock = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockNotification.success.mockClear();
    mockNotification.error.mockClear();
  });

  it("manages confirmation in the modal and calls onvalidate", async () => {
    jest.useFakeTimers();

    renderWithProviders(<ApplyModal onValidate={onValidateMock} disabled={false} />);

    fireEvent.click(screen.getByText("Translated: TraineeHome.Apply"));
    const confirmButton = screen.getByText("Translated: modal.applyButton");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(confirmButton).toHaveAttribute("data-loading", "true");
    });

    jest.advanceTimersByTime(2000);

    expect(onValidateMock).toHaveBeenCalled();
    expect(mockNotification.success).toHaveBeenCalledWith({
      message: "Translated: Notification.applicationSubmitted",
      description: "Translated: Notification.applicationSuccess",
      duration: 3,
    });
    expect(mockPush).toHaveBeenCalledWith("/portal/trainee/jobs/123/apply");

    jest.useRealTimers();
  });

  it("Display the Apply button with the translated text", () => {
    renderWithProviders(<ApplyModal onValidate={onValidateMock} disabled={false} />);
    const applyButton = screen.getByText("Translated: TraineeHome.Apply");
    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toHaveStyle({ backgroundColor: "#f08c69" });
  });

  it("Open the modal to the Apply button", () => {
    renderWithProviders(<ApplyModal onValidate={onValidateMock} disabled={false} />);
    const applyButton = screen.getByText("Translated: TraineeHome.Apply");

    fireEvent.click(applyButton);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Translated: modal.confirmMessage")).toBeInTheDocument();
  });

  it("Disable the Apply if Disabled button is very", () => {
    renderWithProviders(<ApplyModal onValidate={onValidateMock} disabled={true} />);
    const applyButton = screen.getByText("Translated: TraineeHome.Apply");
    expect(applyButton).toBeDisabled();
  });

  it("Close the modal at the click on cancel", () => {
    renderWithProviders(<ApplyModal onValidate={onValidateMock} disabled={false} />);
    fireEvent.click(screen.getByText("Translated: TraineeHome.Apply"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    const cancelButton = screen.getByText("Translated: modal.cancelButton");
    fireEvent.click(cancelButton);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("Do not open the modal if the button is disabled", () => {
    renderWithProviders(<ApplyModal onValidate={onValidateMock} disabled={true} />);
    const applyButton = screen.getByText("Translated: TraineeHome.Apply");
    fireEvent.click(applyButton);

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});