"use client";
import { Row, Col, Card, Button, Spin } from "antd";
import Link from "next/link";
import { useI18n } from "../../../../../../../../locales/client";
import { useState, useEffect } from "react";

export default function ConfirmationPage() {
  const t = useI18n();
  const [localLoading, setLocalLoading] = useState(true);

  // Simulates a loading delay (e.g., for an API call)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalLoading(false); // Disables loading after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleans up timer on unmount
  }, []);

  if (localLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", display: "flex", padding: "20px" }}
    >
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card
          style={{
            backgroundColor: "rgba(235, 161, 136, 0.1)",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              color: "#e07a54",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {t("confirmationPage.successMessage")}
          </p>
        </Card>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Link href="/portal/trainee/jobs/list/job">
            <Button
              style={{
                flex: 1,
                background: "linear-gradient(135deg, #FB923C, #F97316)", // Gradient background
                color: "white",
                padding: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => console.log(t("confirmationPage.viewOtherOffers"))}
            >
              {t("confirmationPage.viewOtherOffers")}
            </Button>
          </Link>

          <Link href="/portal/trainee/jobs/dashboard">
            <Button
              style={{
                flex: 1,
                backgroundColor: "rgba(235, 161, 136, 0.1)",
                color: "#e07a54",
                padding: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => console.log(t("confirmationPage.returnHome"))}
            >
              {t("confirmationPage.returnHome")}
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
