"use client";
import { Button, theme, Row, Col, Spin, Alert } from "antd";
import { Layout } from "antd";
const { Content } = Layout;
import Title from "antd/lib/typography/Title";
import { useI18n } from "../../../../../../../../../locales/client";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import ApplicationsProjectSearchBar from "../../../components/Searchbar/ApplyProjectSearchBar";
import JobListCard from "../../../components/Cards/jobListCard";
import DetailsJobCard from "../../../components/Cards/detailsJobCard";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../Slice/jobs/jobThunks";
import { AppDispatch } from "@/lib/store";
import {
  selectJobsError,
  selectCandidacyJobs,
} from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobsSelectors";

export default function ApplytList() {
  const { token } = theme.useToken(); // Access theme token for styling (Ant Design)
  const t = useI18n(); // Internationalization hook to handle translations
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch to call actions

  // Selecting necessary state from the Redux store
  const CandidacyJobs = useSelector(selectCandidacyJobs);
  const error = useSelector(selectJobsError);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null); // State to store selected job ID
  const [detailsError, setDetailsError] = useState<string | null>(null); // State to handle errors while fetching job details
  const [localLoading, setLocalLoading] = useState(true); // Local loading state while fetching data
  const contentRef = useRef<HTMLDivElement>(null); // Ref to track content for potential scrolling

  const selectedJob = CandidacyJobs.find((job) => job.id === selectedJobId); 


  // Fetch jobs once when the component mounts
  useEffect(() => {
    const loadJobs = async () => {
      try {
        // Dispatch action to fetch jobs
        await dispatch(fetchJobs()).unwrap();
      } catch (err) {
        console.error("Error loading jobs:", err); // Log any errors in fetching jobs
      } finally {
        setLocalLoading(false); // Set loading to false once data is fetched
      }
    };
    loadJobs();
  }, [dispatch]);

    // Handles the click on a job to fetch its details

  const handleJobClick = async (jobId: number) => {
    setSelectedJobId(jobId); // Set the selected job ID
    setDetailsError(null); // Reset any previous errors
  };

  // After data is loaded, select the first job from the list and fetch its details
  useEffect(() => {
    if (!localLoading && CandidacyJobs.length > 0 && !selectedJobId) {
      const firstJobId = CandidacyJobs[0].id;
      setSelectedJobId(firstJobId);
      handleJobClick(firstJobId);
    }
  }, [localLoading, CandidacyJobs, selectedJobId, handleJobClick]);

  

  //Add a delayed loading state
  const [delayedLoading, setDelayedLoading] = useState(true);

  //useeffect for the delayed loading
  useEffect(() => {
    const timer = setTimeout(() => setDelayedLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Loading state - display a spinner while data is being fetched, showw with a minimum delay
  if (localLoading || delayedLoading) {
    return (
      <div
        role="alert"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" /> {/* Ant Design spinner */}
      </div>
    );
  }

  // If there is an error, display an alert
  if (error) {
    return (
      <Alert
        role="alert"
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    );
  }

  return (
    <Content style={{ paddingTop: 15 }} ref={contentRef}>
      <div style={{ minWidth: "80rem", maxWidth: "100rem", margin: "0 auto" }}>
        <Title
          style={{
            color: token.colorWhite,
            textAlign: "center",
            paddingBottom: 5,
            background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
            textTransform: "uppercase",
            fontWeight: "950",
            fontSize: "25px",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "50px",
          }}
        >
          {t("TraineeHome.Applications")} {/* Display the Applications title */}
        </Title>
        <div style={{ paddingLeft: "5%", paddingBottom: "20px" }}>
          <Link href="/portal/trainee/jobs/dashboard">
            <Button
              type="primary"
              style={{
                background: "white",
                border: "3px solid #F68A67",
                width: "30px",
              }}
            >
              <LeftOutlined style={{ color: "orange" }} /> {/* Back button */}
            </Button>
          </Link>
        </div>
        <ApplicationsProjectSearchBar />{" "}
        {/* Search bar for filtering applications */}
        {/* Layout for displaying the job list and details side by side */}
        <Row
          gutter={[20, 0]}
          style={{
            paddingTop: "2%",
            paddingBottom: "20%",
            paddingLeft: "15%",
            paddingRight: "15%",
          }}
        >
          <Col xs={24} md={8}>
            {/* Display job list if there are candidacy jobs */}
            {CandidacyJobs.length > 0 ? (
              CandidacyJobs.map((job) => (
                <JobListCard
                  key={job.id}
                  job={job}
                  onClick={() => handleJobClick(job.id)} // Handle job click to load details
                  isSelected={job.id === selectedJobId} // Highlight selected job
                />
              ))
            ) : (
              <Alert
                message="No pending job offers"
                description="No job offers available at the moment."
                type="info"
                showIcon
              />
            )}
          </Col>

          <Col xs={24} md={14}>
            <div
              style={{
                position: "sticky",
                top: "20px",
                maxHeight: "100vh",
                overflowY: "auto",
              }}
            >
              {detailsError ? (
                <Alert
                  message="Error"
                  description={detailsError}
                  type="error"
                  showIcon
                />
              ) : (
                selectedJob && <DetailsJobCard job={selectedJob} />             
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Content>
  );
}
