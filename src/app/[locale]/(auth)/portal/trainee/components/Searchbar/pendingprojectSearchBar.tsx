import { Button, Input, Grid } from "antd";
import { ControlOutlined, SearchOutlined } from "@ant-design/icons";
import { useI18n } from "../../../../../../../../locales/client";
import { selectPendingJobsLength } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobsSelectors";
const { useBreakpoint } = Grid;
import { useSelector } from "react-redux";

interface PendingProjectSearchBarProps {
  placeholder?: string;
  label?: string;
}

export default function PendingsProjectSearchBar({
  placeholder = "Rechercher...",
  label,
}: PendingProjectSearchBarProps) {
  const screens = useBreakpoint();
  const t = useI18n();
  // Retrieves the count of pending jobs from Redux
  const PendisJobs = useSelector(selectPendingJobsLength);

  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        padding: screens.xs ? "0.75rem 0" : "1.5rem 0",
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
          width: screens.xs ? "100%" : "auto",
          maxWidth: screens.md ? "calc(100% - 140px)" : "none", // Responsive width adjustment
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
            {/* Shows pending jobs count or empty message */}
            {PendisJobs > 0
              ? `${PendisJobs} ${label || t("SearchBar.Interview")}`
              : t("SearchBar.EmptyInterviews")}
          </span>
        </p>
      </div>
    </div>
  );
}
