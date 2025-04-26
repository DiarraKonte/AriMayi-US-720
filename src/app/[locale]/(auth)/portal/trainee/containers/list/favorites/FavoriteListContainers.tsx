"use client";
import { Button, theme, Row, Col, Typography, Spin, Alert } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { useI18n } from "../../../../../../../../../locales/client";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import JobFavoriteCard from "../../../components/Cards/JobFavoriteCard";
import FavoritesProjectSearchBar from "../../../components/Searchbar/favoritesprojectSearchBar";
import DetailsJobCard from "../../../components/Cards/detailsJobCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../Slice/jobs/jobThunks";
import {
  selectAllJobs,
  selectJobsError,
  selectFavoriteJobs,
} from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobsSelectors";
import { toggleFavorite } from "../../../Slice/jobs/jobSlice";
import { AppDispatch } from "@/lib/store";

export default function FavoriteList() {
  const { token } = theme.useToken(); // Access to the current theme token for styling
  const t = useI18n(); // Internationalization hook to handle translations
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch to trigger actions

  // Selecting necessary states from the Redux store
  const jobs = useSelector(selectAllJobs);
  const error = useSelector(selectJobsError);
  const favoriteJobs = useSelector(selectFavoriteJobs);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null); // Store the selected job ID
  const [detailsError, setDetailsError] = useState<string | null>(null); // Store error message for job details

  const selectedJob = favoriteJobs.find((job) => job.id === selectedJobId); 


  // Load the list of jobs when the component mounts
  useEffect(() => {
    const loadJobs = async () => {
      try {
        await dispatch(fetchJobs()); // Dispatch action to fetch the job list
      } catch (error) {
        console.error("Error loading jobs:", error); // Handle error in fetching jobs
      }
    };
    loadJobs(); // Call the function to load jobs
  }, [dispatch]);

  // Load favorite jobs from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteJobs");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      // Optionally restore the favorite jobs to Redux store
      // Example: dispatch(setFavorites(parsedFavorites));
    }
  }, [dispatch]);

  // Save favorite jobs to localStorage whenever they change
  useEffect(() => {
    const updatedFavorites = favoriteJobs.map((job) => job.id); // Extract favorite job IDs
    localStorage.setItem("favoriteJobs", JSON.stringify(updatedFavorites)); // Save to localStorage
  }, [favoriteJobs]);

  // Select and load details for the first favorite job by default
  useEffect(() => {
    if (jobs.length > 0 && !selectedJobId) {
      const firstJobId = jobs.find((job) => job.favorite)?.id; // Select the first favorite job
      if (firstJobId) {
        setSelectedJobId(firstJobId); // Set the first favorite job as selected
        handleJobClick(firstJobId); // Fetch details for the selected job
      }
    }
  }, [jobs]);

  // Function to handle job click and fetch its details
  const handleJobClick = async (jobId: number) => {
    setSelectedJobId(jobId); // Set the selected job ID
    setDetailsError(null); // Reset any previous errors
  };
  

  // Function to toggle job's favorite status
  const handleToggleFavorite = (jobId: number) => {
    dispatch(toggleFavorite(jobId)); // Dispatch action to toggle favorite status
  };

  // Local loading state for jobs fetching
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        await dispatch(fetchJobs()).unwrap(); // Fetch jobs from API
      } catch (error) {
        console.error("Error loading jobs:", error); // Handle error during fetching jobs
      } finally {
        setLocalLoading(false); // Disable loading after the jobs are fetched
      }
    };

    loadJobs(); // Trigger the job loading
  }, [dispatch]);

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

  // Display error if there is an issue loading the jobs
  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    );
  }

  // Filter the list to only show favorite jobs
  const favoriteJobsList = jobs.filter((job) => job.favorite);

  return (
    <Content style={{ paddingTop: 15 }}>
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
          {t("TraineeHome.Favorite")} {/* Display the "Favorite" title */}
        </Title>

        {/* Link to the job dashboard page */}
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

        {/* Search bar for filtering favorite jobs */}
        <FavoritesProjectSearchBar />

        {/* Display job list and job details side by side */}
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
            {/* Show favorite jobs if any, or display a message if no favorite jobs */}
            {favoriteJobsList.length > 0 ? (
              favoriteJobsList.map((job) => (
                <JobFavoriteCard
                  key={job.id}
                  job={job}
                  onClick={() => handleJobClick(job.id)} // Click to show job details
                  isSelected={job.id === selectedJobId} // Highlight the selected job
                />
              ))
            ) : (
              <Alert
                message="No Favorite Jobs"
                description="You don't have any favorite jobs at the moment."
                type="info"
                showIcon
              />
            )}
          </Col>

          <Col xs={24} md={14}>
            {/* Display job details for the selected job */}
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
