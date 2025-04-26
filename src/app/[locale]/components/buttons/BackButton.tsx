"use client";

import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";

/**
 * A button that navigates back to the previous page.
 */
export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      style={{
        position: "fixed",
        top: "3rem",
        left: "1.5rem",
        zIndex: 100,
        cursor: "pointer",
        alignItems: "center",
        gap: "8px",
        padding: "8px",
        background: "white",
        borderRadius: "10px",
        border: "2px solid #f5785a",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      <LeftOutlined style={{ color: "#f5785a", fontWeight: "900" }} />
    </Button>
  );
}
