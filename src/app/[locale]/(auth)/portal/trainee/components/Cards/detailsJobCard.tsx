import React from "react";
import { Card, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite as toggleFavoriteAction } from "../../Slice/jobs/jobSlice";
import { RootState } from "@/lib/store";
import { useI18n } from "../../../../../../../../locales/client";
import locationImg from "@/app/[locale]/(auth)/portal/trainee/components/Group 182.png";
import Link from "next/link";
import { Job } from "../../Slice/jobs/jobInterfaces";
import Timer from "../Timers/timer";

// Extracting the Title component from Ant Design
const { Title } = Typography;


// Selector function to get job favorites from the Redux store
const selectJobFavorites = (state: RootState) => {
  return state.jobs.jobs.reduce((acc, job) => {
    acc[job.id] = job.favorite;
    return acc;
  }, {} as Record<number, boolean>);
};

// Main component for the detailed job card
const DetailsJobCard = ({ job }: { job: Job }) => {
  const t = useI18n(); // Translation hook for managing multilingual texts
  const dispatch = useDispatch(); // Dispatch hook to send Redux actions
  const favorites = useSelector(selectJobFavorites); // Select job favorites state

  // Function to toggle the favorite state of the job (add or remove favorite)
  const toggleFavorite = () => {
    dispatch(toggleFavoriteAction(job.id));
  };

  // If job details are not available, display a loading message
  if (!job) {
    return (
      <Card style={{ boxShadow: "3px 4px 9.9px 0px #A25C4526", height: "100%" }}>
        <div>{t("Notification.loading")}</div>
      </Card>
    );
  }

  // Check if the job is favorited using the job ID
  const isFavorited = favorites[job.id] || false;

  return (
    <>
      <Card 
      data-testid="job-details" // Test ID to identify the component in tests
        style={{ 
          borderRadius: "20px", // Rounded border of the card
          boxShadow: "3px 4px 9.9px 0px #A25C4526", 
          height: "100%", // 100% height to occupy all available height
          padding: "24px" // Internal padding of the card
        }}
      >
        {/* Title and favorite icon */}
        <div data-testid="job-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Title level={4} style={{ 
            background: "linear-gradient(90deg, #6EC3F5, #8A66F9)", // Color gradient
            WebkitBackgroundClip: "text", // Clip background to text
            WebkitTextFillColor: "transparent", // Transparent text for gradient effect
            margin: 0
          }}>
            {job.title} {/* Display job title */}
          </Title>
          {/* Favorite icon */}
          <div onClick={toggleFavorite} style={{ cursor: "pointer" }} data-testid="favorite-icon">
            {isFavorited ? (
              <HeartFilled style={{ color: "#f28c68", fontSize: "20px" }} />
            ) : (
              <HeartOutlined style={{ color: "#f28c68", fontSize: "20px" }} />
            )}
          </div>
        </div>

        {/* Additional information about the company and location */}
        <div style={{ display : "flex", gap : '20px', marginTop: "20px" }}>
          <p> <strong>{t("JobDetails.company")}</strong>{job.company}</p>
          <p> <strong>{t("JobDetails.address")}</strong>{job.location}</p>
          <p> <strong>{t("JobDetails.date")}</strong><Timer publishedDate={job.publishedDate} data-testid="job-timer" />
          </p>
        </div>

        {/* If the user has already applied, display a message, otherwise a button to apply */}
        {job.applied ? (
          <div style={{
            padding: "8px 16px",
            borderRadius: "4px",
            color: "#F68A67",
            border: "2px dashed #F68A67",
            backgroundColor: "rgba(246, 138, 103, 0.1)",
            marginTop: "24px",
            textAlign: "center",
            fontWeight: "bold"
          }}>
            {t("TraineeJob.AlreadyApplied")}
          </div>
        ) : (
          <Link href={`/portal/trainee/jobs/${job.id}`}>
            <button style={{
              backgroundColor: "#f28c68", 
              color: "white", 
              padding: "8px 24px", 
              border: "none",
              borderRadius: "4px", 
              marginTop: "24px", 
              cursor: "pointer", 
              fontWeight: "bold"
            }}>
              {t("TraineeHome.Apply")} {/* Button label "Apply" */}
            </button>
          </Link>
        )}

        {/* Job description */}
        <div style={{ marginTop: "32px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "12px" }}>
            {t("projectsQualify.placeholders.jobDescription")}
          </h3>
          <p style={{ color: "#666", fontSize: "14px" }}>
            {job.description} {/* Job description */}
          </p>
        </div>

        {/* Required technical skills */}
   

        {/* Location section with map */}
        <div style={{ marginTop: "32px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "bold" }}>
            {t("JobDetails.Address")}
          </h3>

          {job &&( 
            <div style={{ display: "flex", flexDirection: "column", marginBottom : "20px"}}>
              {job.location} {/* Job address */}
            </div>
          )}

          <div style={{ height: "200px", borderRadius: "8px", overflow: "hidden" }}>
            <Image 
              src={locationImg} // Location image
              alt="Location"
              style={{ objectFit: "cover", width: "100%", height: "100%" }} // Image styling
            />
          </div>
        </div>

        {/* Additional job details */}
        <div>
          <p style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>{t("TraineeJob.Details")}</p>
        </div>

        <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
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
          {job && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong>{t("projectsDetails.workOrganisation")}:</strong>
              {job.workOrganisation}
              <strong>{t("JobDetails.salary")}:</strong>
              {job.salary}
            </div>
          )}

          {/* Additional information (working hours, etc.) */}
          <div>
            <p style={{ fontSize: "20px", fontWeight: "bold", marginTop:"25px" }}>
              {t("projectsDetails.additionalInfo")}
            </p>
            {job?.complementaryInfo && (
              <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong>{t("JobDetails.workHours")}: </strong>
                  {job.complementaryInfo}
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