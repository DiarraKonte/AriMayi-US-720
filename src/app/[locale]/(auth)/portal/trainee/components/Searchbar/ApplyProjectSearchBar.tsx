import { Button, Input, Grid } from "antd";
import { ControlOutlined, SearchOutlined } from "@ant-design/icons";
import { useI18n } from "../../../../../../../../locales/client";
const { useBreakpoint } = Grid;
import { selectCandidacyJobsLength } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobsSelectors";
import { useSelector } from "react-redux";

interface ApplicationsProjectSearchBarProps {
  placeholder?: string;
  label?: string;
}

export default function ApplicationsProjectSearchBar({
  placeholder = "Rechercher...",
  label,
}: ApplicationsProjectSearchBarProps) {
  // Hook to detect screen breakpoints for responsive design
  const screens = useBreakpoint();
  const t = useI18n();
  // Retrieves the number of candidacy jobs from Redux
  const CandidacyJobs = useSelector(selectCandidacyJobsLength);

  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        padding: screens.xs ? "0.75rem 0" : "1.5rem 0", // Adjusts padding based on screen size
        gap: screens.xs ? "0.75rem" : "1rem",
        maxWidth: "70rem",
        width: "100%",
      }}
    >
      <Button
        style={{
          backgroundColor: "#f5785a",
          color: "white",
          border: "none",
          height: "2.5rem",
          marginLeft: screens.xs ? "0.5rem" : "1rem",
          padding: "0 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexShrink: 0,
        }}
        aria-label={t("projectsList.filtersButton")}
      >
        <ControlOutlined style={{ fontSize: "1.5rem" }} />{" "}
        {t("projectsList.filtersButton")}
      </Button>

      <div
        style={{
          flex: 1,
          width: screens.xs ? "100%" : "auto", // Full width on small screens
          maxWidth: screens.md ? "calc(100% - 140px)" : "none", // Limits width on medium screens
        }}
      >
        <Input
          placeholder={placeholder || t("projectsList.searchPlaceholder")}
          prefix={
            <SearchOutlined style={{ color: "#999", fontSize: "1rem" }} />
          }
          type="search"
          style={{ height: "2.5rem", width: "100%" }}
          aria-label={placeholder || t("projectsList.searchPlaceholder")}
        />
        <p
          style={{
            color: "#666",
            fontSize: "0.75rem",
            margin: "0.25rem 0 0 0",
          }}
        >
          <span>
            {/* Dynamically displays job count or empty message */}
            {CandidacyJobs > 0
              ? `${CandidacyJobs} ${label || t("SearchBar.Apply")}`
              : t("SearchBar.EmptyCandidacy")}
          </span>
        </p>
      </div>
    </div>
  );
}
