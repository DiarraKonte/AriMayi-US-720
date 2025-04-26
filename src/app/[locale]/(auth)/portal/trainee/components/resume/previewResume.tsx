import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { Button, Card, Col, Row, Alert } from "antd";
import Link from "next/link";
import { format } from "date-fns";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Content } from "antd/lib/layout/layout";
import { applyToJob } from "../../Slice/jobs/jobSlice";
import ApplyModal from "../Modals/applymodal";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useI18n } from "../../../../../../../../locales/client";
import { postApplication } from "../../Slice/jobs/jobThunks";
import { theme } from "antd";
import { useParams } from "next/navigation";
import { selectJobById } from "../../Slice/jobs/jobsSelectors";

// Functional component to preview the resume
export default function PreviewResume() {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();
  const dispatch = useDispatch<AppDispatch>();
  const { id: jobId } = useParams(); 

  // Retrieving the necessary data from the Redux store
  const job = useSelector((state: RootState) => selectJobById(Number(jobId))(state));
  const experiences = useSelector(
    (state: RootState) => state.resume.professionalExperience
  );
  const education = useSelector((state: RootState) => state.resume.schoolCareer);
  const skills = useSelector((state: RootState) => state.resume.skills);
  const hobbies = useSelector((state: RootState) => state.resume.leisure);
  const location = useSelector((state: RootState) => state.resume.locations);

  const isFormValid = () => {
    return (
      experiences.length > 0 && // Checking if the experience is not empty
      education.length > 0 && // Checking if the education is not empty
      skills.length > 0 && // Checking if the skills is not empty
      !!location // Checking if the location is not empty
    );
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "";  // Retourne une chaîne vide si la date est invalide
    }
    return format(parsedDate, "MMMM yyyy");
  };

  // Function to handle the validation of the resume
  //called in appllymodal.tsx
  //TODO : need to be match with upcoming endpoint cause it don't work at the moment
  const handleApplyJob= () => {
    if (jobId && job) {
      dispatch(applyToJob(Number(jobId))); // local update
      dispatch(postApplication(job)); 
    } else {
      console.error("Job non trouvé pour l'ID:", jobId);
    }
  };

  // Styling
  const cardStyle = {
    borderRadius: "15px",
    boxShadow: "3px 4px 9.9px 0px #A25C4526",
    marginBottom: "15px",
    height: "auto",
    minHeight: "150px",
  };

  return (
    <Content
      style={{
        paddingTop: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "15%",
        paddingRight: "15%",
      }}
    >
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
        {t("Resume.preview")}
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <Card style={cardStyle}>
                <Title
                  style={{
                    color: "white",
                    textAlign: "center",
                    paddingBottom: 5,
                    background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                    textTransform: "uppercase",
                    fontWeight: 950,
                    fontSize: "16px",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("Experienceform.professional_experience")}
                </Title>
                {experiences.length > 0 ? (
                  experiences.map((exp, index) => (
                    <div
                      key={index}
                      data-testid={`experience-${exp.id}`} // Test ID for the experience
                      style={{ marginBottom: "20px" }}
                    >
                      <ul
                        style={{ listStyleType: "disc", paddingLeft: "20px" }}
                      >
                        <li>
                          <Text strong>{t("Experienceform.title")}</Text>
                        </li>
                        <Text>{exp.position}</Text>
                        <li>
                          <Text strong>{t("Experienceform.company")}</Text>
                        </li>
                        <Text>{exp.company}</Text>
                        <li>
                          <Text strong>{t("Experienceform.sector")}</Text>
                        </li>
                        <Text>{exp.sector}</Text>
                        <li>
                          <Text strong>{t("Experienceform.location")}</Text>
                        </li>
                        <Text>{exp.place}</Text>
                        <li>
                          <Text strong>{t("Experienceform.description")}</Text>
                        </li>
                        <Text>{exp.description || t("Experienceform.no_description")}</Text>
                        <li>
                          <Text strong>{t("Experienceform.date")}</Text>
                        </li>
                        <Text>
                      {exp.start_date && formatDate(exp.start_date)} -{" "}
                      {exp.end_date ? formatDate(exp.end_date) : "Présent"}
                    </Text>
                    </ul>
                    </div>
                  ))
                ) : (
                  <Text>{t("Resume.no_experience")}</Text>
                )}
              </Card>
              {!isFormValid() && !experiences.length && (
                <Alert
                  message={t("Resume.add_experience")}
                  type="info"
                  showIcon
                  icon={
                    <ExclamationCircleOutlined style={{ color: "#1890ff" }} />
                  }
                  style={{
                    backgroundColor: "white",
                    borderColor: "#1890ff",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              )}
            </Col>
            <Col span={24}>
              <Card style={cardStyle}>
                <Title
                  style={{
                    color: "white",
                    textAlign: "center",
                    paddingBottom: 5,
                    background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                    textTransform: "uppercase",
                    fontWeight: 950,
                    fontSize: "16px",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("Resume.education")}
                </Title>
                {education.length > 0 ? (
                  education.map((edu, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                      <ul
                        style={{ listStyleType: "disc", paddingLeft: "20px" }}
                      >
                        <li>
                          <Text strong>{t("educationForm.degreeLevel")}</Text>
                        </li>
                        <Text>{edu.degree}</Text>
                        <li>
                          <Text strong>{t("educationForm.programName")}</Text>
                        </li>
                        <Text>{edu.programstudy}</Text>
                        <li>
                          <Text strong>{t("educationForm.institution")}</Text>
                        </li>
                        <Text>{edu.school}</Text>
                        <li>
                          <Text strong>{t("educationForm.Date")}</Text>
                        </li>
                        <Text>
                          {edu.start_date
                            ? format(new Date(edu.start_date), "MMMM yyyy")
                            : t("educationForm.no_start_date")}{" "}
                          -{" "}
                          {edu.end_date
                            ? format(new Date(edu.end_date), "MMMM yyyy")
                            : t("educationForm.no_end_date")}
                        </Text>
                      </ul>
                    </div>
                  ))
                ) : (
                  <Text>{t("Resume.no_education")}</Text>
                )}
              </Card>
              {!isFormValid() && !education.length && (
                <Alert
                  message={t("Resume.add_education")}
                  type="info"
                  showIcon
                  icon={
                    <ExclamationCircleOutlined style={{ color: "#1890ff" }} />
                  }
                  style={{
                    backgroundColor: "white",
                    borderColor: "#1890ff",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <Card style={cardStyle}>
                <Title
                  style={{
                    color: "white",
                    textAlign: "center",
                    paddingBottom: 5,
                    background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                    textTransform: "uppercase",
                    fontWeight: 950,
                    fontSize: "16px",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("Resume.skills")}
                </Title>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <Text
                        strong
                        key={index}
                        data-testid={`skill-${skill.id}`}
                        style={{
                          display: "inline-block",
                          padding: "8px 12px",
                          margin: "5px",
                          borderRadius: "15px",
                          fontSize: "16px",
                          fontWeight: "600",
                          textAlign: "center",
                          boxShadow: "3px 4px 9.9px 5px #A25C4526",
                        }}
                      >
                        {skill.name} ({skill.level} - {skill.category})
                      </Text>
                    ))
                  ) : (
                    <Text>{t("Resume.no_skills")}</Text>
                  )}
                </div>
              </Card>
              {!isFormValid() && !skills.length && (
                <Alert
                  message={t("Resume.add_skill")}
                  type="info"
                  showIcon
                  icon={
                    <ExclamationCircleOutlined style={{ color: "#1890ff" }} />
                  }
                  style={{
                    backgroundColor: "white",
                    borderColor: "#1890ff",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              )}
            </Col>
            <Col span={24}>
              <Card style={cardStyle}>
                <Title
                  style={{
                    color: "white",
                    textAlign: "center",
                    paddingBottom: 5,
                    background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                    textTransform: "uppercase",
                    fontWeight: 950,
                    fontSize: "16px",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("Resume.hobbies")}
                </Title>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {hobbies.length > 0 ? (
                    hobbies.map((hobby, index) => (
                      <Text
                        key={index}
                        style={{
                          display: "inline-block",
                          padding: "8px 12px",
                          margin: "5px",
                          borderRadius: "15px",
                          fontSize: "16px",
                          fontWeight: "600",
                          textAlign: "center",
                          boxShadow: "3px 4px 9.9px 5px #A25C4526",
                        }}
                      >
                        {hobby.name}
                      </Text>
                    ))
                  ) : (
                    <Text>{t("Resume.no_hobbies")}</Text>
                  )}
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card style={cardStyle}>
                <Title
                  style={{
                    color: "white",
                    textAlign: "center",
                    paddingBottom: 5,
                    background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                    textTransform: "uppercase",
                    fontWeight: 950,
                    fontSize: "16px",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("Resume.location")}
                </Title>
                {Array.isArray(location) && location.length > 0 ? (
                  <div>
                    {location.map((loc) => (
                      <Text key={loc.id}>{`${loc.city}, ${loc.country}`}</Text>
                    ))}
                  </div>
                ) : (
                  <Text>{t("Resume.no_location")}</Text>
                )}
              </Card>
              {!isFormValid() && !location && (
                <Alert
                  message={t("Resume.add_location")}
                  type="info"
                  showIcon
                  icon={
                    <ExclamationCircleOutlined style={{ color: "#1890ff" }} />
                  }
                  style={{
                    backgroundColor: "white",
                    borderColor: "#1890ff",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "30px", marginBottom: "30px" }}>
        {/* Modal Button */}
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <ApplyModal onValidate={handleApplyJob} disabled={!isFormValid()} />{/*onvalidate will be called in applymodal.tsx*/}
        </Col>

        {/* Modify Resume Button */}
        <Col
          xs={24}
          md={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Link href={`/portal/trainee/jobs/${job?.id}/resume`}>
            <Button
              type="dashed"
              style={{
                color: "#F68A67",
                backgroundColor: "rgba(244, 140, 107, 0.1)",
                borderRadius: "8px",
                fontWeight: "bold",
                width: "200px",
                height: "50px",
                fontSize: "18px",
                padding: "0 30px",
                marginLeft: "10px",
              }}
            >
              {t("Resume.modifyresume")}
            </Button>
          </Link>
        </Col>
      </Row>
    </Content>
  );
}