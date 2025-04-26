"use client";
import { Card, theme, Row, Col } from "antd";
import { FolderOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
import { useI18n } from "../../../../../../../locales/client";

export default function AdminHomeContainer() {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();

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
        {t("adminHome.greeting")}
      </Title>
      <Title
        style={{
          color: token.colorWhite,
          textAlign: "left",
          paddingBottom: 5,
          background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
          textTransform: "uppercase",
          fontWeight: "950",
          fontSize: "16px",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "50px",
        }}
      >
        {t("adminHome.counters")}
      </Title>
      <Row gutter={[45, 16]}>
        <Col xs={24} md={12}>
          <Row gutter={[8, 45]}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "226px",
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
                  {t("adminHome.partnerCounters")}{" "}
                  {/* To-do : Counter partner values */}
                </Title>
                <div>
                  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.available")}
                      </Text>
                    </li>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.reserved")}
                      </Text>
                    </li>
                    <li style={{ marginBottom: "20px" }}>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.pending")}
                      </Text>
                    </li>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.total")}
                      </Text>
                    </li>
                  </ul>
                </div>
              </Card>{" "}
              {/* End card Count Partner */}
            </Col>{" "}
            {/* End col card Count Partner */}
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "226px",
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
                  {t("adminHome.traineeCounters")}{" "}
                  {/* To-do : Counter trainee values */}
                </Title>
                <div>
                  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.available")}
                      </Text>
                    </li>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.reserved")}
                      </Text>
                    </li>
                    <li style={{ marginBottom: "20px" }}>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.pending")}
                      </Text>
                    </li>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.total")}
                      </Text>
                    </li>
                  </ul>
                </div>
              </Card>{" "}
              {/* End card Count Trainee */}
            </Col>{" "}
            {/* End col card Count Trainee */}
          </Row>{" "}
          {/* End row col 1 */}
        </Col>{" "}
        {/* End first column */}
        <Col xs={24} md={12}>
          <Row gutter={[8, 45]}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "226px",
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
                  {t("adminHome.jobOffersCounters")}{" "}
                  {/* To-do : Counter job offers values */}
                </Title>
                <div>
                  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.available")}
                      </Text>
                    </li>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.reserved")}
                      </Text>
                    </li>
                    <li style={{ marginBottom: "20px" }}>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.pending")}
                      </Text>
                    </li>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.total")}
                      </Text>
                    </li>
                  </ul>
                </div>
              </Card>{" "}
              {/* End card Count Jobs */}
            </Col>{" "}
            {/* End col card Count Jobs */}
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "226px",
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
                  {t("adminHome.projectCounters")}{" "}
                  {/* To-do : Counter project values */}
                </Title>
                <div>
                  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.available")}
                      </Text>
                    </li>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.reserved")}
                      </Text>
                    </li>
                    <li style={{ marginBottom: "20px" }}>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.pending")}
                      </Text>
                    </li>
                    <li>
                      <Text style={{ fontSize: "12px", fontWeight: "400" }}>
                        {t("adminHome.total")}
                      </Text>
                    </li>
                  </ul>
                </div>
              </Card>{" "}
              {/* End card Count Projects */}
            </Col>{" "}
            {/* End col card Count Projects */}
          </Row>{" "}
          {/* End row col 2 */}
        </Col>
        {/* End second column */}
      </Row>{" "}
      {/* End row all*/}
      <Title
        style={{
          color: token.colorWhite,
          textAlign: "center",
          paddingBottom: 5,
          background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
          textTransform: "uppercase",
          fontWeight: "950",
          fontSize: "16px",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        {t("adminHome.tables")}
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "100px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FolderOutlined
                    style={{ fontSize: "34px", color: "#F68A67" }}
                  />
                  <Text
                    style={{
                      color: "#353535",
                      textAlign: "center",
                      fontSize: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    {t("adminHome.traineeTable")}
                  </Text>
                </div>
              </Card>{" "}
              {/* End card Table trainee */}
            </Col>{" "}
            {/* End col card Table trainee */}
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "100px",
                }}
              >
                <Link href="/portal/admin/project/projects-list">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <FolderOutlined
                      style={{ fontSize: "34px", color: "#F68A67" }}
                    />
                    <Text
                      style={{
                        color: "#353535",
                        textAlign: "center",
                        fontSize: "12px",
                        marginBottom: "20px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("adminHome.projectTable")}
                    </Text>
                  </div>
                </Link>
              </Card>{" "}
              {/* End card Table projects */}
            </Col>{" "}
            {/* End col card Table projects */}
          </Row>{" "}
          {/* End row col 1 */}
        </Col>{" "}
        {/* End first column */}
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "100px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FolderOutlined
                    style={{ fontSize: "34px", color: "#F68A67" }}
                  />
                  <Text
                    style={{
                      color: "#353535",
                      textAlign: "center",
                      fontSize: "12px",
                      marginTop: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("adminHome.partnerTable")}
                  </Text>
                </div>
              </Card>
              {/* End card Table partner */}
            </Col>{" "}
            {/* End col card Table partner */}
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  height: "100px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FolderOutlined
                    style={{ fontSize: "34px", color: "#F68A67" }}
                  />
                  <Text
                    style={{
                      color: "#353535",
                      textAlign: "center",
                      fontSize: "12px",
                      marginBottom: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("adminHome.jobOffersTable")}
                  </Text>
                </div>
              </Card>{" "}
              {/* End card Table jobs */}
            </Col>{" "}
            {/* End col card Table jobs */}
          </Row>{" "}
          {/* End row col 2 */}
        </Col>
        {/* End second column */}
      </Row>{" "}
      {/* End row all*/}
    </Content>
  );
}
