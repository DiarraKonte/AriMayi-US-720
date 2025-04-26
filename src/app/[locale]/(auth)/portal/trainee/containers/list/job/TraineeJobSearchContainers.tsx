"use client";
// Importing necessary components and hooks from Ant Design, React, Redux, and Next.js
import { Button, theme, Row, Col, Spin, Alert } from "antd";
import { Layout } from "antd";
const { Content } = Layout;
import Title from "antd/lib/typography/Title";
import { useI18n } from "../../../../../../../../../locales/client"; // Localization hook
import { LeftOutlined } from "@ant-design/icons"; // Back arrow icon from Ant Design
import Link from "next/link"; // Next.js link component
import AvailableProjectSearchBar from "../../../components/Searchbar/projectSearchBar"; // Custom search bar component
import JobListCard from "../../../components/Cards/jobListCard"; // Custom job list card component
import DetailsJobCard from "../../../components/Cards/detailsJobCard"; // Custom job details card component
import { useState, useEffect } from "react"; // React hooks for state and effect
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { fetchJobs } from "../../../Slice/jobs/jobThunks"; // Redux actions to fetch data
import {
  selectAvailableJobs,
  selectJobsError,
} from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobsSelectors"; // Redux selectors
import { AppDispatch } from "@/lib/store"; // Type for dispatching actions to Redux store

export default function TraineeJobSearch() {
  const { token } = theme.useToken(); 
  const t = useI18n(); 
  const dispatch = useDispatch<AppDispatch>(); 

  // Selecting data from Redux store
  const jobs = useSelector(selectAvailableJobs); 
  const error = useSelector(selectJobsError); // Error state for jobs
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null); // State to track selected job ID
  const [detailsError, setDetailsError] = useState<string | null>(null); // State to track error when fetching job details

  const selectedJob = jobs.find((job) => job.id === selectedJobId); 

  // Fetch the initial list of jobs on component mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        await dispatch(fetchJobs()); // Dispatch action to fetch jobs
      } catch (error) {
        console.error("Erreur lors du chargement des jobs:", error); // Log any errors
      }
    };
    loadJobs(); // Call the loadJobs function when the component mounts
  }, [dispatch]); // Empty dependency array means this effect runs only once

  // Automatically select and load details for the first job when the job list is available
  useEffect(() => {
    if (jobs.length > 0 && !selectedJobId) {
      const firstJobId = jobs[0].id; 
      setSelectedJobId(firstJobId); 
      handleJobClick(firstJobId); 
    }
  }, [jobs]); // Effect runs whenever jobs list changes

  // Function to handle job selection and fetching its details
// Function to handle job selection and setting the selected job ID
const handleJobClick = async (jobId: number) => {
  setSelectedJobId(jobId); // Set the selected job ID
  setDetailsError(null); // Reset any previous errors
};

  // Local loading state to manage the fetch status of jobs
  const [localLoading, setLocalLoading] = useState(true);

  // Fetch jobs when the component mounts, ensuring loading state is managed properly
  useEffect(() => {
    const loadJobs = async () => {
      try {
        await dispatch(fetchJobs()).unwrap(); // Fetch jobs using Redux action
      } catch (error) {
        console.error("Erreur lors du chargement des jobs:", error); // Log errors if any
      } finally {
        setLocalLoading(false); // Disable loading after the fetch is complete
      }
    };

    loadJobs(); // Call the loadJobs function on component mount
  }, [dispatch]); // Empty dependency array ensures this effect runs only once

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
        description={error} // Display the error message from Redux
        type="error"
        showIcon
        style={{ margin: "20px" }} // Style for the error alert
      />
    );
  }

  // Render the main content of the page
  return (
    <Content style={{ paddingTop: 15 }}>
      <div style={{ minWidth: "80rem", maxWidth: "100rem", margin: "0 auto" }}>
        {/* Title with gradient background and localized text */}
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
            marginBottom: "50px", // Margin at the bottom of the title
          }}
        >
          {t("TraineeHome.FoundAJob")} {/* Translated title */}
        </Title>

        {/* Back button to navigate to the job dashboard */}
        <div style={{ paddingLeft: "5%", paddingBottom: "20px" }}>
          <Link href="/portal/trainee/jobs/dashboard">
            <Button
              type="primary"
              style={{
                background: "white",
                border: "3px solid #F68A67",
                width: "30px", // Button width
              }}
            >
              <LeftOutlined style={{ color: "orange" }} />{" "}
              {/* Back arrow icon */}
            </Button>
          </Link>
        </div>

        {/* Custom search bar to filter jobs */}
        <AvailableProjectSearchBar />

        {/* Displaying job list and selected job details */}
        <Row
          gutter={[20, 0]}
          style={{
            paddingTop: "2%",
            paddingBottom: "20%",
            paddingLeft: "15%",
            paddingRight: "15%",
          }}
        >
          {/* Left column displaying the job list */}
          <Col xs={24} md={8}>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobListCard
                  key={job.id} // Unique key for each job card
                  job={job} // Pass job data to JobListCard component
                  onClick={() => handleJobClick(job.id)} // Handle job selection
                  isSelected={job.id === selectedJobId} // Highlight selected job
                />
              ))
            ) : (
              <Alert
                message="Aucune offre d'emploi"
                description="Aucune offre d'emploi n'est disponible pour le moment."
                type="info"
                showIcon
              />
            )}
          </Col>

          {/* Right column displaying selected job details */}
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
                  description={detailsError} // Display error message if details could not be loaded
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
