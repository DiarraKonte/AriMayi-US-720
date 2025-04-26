import { useParams } from "next/navigation";
import { Typography, Card, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Link from "next/link"; // Import Link for client-side navigation
import { useI18n } from "../../../../../../../../locales/client";
import { Job } from "../../Slice/jobs/jobInterfaces";

// Define the ApplyFormProps interface to specify the job prop type
interface ApplyFormProps {
  job: Job;
}

const { Title } = Typography;

const ApplyForm: React.FC<ApplyFormProps> = ({ job }) => {
  // Retrieve parameters using useParams
  const params = useParams();
  const id = params.id; // Extract the job ID from the URL
  const t = useI18n(); // Localization function

  return (
    <Card
      variant="outlined"
      style={{
        width: "100%",
        maxWidth: 600,
        padding: 24,
        borderRadius: 12,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Gradient-styled title */}
      <Title
        level={4}
        style={{
          textAlign: "center",
          background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}
      >
        {t("JobDetails.OfferCandidacy")}
      </Title>

      {/* Button to redirect to resume import page */}
      <Link href={`/portal/trainee/jobs/${id}/resume/import`}>
        <Button
          type="dashed"
          icon={<UploadOutlined />}
          style={{
            display: "block",
            margin: "20px auto",
            color: "#F68A67",
            border: "2px dashed #F68A67",
            backgroundColor: "rgba(246, 138, 103, 0.1)",
            fontWeight: "bold",
          }}
        >
          {t("JobDetails.cvdownload")}
        </Button>
      </Link>
    </Card>
  );
};

export default ApplyForm;
