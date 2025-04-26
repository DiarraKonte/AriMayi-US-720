// Importing necessary components from Ant Design for styling and icons
import { Card, Typography, Tag, Space } from "antd";
import { EyeOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useI18n } from "../../../../../../../../locales/client"; // Importing translation hook
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management
import { toggleFavorite as toggleFavoriteAction } from "@/app/[locale]/(auth)/portal/trainee/Slice/jobs/jobSlice"; 
import { theme } from "antd"; 
import Link from "next/link"; 
import { RootState } from "@/lib/store"; // Importing RootState type for Redux store
import { Job } from "../../Slice/jobs/jobInterfaces";
import Timer from "../Timers/timer"; 

// Destructuring Typography components to use Title and Paragraph easily
const { Title, Paragraph } = Typography;

// Type definition for JobListCard component props
interface JobListCardProps {
  job: Job; 
  isSelected: boolean; // Whether the card is selected or not
  onClick: () => void; // Function to handle the click event
}

// JobListCard component, displaying individual job details in a card layout
const JobListCard: React.FC<JobListCardProps> = ({ job, onClick, isSelected }) => {
  const { token } = theme.useToken();
  const t = useI18n();
  // Dispatch hook to send actions to Redux store
  const dispatch = useDispatch();

  // Fetching jobs from the Redux store and finding the current job by its ID
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const currentJob = jobs.find((j) => j.id === job.id);
  const isFavorited = currentJob?.favorite || false;

  // Function to toggle the favorite status of the job when clicked
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the event from propagating to the parent element (card click)
    dispatch(toggleFavoriteAction(job.id)); // Dispatching the action to toggle the job's favorite status
  };

  // Conditional rendering of job status tag based on job status
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
      data-testid="job-card-" // Test ID for identifying the component in tests
      role="article" // Article semantic role for accessibility(For test)
      onClick={onClick} // Click handler for the card
      style={{
        borderRadius: "15px", 
        boxShadow: "3px 4px 9.9px 0px #A25C4526", 
        marginBottom: 20, 
        width: 320, 
        border: isSelected ? '2px solid #6EC3F5' : 'none', // Highlight the card if it's selected
        gap: "20px" 
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <Link 
          href={`/portal/trainee/jobs/${job.id}`} // Navigate to job details page when clicked
          onClick={(e) => e.stopPropagation()} // Prevent the event from triggering the parent card click
        >
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
            {job.title} {/* Display the job title */}
          </Title>
        </Link>
        
        <div 
          onClick={toggleFavorite} // Toggle favorite status when clicked
          style={{ cursor: "pointer" }} // Change cursor to pointer to indicate it's clickable
          data-testid="favorite-icon" // Used for testing purposes
        >
          {isFavorited ? (
            <HeartFilled style={{ color: "#f28c68", fontSize: "16px" }} /> // Filled heart if favorited
          ) : (
            <HeartOutlined style={{ color: "#f28c68", fontSize: "16px" }} /> // Outlined heart if not favorited
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
          <Timer publishedDate={job.publishedDate} /> 
        </Paragraph>
      </div>
    </Card>
  );
};

export default JobListCard; 