"use client";

// Import necessary components and hooks from Ant Design, React, and Redux
import { Button, theme, Row, Col, Spin, Alert } from "antd";
import { Layout } from "antd";
const { Content } = Layout;
import Title from "antd/lib/typography/Title";
import { useI18n } from "../../../../../../../../../locales/client";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link"; // Next.js navigation
import PendingsProjectSearchBar from "../../../components/Searchbar/pendingprojectSearchBar";
import InterviewCard from "../../../components/Cards/JobInterviewCard";
import DetailsJobCard from "../../../components/Cards/detailsJobCard";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../Slice/jobs/jobThunks"; // Redux actions to fetch data
import { AppDispatch } from "@/lib/store"; // Store dispatch type
import {
  selectJobsLoading,
  selectJobsError,
 selectPendingJobs,
} from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobsSelectors"; // Redux selectors

export default function Inter() {
  // Accessing the theme token for styling and localization
  const { token } = theme.useToken();
  const t = useI18n(); // Hook to get translated text
  const dispatch = useDispatch<AppDispatch>(); // Dispatch function to interact with Redux store

  // Selecting data from Redux store
  const pendingJobs = useSelector(selectPendingJobs); // List of pending jobs
  const loading = useSelector(selectJobsLoading); // Loading state
  const error = useSelector(selectJobsError); // Error state
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null); // Track selected job ID
  const [detailsError, setDetailsError] = useState<string | null>(null); // Error state for job details


  const selectedJob = pendingJobs.find((job) => job.id === selectedJobId); 


  // Reference for the content height (optional for scroll management)
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetching the initial list of jobs when the component mounts
  useEffect(() => {
    const loadJobs = async () => {
      try {
        await dispatch(fetchJobs()); // Dispatch action to fetch jobs
      } catch (error) {
        console.error("Erreur lors du chargement des jobs:", error); // Log any errors
      }
    };
    loadJobs(); // Call the loadJobs function on component mount
  }, [dispatch]); // Empty dependency array means this effect runs only once

  // Automatically select and load details for the first pending job when data is available
  useEffect(() => {
    if (pendingJobs.length > 0 && !selectedJobId) {
      const firstJobId = pendingJobs[0].id; // Get the ID of the first pending job
      setSelectedJobId(firstJobId); // Set the selected job ID
      handleJobClick(firstJobId); // Fetch job details for the selected job
    }
  }, [pendingJobs]); // Effect runs when pendingJobs changes

  // Function to handle job click and load its details
  const handleJobClick = async (jobId: number) => {
    setSelectedJobId(jobId); // Set the selected job ID
    setDetailsError(null); // Reset any previous errors
  };
  

  // Local loading state to manage the fetch status of jobs
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        await dispatch(fetchJobs()).unwrap(); // Dispatch action to fetch jobs
      } catch (error) {
        console.error("Erreur lors du chargement des jobs:", error); // Log any errors
      } finally {
        setLocalLoading(false); // Disable loading after the fetch completes
      }
    };

    loadJobs(); // Call the loadJobs function on component mount
  }, [dispatch]); // Empty dependency array means this effect runs only once

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
        role="status"
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

  // Show an error message if there's an issue with loading jobs
  if (error) {
    return (
      <Alert
        message="Erreur"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px" }} // Error alert styling
      />
    );
  }

  // Render the main content of the page
  return (
    <Content style={{ paddingTop: 15 }} ref={contentRef}>
      <div style={{ minWidth: "80rem", maxWidth: "100rem", margin: "0 auto" }}>
        <Title
          style={{
            color: token.colorWhite,
            textAlign: "center",
            paddingBottom: 5,
            background: "linear-gradient(90deg, #6EC3F5, #8A66F9)", // Gradient background
            textTransform: "uppercase",
            fontWeight: "950",
            fontSize: "25px",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "50px", // Title margin
          }}
        >
          {t("TraineeHome.Interview")}
        </Title>

        {/* Back button to navigate to the job dashboard */}
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
              <LeftOutlined style={{ color: "orange" }} />
            </Button>
          </Link>
        </div>

        {/* Custom search bar for filtering pending jobs */}
        <PendingsProjectSearchBar />

        {/* Display the list of pending jobs */}
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
            {pendingJobs.length > 0 ? (
              pendingJobs.map((job) => (
                <InterviewCard
                  key={job.id} // Unique key for each job card
                  job={job} // Pass job data to the InterviewCard component
                  onClick={() => handleJobClick(job.id)} // Handle job selection
                  isSelected={job.id === selectedJobId} // Highlight selected job
                />
              ))
            ) : (
              <Alert
                message="Aucune offre d'emploi en attente"
                description="Aucune offre d'emploi en attente pour le moment."
                type="info"
                showIcon
              />
            )}
          </Col>

          {/* Display selected job details */}
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
                  message="Erreur"
                  description={detailsError} // Display error message if job details cannot be loaded
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
