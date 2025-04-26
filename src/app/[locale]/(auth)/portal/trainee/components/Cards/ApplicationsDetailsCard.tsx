import React from "react";
import { Card, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useI18n } from "../../../../../../../../locales/client";
import locationImg from "@/app/[locale]/(auth)/portal/trainee/components/Group 182.png";
import { Job } from "../../Slice/jobs/jobInterfaces";
import { toggleFavorite as toggleFavoriteAction } from "../../Slice/jobs/jobSlice";
const { Title } = Typography;

// Custom Redux selector to transform job list into a favorites object
const selectJobFavorites = (state: RootState) => {
  // Reduces the jobs array into an object where keys are job IDs and values are favorite statuses
  return state.jobs.jobs.reduce(
    (acc, job) => {
      acc[job.id] = job.favorite;
      return acc;
    },
    {} as Record<number, boolean>,
  );
};

interface ApplicationsDetailsJobCardProps {
  job: Job; // Replace `Job` with the actual type of your job data
}

const DetailsJobCard: React.FC<ApplicationsDetailsJobCardProps> = ({ job }) => {
  const t = useI18n();
  const dispatch = useDispatch();
  const favorites = useSelector(selectJobFavorites);

    // Toggles the favorite status of a job by dispatching an action with the job ID
    const toggleFavorite = () => {
      dispatch(toggleFavoriteAction(job.id));
    };



  if (!job) {
    return (
      <Card
        style={{ boxShadow: "3px 4px 9.9px 0px #A25C4526", height: "100%" }}
      >
        <div>{t("Notification.loading")}</div>
      </Card>
    );
  }

  // Checks if the current job is favorited, defaulting to false if not found
  const isFavorited = favorites[job.id] || false;

  return (
    <>
      <Card
        style={{
          boxShadow: "3px 4px 9.9px 0px #A25C4526",
          height: "100%",
          padding: "24px",
        }}
      >
        <div
          data-testid="job-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Title
            level={4}
            style={{
              background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            {job.title}
          </Title>
          <div onClick={toggleFavorite} style={{ cursor: "pointer" }}>
            {isFavorited ? (
              <HeartFilled style={{ color: "#f28c68", fontSize: "20px" }} />
            ) : (
              <HeartOutlined style={{ color: "#f28c68", fontSize: "20px" }} />
            )}
          </div>
        </div>

        <div style={{ marginTop: "32px" }}>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            {t("projectsQualify.placeholders.jobDescription")}
          </h3>
          <p style={{ color: "#666", fontSize: "14px" }}>
            {job.description}
          </p>
        </div>

        <div style={{ marginTop: "32px" }}>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            {t("projectsQualify.placeholders.technicalEnvironment")}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {/* Splits the skill string by commas and maps each skill to a styled span */}
            {job.skill.split(",").map((skill, index) => (
              <span
                key={index}
                style={{
                  background: "#f5f5f5",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {skill.trim()} {/* Removes extra spaces from each skill */}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "32px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "bold" }}>
            {t("JobDetails.Address")}
          </h3>

          {/* Conditionally renders address only if jobDetails.details exists */}
          {job && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              {job.location}
            </div>
          )}

          <div
            style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}
          >
            <Image
              src={locationImg}
              alt="Localisation"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <p
            style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}
          >
            {t("TraineeJob.Details")}
          </p>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>{t("projectsDetails.jobTitle")}:</strong>
            <span>{job.title}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>{t("TraineeJob.degreeRequired")}:</strong>
            <span>{job.degreeRequired}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>{t("projectsDetails.contractType")}:</strong>
            <span>{job.contract_type}</span>
          </div>
          {/* Renders additional details only if jobDetails.details is available */}
          {job && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong>{t("projectsDetails.workOrganisation")}:</strong>
              {job.workOrganisation}
              <strong>{t("JobDetails.salary")}:</strong>
              {job.salary}
            </div>
          )}

          <div>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: "25px",
              }}
            >
              {t("projectsDetails.additionalInfo")}
            </p>

            {/* Uses optional chaining to safely access nested complementaryInfo */}
            {job?.complementaryInfo && (
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong>{t("JobDetails.workHours")}: </strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default DetailsJobCard;
