"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { theme, Button, Card, Row, Col, Space, Divider } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
import { getProjectDetails } from "@/lib/features/project/projectsThunks";
import { useI18n } from "../../../../../../../locales/client";

export default function ProjectsDetailContainer() {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();

  const dispatch = useDispatch<AppDispatch>();
  const { projectDetails } = useSelector((state: RootState) => state.projects);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getProjectDetails(Number(id)));
    }
  }, [id, dispatch]);

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
        {t("projectsDetails.projectTitle")}
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Row gutter={[8, 45]}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "15px",
                  boxShadow: "3px 4px 9.9px 0px #A25C4526",
                  width: "560px",
                }}
              >
                <Space
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Title
                    style={{
                      color: "white",
                      textAlign: "center",
                      paddingBottom: 5,
                      background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                      textTransform: "uppercase",
                      fontWeight: "950",
                      fontSize: "16px",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {t("projectsDetails.jobTitle")}
                  </Title>
                  <HeartOutlined
                    style={{ width: "24px", height: "24px", color: "#F68A67" }}
                  />
                </Space>
                <Space wrap>
                  <Text>{t("projectsDetails.company")}</Text>
                  <div
                    style={{
                      width: "9px",
                      height: "9px",
                      background:
                        "linear-gradient(252.28deg, #B163FF 0%, #816CFF 38.02%, #54E0E9 100%)",
                    }}
                  ></div>
                  <Text>{t("projectsDetails.address")}</Text>
                  <div
                    style={{
                      width: "9px",
                      height: "9px",
                      background:
                        "linear-gradient(252.28deg, #B163FF 0%, #816CFF 38.02%, #54E0E9 100%)",
                    }}
                  ></div>
                  <Text>{t("projectsDetails.date")}</Text>
                </Space>
                <Title
                  level={5}
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                    marginTop: "25px",
                  }}
                >
                  {t("projectsDetails.description")}
                </Title>
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {projectDetails?.description ?? "Description non disponible"}
                </Text>
                <Divider />
                <Title
                  level={5}
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {t("projectsDetails.technicalEnvironment")}
                </Title>
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {projectDetails?.requiredSkills ??
                    "Technical environnement missing"}
                </Text>
                <Divider />
                <Title
                  level={5}
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {t("projectsDetails.address")}
                </Title>
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  XXXX{" "}
                </Text>
                <br /> {/* To-do : Adress value */}
                <Card
                  style={{
                    width: 300,
                    height: 300,
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F3F3",
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                >
                  <div style={{ color: "#999" }}>
                    {t("projectsDetails.mapPlaceholder")}
                  </div>{" "}
                  {/* To-do : Add a map */}
                </Card>
                <Title
                  level={5}
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  Détails
                </Title>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#353535",
                  }}
                >
                  {" "}
                  Poste
                </Text>
                <br />
                <Text
                  style={{
                    fontSize: "10px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  Intitulé de poste
                </Text>
                <br /> {/* To-do : Job title value */}
                <Divider />
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#353535",
                  }}
                >
                  {" "}
                  Diplôme
                </Text>
                <br />
                <Text
                  style={{
                    fontSize: "10px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  {t("projectsDetails.degreeRequired")}
                </Text>
                <br /> {/* To-do : Degree required value */}
                <Divider />
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#353535",
                  }}
                >
                  {" "}
                  {t("projectsDetails.contractType")}
                </Text>
                <br />
                <Text
                  style={{
                    fontSize: "10px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  CDI/CDD
                </Text>
                <br /> {/* To-do : type of contract value */}
                <Divider />
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#353535",
                  }}
                >
                  {" "}
                  {t("projectsDetails.workOrganisation")}
                </Text>
                <br />
                <Text
                  style={{
                    fontSize: "10px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  Présentiel
                </Text>{" "}
                {/* To-do : Work organisation value */}
                <Divider />
                <Title
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {t("projectsDetails.advantages")}
                </Title>
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  XXXX{" "}
                </Text>
                <br /> {/* To-do : Advantages values */}
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  XXXX{" "}
                </Text>
                <br />
                <Divider />
                <Title
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {t("projectsDetails.additionalInfo")}
                </Title>
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  XXXX{" "}
                </Text>
                <br /> {/* To-do : Additional informations values */}
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#353535",
                  }}
                >
                  {" "}
                  XXXX{" "}
                </Text>
                <br />
              </Card>{" "}
              {/* End card Titled */}
            </Col>{" "}
            {/* End col card Titled */}
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
                  width: "560px",
                }}
              >
                <Title
                  style={{
                    color: "white",
                    textAlign: "center",
                    paddingBottom: 5,
                    background: "linear-gradient(90deg, #6EC3F5, #8A66F9)",
                    textTransform: "uppercase",
                    fontWeight: "950",
                    fontSize: "16px",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Statistique de l'offre
                </Title>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Title
                    style={{
                      fontSize: "12px",
                      color: "#353535",
                      fontWeight: "400",
                    }}
                  >
                    {t("projectsDetails.views", { count: 630 })}
                  </Title>{" "}
                  {/* To-do : Number of views of the project* */}
                  <Title
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#353535",
                      marginBottom: "20px",
                    }}
                  >
                    {t("projectsDetails.applications", { count: 13 })}
                  </Title>{" "}
                  {/* To-do : Number of applications of the project* */}
                  <Button
                    style={{
                      backgroundColor: "#F68A67",
                      borderColor: "#F68A67",
                      borderRadius: "8px",
                      color: "#fff",
                      fontWeight: "bold",
                      width: "200px",
                      height: "45px",
                      marginBottom: "40px",
                    }}
                  >
                    {t("projectsDetails.seeApplications")}
                  </Button>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Link href="/portal/admin/project/projects-qualify">
                    <Button
                      style={{
                        backgroundColor: "#F68A67",
                        borderColor: "#F68A67",
                        borderRadius: "8px",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "228px",
                        height: "61px",
                        marginBottom: "18px",
                      }}
                    >
                      {t("projectsDetails.qualifyProject")}
                    </Button>
                  </Link>
                  <Button
                    style={{
                      backgroundColor: "#F68A67",
                      borderColor: "#F68A67",
                      borderRadius: "8px",
                      color: "#fff",
                      fontWeight: "bold",
                      width: "228px",
                      height: "61px",
                      marginBottom: "18px",
                    }}
                  >
                    {t("projectsDetails.putOnHold")}
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#F68A67",
                      borderColor: "#F68A67",
                      borderRadius: "8px",
                      color: "#fff",
                      fontWeight: "bold",
                      width: "228px",
                      height: "61px",
                    }}
                  >
                    {t("projectsDetails.commercialFollowUp")}
                  </Button>
                </div>
              </Card>{" "}
              {/* End card Stats */}
            </Col>{" "}
            {/* End col card Stats */}
          </Row>{" "}
          {/* End row col 2 */}
        </Col>
        {/* End second column */}
      </Row>{" "}
    </Content>
  );
}
