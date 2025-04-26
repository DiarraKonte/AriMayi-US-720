import { Card, Typography, Tag, Space } from "antd";
import { EyeOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useI18n } from "../../../../../../../../locales/client";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite as toggleFavoriteAction } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobSlice";
import { theme } from "antd";
import Link from "next/link";
import { RootState } from "@/lib/store";
import { Job } from "../../Slice/jobs/jobInterfaces";
import Timer from "../Timers/timer";

const { Title, Paragraph } = Typography;

interface CandidacyCardProps {
  job: Job;
  onClick: () => void;
  isSelected: boolean; // Whether the card is selected or not
}

const CandidacyCard: React.FC<CandidacyCardProps> = ({ job, onClick, isSelected }) => {
  const { token } = theme.useToken();
  const t = useI18n();
  const dispatch = useDispatch();

  // Retrieves job data from Redux and checks favorite status
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const currentJob = jobs.find((j) => j.id === job.id); // Matches current job with Redux state
  const isFavorited = currentJob?.favorite || false;

  const toggleFavorite = () => {
    dispatch(toggleFavoriteAction(job.id));
  };

  // Dynamically sets status tag based on job status
  let statusTag = null;
  if (job.job_status === "in progress") {
    statusTag = (
      <Tag color="grey" style={{ borderRadius: "5px", padding: "0px 10px", marginBottom: "5px" }}>
        {t("TraineeHome.InProgress")}
      </Tag>
    );
  } else if (job.job_status === "rejected") {
    statusTag = (
      <Tag color="red" style={{ borderRadius: "5px", padding: "0px 10px", marginBottom: "5px" }}>
        {t("TraineeHome.rejected")}
      </Tag>
    );
  }

  return (
    <Card
      data-testid="job-details"
      onClick={onClick}
      style={{
        borderRadius: "15px",
        boxShadow: "3px 4px 9.9px 0px #A25C4526",
        marginBottom: 20,
        width: 320,
        border: isSelected ? '2px solid #6EC3F5' : 'none',
        gap: "20px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <Link href={`/portal/trainee/jobs/${job.id}`}>
          <Title
            level={5}
            style={{ 
              background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
              color: token.colorWhite,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              maxWidth: "80%", 
              fontWeight: "bold" 
            }}
          >
            {job.title}
          </Title>
        </Link>
        <div onClick={toggleFavorite} style={{ cursor: "pointer" }}>
          {isFavorited ? (
            <HeartFilled style={{ color: "#f28c68", fontSize: "16px" }} />
          ) : (
            <HeartOutlined style={{ color: "#f28c68", fontSize: "16px" }} />
          )}
        </div>
      </div>

      <Paragraph>{job.company}</Paragraph>
      <Paragraph>{job.location}</Paragraph>

      <Space size="small" style={{ marginBottom: 12 }}>
        <Tag style={{ borderRadius: "5px", padding: "0px 10px", color: "rgba(0, 0, 0, 0.85)", whiteSpace: "nowrap" }}>
          {t("JobDetails.contractType")}
        </Tag>
        <Tag style={{ borderRadius: "5px", color: "rgba(0, 0, 0, 0.85)" }}>
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
          <Timer publishedDate={job.publishedDate} /> {/* Displays time elapsed since publication */}
        </Paragraph>
      </div>
    </Card>
  );
};

export default CandidacyCard;