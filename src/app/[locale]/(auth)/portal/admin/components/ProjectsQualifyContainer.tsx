"use client";
import React, { useState } from "react";
import { Card, Button, theme, Col, Row, Form, Input, Modal } from "antd";
import Title from "antd/lib/typography/Title";
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
import { useI18n } from "../../../../../../../locales/client";
const { TextArea } = Input;

export default function ProjectsQualifyContainer() {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleQualifyProject = () => {
    showModal();
  };

  return (
    <Content
      style={{
        paddingTop: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        {t("projectsQualify.title")}
      </Title>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // borderRadius: "15px",
          boxShadow: "3px 4px 9.9px 0px #A25C4526",
          padding: "20px",
          width: "80%",
        }}
      >
        <Title
          style={{
            color: "#353535",
            textAlign: "center",
            fontSize: "15px",
            marginBottom: "20px",
          }}
        >
          {t("projectsQualify.cardTitle")}
        </Title>
        <Form
          name="education"
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Form.Item name="name">
            <Input
              placeholder={t("projectsQualify.placeholders.companyName")}
            />
          </Form.Item>
          <Form.Item name="adresse">
            <Input placeholder={t("projectsQualify.placeholders.address")} />
          </Form.Item>
          <Form.Item name="date">
            <Input
              placeholder={t("projectsQualify.placeholders.startDate")}
              style={{ resize: "none" }}
            />
          </Form.Item>
          <Form.Item name="descriptionJob">
            <TextArea
              placeholder={t("projectsQualify.placeholders.jobDescription")}
              style={{ resize: "none" }}
            />
          </Form.Item>
          <Form.Item name="tech">
            <TextArea
              placeholder={t(
                "projectsQualify.placeholders.technicalEnvironment",
              )}
              style={{ resize: "none" }}
            />
          </Form.Item>
          <Form.Item name="informations">
            <TextArea
              placeholder={t(
                "projectsQualify.placeholders.additionalInformation",
              )}
              style={{ resize: "none" }}
            />
          </Form.Item>
        </Form>{" "}
      </Card>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col>
          <Link href="#">
            <Button
              style={{
                backgroundColor: "#F68A67",
                borderColor: "#F68A67",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: "bold",
                width: "228px",
                height: "61px",
                marginBottom: "20px",
                marginRight: "40px",
              }}
              onClick={handleQualifyProject}
            >
              {t("projectsQualify.buttons.validateProject")}
            </Button>
          </Link>
          <Button
            type="dashed"
            style={{
              color: "#F68A67",
              backgroundColor: "rgba(244, 140, 107, 0.1)",
              borderRadius: "8px",
              fontWeight: "bold",
              width: "280px",
              height: "61px",
            }}
          >
            {t("projectsQualify.buttons.saveDraft")}
          </Button>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            centered={false}
            width="100vw"
            style={{
              top: 0,
              left: 0,
              margin: 0,
              padding: 0,
              height: "100vh",
              width: "100vw",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                type="dashed"
                style={{
                  color: "#F68A67",
                  backgroundColor: "rgba(244, 140, 107, 0.1)",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  width: "280px",
                  height: "61px",
                }}
              >
                {t("projectsQualify.buttons.projectQualified")}
              </Button>
              <Link href="/portal/admin/project/projects-list">
                <Button
                  style={{
                    backgroundColor: "#F68A67",
                    borderColor: "#F68A67",
                    borderRadius: "8px",
                    color: "#fff",
                    fontWeight: "bold",
                    width: "228px",
                    height: "61px",
                    marginTop: "20px",
                  }}
                >
                  {t("projectsQualify.buttons.backToList")}
                </Button>
              </Link>
            </div>
          </Modal>
        </Col>
      </Row>
    </Content>
  );
}
