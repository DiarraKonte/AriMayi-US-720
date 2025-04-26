import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { Button, theme, Card, Row, Col, Typography, Spin } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { useI18n } from "../../../../../../../../locales/client";
import { useRouter } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";
import ApplicationsDetailsJobCard from "../../components/Cards/ApplicationsDetailsCard";
import ApplyForm from "../../components/Cards/ApplicationsCard";
import { AppDispatch, RootState } from "@/lib/store";
import { selectJobById } from "../../Slice/jobs/jobsSelectors"; // Assurez-vous que ce chemin est correct
import { job_status } from "../../Slice/jobs/jobInterfaces";
import { fetchJobs } from "../../Slice/jobs/jobThunks"; // Ajout de fetchJobs si nécessaire

const { Paragraph } = Typography;

export default function ApplyContainers() {
  const { token } = theme.useToken();
  const t = useI18n();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams(); 
  const router = useRouter();
  const [localLoading, setLocalLoading] = useState(true);

  // Convertir id en number
  const jobId = Array.isArray(id) ? Number(id[0]) : Number(id);

  // Récupérer le job depuis Redux
  const job = useSelector((state: RootState) => selectJobById(jobId)(state));

  // Charger les jobs si le job n'est pas dans le store
  useEffect(() => {
    if (jobId && !job) {
      dispatch(fetchJobs()).finally(() => {
        setLocalLoading(false); // Arrête le chargement une fois les jobs fetchés
      });
    } else {
      setLocalLoading(false); // Arrête le chargement si le job est déjà présent
    }
  }, [jobId, job, dispatch]);

  if (localLoading || !job) {
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
        {!job && !localLoading && <p>{t("TraineeJob.notFound")}</p>}
      </Content>
    );
  }

  return (
    <Content
      style={{
        paddingTop: 15,
        paddingBottom: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
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
          {t("TraineeHome.Apply")}
        </Title>
      </div>

      <div
        style={{
          paddingBottom: "20px",
          textAlign: "left",
          width: "100%",
          paddingLeft: "5%",
        }}
      >
        <Button
          onClick={() => router.back()}
          type="primary"
          style={{
            background: "white",
            border: "3px solid #F68A67",
            width: "30px",
            marginLeft: "0",
          }}
        >
          <LeftOutlined style={{ color: "orange" }} />
        </Button>
      </div>

      <Row
        gutter={[16, 16]}
        justify="space-between"
        style={{ width: "100%", maxWidth: 1200 }}
      >
        <Col xs={24} md={14}>
          <ApplicationsDetailsJobCard job={job} />
        </Col>

        {/* Conditionally shows ApplyForm if not applied and job is open */}
        {job && !job.applied && job.job_status === job_status.AVAILABLE && (
          <Col xs={24} md={9}>
            <ApplyForm job={job} />
          </Col>
        )}

        {/* Shows message if user has already applied */}
        {job && job.applied && (
          <Col xs={24} md={9}>
            <Card
              style={{
                textAlign: "center",
                padding: 20,
                boxShadow: "3px 4px 9.9px 0px #A25C4526",
              }}
            >
              <Title level={4} style={{ color: token.colorPrimary }}>
                {t("TraineeJob.AlreadyApplied")}
              </Title>
              <Paragraph style={{ color: token.colorTextSecondary }}>
                {(job.job_status === job_status.PENDING ||
                  job.job_status === job_status.INPROGRESS) && (
                  <span>{t("TraineeJob.PendingProcessing")}</span>
                )}
                {job.job_status === job_status.REJECTED && t("TraineeJob.Rejected")}
                {job.job_status === job_status.ACCEPTED && t("TraineeJob.Accepted")}
              </Paragraph>
            </Card>
          </Col>
        )}

        {/* Shows message if job is refused and user hasn’t applied */}
        {job && job.job_status === job_status.REJECTED && !job.applied && (
          <Col xs={24} md={9}>
            <Card
              style={{
                textAlign: "center",
                padding: 20,
                boxShadow: "3px 4px 9.9px 0px #A25C4526",
              }}
            >
              <Title level={4} style={{ color: token.colorPrimary }}>
                {t("TraineeJob.JobRefused")}
              </Title>
              <Paragraph style={{ color: token.colorTextSecondary }}>
                {t("TraineeJob.JobClosed")}
              </Paragraph>
            </Card>
          </Col>
        )}
      </Row>
    </Content>
  );
}