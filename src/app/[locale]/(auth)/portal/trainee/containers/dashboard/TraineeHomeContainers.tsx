"use client";
import { Button, theme, Card, Row, Col, Spin, Alert } from "antd";
import Title from "antd/lib/typography/Title";
import { useI18n } from "../../../../../../../../locales/client";
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
import Carousel from "../../components/Carousels/FavoritecardsCarousel";
import InterviewCarousel from "../../components/Carousels/Interviewcarousel";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { setFavorites } from "../../Slice/jobs/jobSlice";
import { fetchJobs } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobThunks";
import {
  selectAvailableJobs,
  selectFavoriteJobs,
  selectPendingJobs,
  selectAllCandidacyJobsLength,
  selectJobsError,
  selectCandidacyJobs,
} from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobsSelectors";
import CandidacyCarousel from "../../components/Carousels/Candidacycarousel";

export default function TraineeHomeContainers() {
  const { token } = theme.useToken();
  const t = useI18n();
  const dispatch = useAppDispatch();

  const candidacyJobs = useSelector(selectCandidacyJobs);
  const jobs = useSelector(selectAvailableJobs);
  const favoriteJobs = useSelector(selectFavoriteJobs);
  const pendingJobs = useSelector(selectPendingJobs);
  const AllCandidacyJobsLength = useSelector(selectAllCandidacyJobsLength);
  const error = useSelector(selectJobsError);

  const [localLoading, setLocalLoading] = useState(true); // Local loading state to manage UI during data fetch
  const [favoritesLoaded, setFavoritesLoaded] = useState(false); // State to track if favorites have been loaded from localStorage

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Loading favorite jobs from localStorage if available
        const storedFavorites = localStorage.getItem("favoriteJobs");
        if (storedFavorites && !favoritesLoaded) {
          try {
            const parsedFavorites = JSON.parse(storedFavorites);
            if (Array.isArray(parsedFavorites)) {
              dispatch(setFavorites(parsedFavorites)); // Setting favorites in the Redux store
            }
          } catch (error) {
            console.error("Error loading favorites from localStorage:", error);
            localStorage.removeItem("favoriteJobs"); // In case of error, clearing the stored favorites
          }
        }
        setFavoritesLoaded(true); // Marking favorites as loaded
        await dispatch(fetchJobs()); // Fetching jobs via Redux action
      } finally {
        setLocalLoading(false); // Ending the local loading state once data fetching is done
      }
    };

    initializeData(); // Calling the async function to initialize data
  }, [dispatch, favoritesLoaded]); // Re-running the effect when favoritesLoaded changes

  if (localLoading) {
    // Conditional rendering during the loading state
    return (
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </Content>
    );
  }

  if (error && !jobs.length) {
    // If there is an error and no jobs are available, show an error alert
    return (
      <Content style={{ padding: "3% 5%" }}>
        <Alert message={error} type="error" showIcon />
      </Content>
    );
  }

  return (
    <Content
      style={{
        paddingTop: "3%",
        paddingBottom: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", padding: "0 16px" }}>
        <Title
          style={{
            color: token.colorWhite,
            textAlign: "left",
            paddingBottom: 5,
            background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
            textTransform: "uppercase",
            fontWeight: "950",
            fontSize: "px",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "50px",
          }}
        >
          {t("TraineeHome.Hello")}, Diarra Konte
        </Title>

        <Link href="/portal/trainee/jobs/list/job">
          <Title
            style={{
              color: token.colorWhite,
              textAlign: "left",
              background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
              textTransform: "uppercase",
              fontWeight: "950",
              fontSize: "20px",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              alignContent: "left",
            }}
          >
            {t("TraineeHome.FoundAJob")}
          </Title>
        </Link>

        <Row gutter={[0, 20]} style={{ paddingRight: "5%" }}>
          <Col xs={24} md={4}>
            <Row>
              <Col span={21}>
                <Card
                  style={{
                    borderRadius: "15px",
                    boxShadow: "3px 4px 9.9px 0px #A25C4526",
                    height: "265px",
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    background: "linear-gradient(135deg, #6EC3F5, #8A66F9)",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {jobs?.length || 0}
                    </span>{" "}
                    {/* Display number of jobs */}
                    <span
                      style={{
                        fontSize: "14px",
                        marginTop: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {t("TraineeHome.JobOffer")}
                    </span>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={4}>
            <Row
              gutter={[8, 30]}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Col span={20}>
                <Card
                  style={{
                    borderRadius: "15px",
                    boxShadow: "3px 4px 9.9px 0px #A25C4526",
                    padding: 0,
                    background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
                    color: "#f28c68",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {AllCandidacyJobsLength || 0}
                    </span>{" "}
                    {/* Display number of candidacy jobs */}
                    <span
                      style={{
                        fontSize: "14px",
                        marginTop: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {t("TraineeHome.Applications")}
                    </span>
                  </div>
                </Card>
              </Col>
              <Col span={20}>
                <Card
                  style={{
                    borderRadius: "15px",
                    boxShadow: "3px 4px 9.9px 0px #A25C4526",
                    padding: 0,
                    height: "100%",
                    background: "linear-gradient(135deg, #FB923C, #F97316)",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {pendingJobs?.length || 0}
                    </span>{" "}
                    {/* Display number of pending jobs */}
                    <span
                      style={{
                        fontSize: "14px",
                        marginTop: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {t("TraineeHome.Interview")}
                    </span>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Favorite jobs section */}
        <div>
          <Title
            level={4}
            style={{
              textAlign: "left",
              fontWeight: "950",
              fontSize: "16px",
              alignContent: "left",
              marginTop: 20,
            }}
          >
            {t("TraineeHome.Favorite")}
            <Link href="/portal/trainee/jobs/list/favorites">
              <Button
                type="text"
                style={{
                  background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                  color: "blue",
                  fontWeight: "bold",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                {t("TraineeHome.SeeAll")}
              </Button>
            </Link>
          </Title>
          <div style={{ paddingRight: "15%" }}>
            {favoriteJobs.length > 0 ? (
              <Carousel items={favoriteJobs} />
            ) : (
              <p>{t("TraineeJob.NoJobFavoriteFound")}</p>
            )}
          </div>
        </div>

        {/* Candidacy jobs section */}
        <div>
          <Title
            level={4}
            style={{
              textAlign: "left",
              fontWeight: "950",
              fontSize: "16px",
              alignContent: "left",
              marginBottom: 0,
            }}
          >
            {t("TraineeHome.Applications1")}
            <Link href="/portal/trainee/jobs/list/candidacy">
              <Button
                type="text"
                style={{
                  background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                  color: "blue",
                  fontWeight: "bold",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                {t("TraineeHome.SeeAll")}
              </Button>
            </Link>
          </Title>
          <div style={{ paddingRight: "15%" }}>
            {candidacyJobs.length > 0 ? (
              <CandidacyCarousel items={candidacyJobs} />
            ) : (
              <p>{t("TraineeJob.NoJobCandidacyFound")}</p>
            )}
          </div>
        </div>

        {/* Pending jobs section */}
        <div>
          <Title
            level={4}
            style={{
              textAlign: "left",
              fontWeight: "950",
              fontSize: "16px",
              alignContent: "left",
              marginBottom: 0,
            }}
          >
            {t("TraineeHome.Interview")}
            <Link href="/portal/trainee/jobs/list/interview">
              <Button
                type="text"
                style={{
                  background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                  color: "blue",
                  fontWeight: "bold",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                {t("TraineeHome.SeeAll")}
              </Button>
            </Link>
          </Title>
          <div style={{ paddingRight: "15%" }}>
            {pendingJobs.length > 0 ? (
              <InterviewCarousel items={pendingJobs} />
            ) : (
              <p>{t("TraineeJob.NoInterviewApplications")}</p>
            )}
          </div>
        </div>
      </div>
    </Content>
  );
}
