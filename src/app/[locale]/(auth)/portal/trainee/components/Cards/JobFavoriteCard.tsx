// Importing necessary components and hooks
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

// Destructuring Typography components to make them easier to use
const { Title, Paragraph } = Typography;

interface InterviewCardProps {
  job: Job; 
  onClick: () => void; // Function to handle when the card is clicked
  isSelected: boolean; 
}

// InterviewCard component, displaying the job details in a card format
const InterviewCard: React.FC<InterviewCardProps> = ({ job, onClick, isSelected }) => {
  const { token } = theme.useToken();
  const t = useI18n();
  const dispatch = useDispatch();

  // Using useSelector to get the list of jobs from Redux state
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const currentJob = jobs.find((j) => j.id === job.id); // Finding the current job by ID
  const isFavorited = currentJob?.favorite || false;


    // Toggles the favorite status of a job by dispatching an action with the job ID
    const toggleFavorite = () => {
      dispatch(toggleFavoriteAction(job.id));
    };

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
    <>
      <Card
        role="article" // Set the ARIA role to "article" for accessibility
        onClick={onClick} // Handle the click event on the card
        style={{
          borderRadius: "15px", 
          boxShadow: "3px 4px 9.9px 0px #A25C4526", 
          marginBottom: 20, 
          width: 320, 
          border: isSelected ? '2px solid #6EC3F5' : 'none', 
          gap: "20px" 
        }}
      >
        {/* Header with title and favorite icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between", 
            alignItems: "start", 
          }}
        >
          {/* Link to the job details page */}
          <Link href={`/portal/trainee/jobs/${job.id}`} data-testid="job-card">
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
              <HeartFilled style={{ color: "#f28c68", fontSize: "20px" }} />
            ) : (
              <HeartOutlined style={{ color: "#f28c68", fontSize: "20px" }} />
            )}
          </div>

        </div>

        {/* Job information */}
        <Paragraph>{job.company}</Paragraph> 
        <Paragraph>{job.location}</Paragraph> 

        {/* Tags for contract type, job status, and other information */}
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

          {/* Display the job contract type */}
          <Tag
            style={{
              borderRadius: "5px",
              color: "rgba(0, 0, 0, 0.85)",
            }}
          >
            {job.contract_type} 
          </Tag>

          {/* Display the job status */}
          {statusTag}
        </Space>

        {/* Additional information (views and time since posted) */}
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
    </>
  );
};

export default InterviewCard; 