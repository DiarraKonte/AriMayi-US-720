"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { theme, Button, Card, Pagination, Input, Table, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import { Content } from "antd/lib/layout/layout";
import { SearchOutlined } from "@ant-design/icons";
import { getProjects } from "@/lib/features/project/projectsThunks";
import { TProject } from "@/app/@types/projects";
import { useI18n } from "../../../../../../../locales/client";
import "@/styles/admin.css";

const { Column } = Table;
const { Search } = Input;

export default function ProjectsListContainer() {
  const { useToken } = theme;
  const { token } = useToken();
  const router = useRouter();
  const t = useI18n();

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.projects,
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  // Gestion des couleurs des tags
  const getTagColor = (tag: string): string => {
    switch (tag) {
      case "Nouveau":
        return "#FFCC00";
      case "En cours":
        return "#F68A67";
      case "Validé":
        return "#34C759";
      case "Terminé":
        return "#34C759";
      case "Brouillon":
        return "#CCCCCC";
      default:
        return "#999999";
    }
  };

  // Pagination personnalisée
  const itemRender = (
    page: number,
    type: string,
    originalElement: React.ReactNode,
  ) => {
    if (type === "page") {
      return (
        <div
          style={{
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
          }}
        >
          {page}
        </div>
      );
    }
    return originalElement;
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
        {t("projectsList.title")}
      </Title>

      <Card
        style={{
          borderRadius: "15px",
          boxShadow: "3px 4px 9.9px 0px #A25C4526",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#F68A67",
              borderColor: "#F68A67",
              borderRadius: "4px",
              color: "#fff",
              width: "74px",
              marginRight: "10px",
            }}
          >
            {t("projectsList.filtersButton")}
          </Button>
          <Search
            placeholder={t("projectsList.searchPlaceholder")}
            style={{ flex: "1", marginBottom: "0" }}
            prefix={<SearchOutlined />}
            onSearch={(value) => console.log("Recherche : ", value)}
          />
        </div>

        <Table<TProject>
          dataSource={data}
          pagination={false}
          loading={loading}
          rowKey={(record) => record.id.toString()}
          locale={{
            emptyText: error ?? t("projectsList.table.emptyText"),
          }}
          onRow={(record) => ({
            onClick: () => {
              router.push(`/portal/admin/project/${record.id}`);
            },
            className: "clickable-row",
          })}
        >
          <Column
            title={t("projectsList.table.columns.title")}
            dataIndex="titled"
            key="titled"
            align="left"
          />
          <Column
            title={t("projectsList.table.columns.partner")}
            dataIndex="partner"
            key="partner"
            align="center"
          />
          <Column
            title={t("projectsList.table.columns.date")}
            dataIndex="date"
            key="date"
            align="center"
          />
          <Column
            title={t("projectsList.table.columns.trainee")}
            dataIndex="trainee"
            key="trainee"
            align="center"
          />
          <Column
            title={t("projectsList.table.columns.status")}
            dataIndex="tags"
            key="tags"
            align="center"
            render={(tags: string[]) => (
              <>
                {tags.map((tag) => (
                  <Tag color={getTagColor(tag)} key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
        </Table>
      </Card>

      <Pagination
        style={{ marginTop: "20px", marginBottom: "20px" }}
        align="center"
        defaultCurrent={1}
        total={data.length}
        itemRender={itemRender}
      />

      <Button
        type="dashed"
        style={{
          color: "#F68A67",
          backgroundColor: "rgba(244, 140, 107, 0.1)",
          borderColor: "#F68A67",
          borderRadius: "8px",
          fontWeight: "bold",
          width: "280px",
          height: "61px",
        }}
        onClick={() => console.log("Export en cours...")}
      >
        {t("projectsList.exportButton")}
      </Button>
    </Content>
  );
}
