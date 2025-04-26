import React from "react";
import { Card, Typography, Tag, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useI18n } from "../../../../../../../../locales/client";
import { theme } from "antd";
import Link from "next/link";
import { Job } from "../../Slice/jobs/jobInterfaces";
import Timer from "../Timers/timer";
import ToggleFavorite from "../Favorite/toggleFavorite";

const { Title, Paragraph } = Typography;

interface InterviewCardProps {
  job: Job; 
  onClick: () => void; 
  isSelected: boolean; 
}

const InterviewCard: React.FC<InterviewCardProps> = ({
  job,
  onClick,
  isSelected,
}) => {
  const { token } = theme.useToken();
  const t = useI18n();


  // Logic for the job status tag (if the job status is "pending", show an orange tag)
  let statusTag = null;
  if (job.job_status === "pending") {
    statusTag = (
      <Tag color="orange" style={{ borderRadius: "5px", padding: "0px 10px" }}>
        {t("TraineeHome.Interview")}
      </Tag>
    );
  }

  return (
    <Card
      role="article"
      onClick={onClick} 
      style={{
        borderRadius: "15px",
        boxShadow: "3px 4px 9.9px 0px #A25C4526",
        marginBottom: 20,
        width: 320,
        border: isSelected ? "2px solid #6EC3F5" : "none",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Link href={`/portal/trainee/jobs/${job.id}`} data-testid="job-card">
          <Title
            level={5}
            style={{
              background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
              color: token.colorWhite,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              maxWidth: "80%",
              fontWeight: "bold",
            }}
          >
            {job.title}
          </Title>
        </Link>

      {/*TODO : fix API call in postfavorites with good endpoint
      was working with older endpoint*/}
      <ToggleFavorite job={job} /> {/*Use here to do a test*/}
      </div>

      <Paragraph>{job.company}</Paragraph>
      <Paragraph>{job.location}</Paragraph>

      <Space size="small" style={{ marginBottom: 12 }}>
        <Tag
          style={{
            borderRadius: "5px",
            padding: "0px 10px",
            color: "rgba(0, 0, 0, 0.85)",
            whiteSpace: "nowrap",
          }}
        >
          {t("JobDetails.contractType")}
        </Tag>
        <Tag
          style={{
            borderRadius: "5px",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          {job.contract_type}
        </Tag>
        {statusTag}
      </Space>

      <div style={{ marginTop: "auto" }}>
        <Paragraph style={{ marginBottom: 0 }}>
          <EyeOutlined style={{ marginRight: 4 }} />
          {job.views} {t("TraineeHome.Views")}
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          {t("TraineeHome.PublishedTwoWeeksAgo")}
          <Timer publishedDate={job.publishedDate} />
        </Paragraph>
      </div>
    </Card>
  );
};

export default InterviewCard;