import { render, screen, waitFor } from "@testing-library/react";
import Timer from "@/app/[locale]/(auth)/portal/trainee/components/Timers/timer";
import { enUS, fr } from "date-fns/locale";
import React from "react";

// Mock de next-intl/client
jest.mock("next-intl/client", () => ({
  useCurrentLocale: jest.fn(),
}));

// Mock de date-fns pour contrôler le temps
jest.mock("date-fns", () => ({
  ...jest.requireActual("date-fns"),
  formatDistanceToNow: jest.fn(),
}));

describe("Timer", () => {
  const mockUseCurrentLocale = require("next-intl/client").useCurrentLocale;
  const mockFormatDistanceToNow = require("date-fns").formatDistanceToNow;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); // Active les timers fictifs
    mockUseCurrentLocale.mockReturnValue("fr"); // Locale par défaut : français
    mockFormatDistanceToNow.mockReturnValue("il y a 2 jours"); // Valeur par défaut
  });

  afterEach(() => {
    jest.useRealTimers(); // Rétablit les timers réels
  });

  it("displays the initial elapsed time based on the provided date", () => {
    const publishedDate = "2023-10-01T10:00:00Z";
    render(<Timer publishedDate={publishedDate} />);
    expect(screen.getByTestId("job-timer")).toHaveTextContent("il y a 2 jours");
    expect(mockFormatDistanceToNow).toHaveBeenCalledWith(new Date(publishedDate), {
      locale: fr,
      addSuffix: true,
    });
  });

  it("Updates the time elapsed every minute", async () => {
    const publishedDate = "2023-10-01T10:00:00Z";
    render(<Timer publishedDate={publishedDate} />);

    // Vérifie le rendu initial
    expect(screen.getByTestId("job-timer")).toHaveTextContent("il y a 2 jours");

    // Simule le passage de 1 minute
    mockFormatDistanceToNow.mockReturnValue("il y a 2 jours et 1 minute");
    jest.advanceTimersByTime(60000); // 1 minute

    // Attend que l'état soit mis à jour
    await waitFor(() => {
      expect(screen.getByTestId("job-timer")).toHaveTextContent("il y a 2 jours et 1 minute");
    });
  });

  it("Use the English local if the code is 'in'", () => {
    mockUseCurrentLocale.mockReturnValue("en");
    const publishedDate = "2023-10-01T10:00:00Z";
    render(<Timer publishedDate={publishedDate} />);
    expect(screen.getByTestId("job-timer")).toHaveTextContent("il y a 2 jours"); // Valeur mockée
    expect(mockFormatDistanceToNow).toHaveBeenCalledWith(new Date(publishedDate), {
      locale: enUS,
      addSuffix: true,
    });
  });

  it("Clean the interval during disassembly", () => {
    const publishedDate = "2023-10-01T10:00:00Z";
    const { unmount } = render(<Timer publishedDate={publishedDate} />);
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it("Manages Next-Intl loading errors using the default mock", () => {
    jest.mock("next-intl/client", () => {
      throw new Error("Module not found");
    });
    const publishedDate = "2023-10-01T10:00:00Z";
    render(<Timer publishedDate={publishedDate} />);
    expect(screen.getByTestId("job-timer")).toHaveTextContent("il y a 2 jours");
    expect(mockFormatDistanceToNow).toHaveBeenCalledWith(new Date(publishedDate), {
      locale: fr, // Doit utiliser "fr" du mockUseCurrentLocale
      addSuffix: true,
    });
  });
});