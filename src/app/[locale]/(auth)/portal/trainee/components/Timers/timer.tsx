"use client"; // Indicates this is a client-side component in Next.js
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns"; // Library for formatting time differences
import { enUS, fr } from "date-fns/locale"; // Locales for English and French
import { useCurrentLocale } from "next-intl";

// Mock hook for testing environments where next-intl might not be available
const mockUseCurrentLocale = () => "fr";

// Custom hook to handle locale detection gracefully
const useLocale = () => {
  try {
    return useCurrentLocale();
  } catch (error) {
    return mockUseCurrentLocale();
  }
};
interface TimerProps {
  publishedDate: string;
  "data-testid"?: string; // Pour les tests
}
const Timer = ({ publishedDate }: TimerProps) => {
  const localeCode = useLocale(); // Gets the current locale code
  const locale = localeCode === "fr" ? fr : enUS; // Maps locale code to date-fns locale object
  const [elapsedTime, setElapsedTime] = useState<string>("");

  // Effect to calculate and update elapsed time
  useEffect(() => {
    const updateElapsedTime = () => {
      // Formats the time difference between now and publishedDate
      const formattedTime = formatDistanceToNow(new Date(publishedDate), {
        locale, // Applies the selected locale (e.g., French or English)
        addSuffix: true, // Adds "ago" or equivalent in the locale
      });
      setElapsedTime(formattedTime); // Updates state with formatted string
    };

    updateElapsedTime(); // Initial call on mount
    const intervalId = setInterval(updateElapsedTime, 60000); // Updates every minute
    return () => clearInterval(intervalId); // Cleans up interval on unmount
  }, [publishedDate, locale]); // Re-runs if publishedDate or locale changes

  return <span data-testid="job-timer">{elapsedTime}</span>;
};

export default Timer;
