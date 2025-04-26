"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import { ConfigProvider, Layout, Menu, Dropdown } from "antd";
import Link from "next/link";
import LogoIcon50 from "../../../public/svg/logo_50x50px.svg";
import LanguageSwitcher from "../[locale]/components/languageSwitcher";
import { useI18n } from "../../../locales/client";
import { selectToken, logout } from "@/lib/features/auth/authSlice";

const { Header } = Layout;

const items = [
  {
    key: "/portal/trainee/jobs/dashboard",
    label: (t: any) => (
      <Link href="/portal/trainee/jobs/dashboard" style={{ color: "inherit" }}>
        {t("navbar.home")}
      </Link>
    ),
  },
  {
    key: "/candidates",
    label: (t: any) => (
      <Link href="/" style={{ color: "inherit" }}>
        {t("navbar.candidates")}
      </Link>
    ),
  },
  {
    key: "/portal/admin/project/projects-list",
    label: (t: any) => (
      <Link
        href="/portal/admin/project/projects-list"
        style={{ color: "inherit" }}
      >
        {t("navbar.projects")}
      </Link>
    ),
  },
  {
    key: "/portal/trainee/jobs/resume",
    label: (t: any) => (
      <Link href="/portal/trainee/jobs/resume" style={{ color: "inherit" }}>
        {t("navbar.cv")}
      </Link>
    ),
  },
  {
    key: "/documents",
    label: (t: any) => (
      <Link href="/" style={{ color: "inherit" }}>
        {t("navbar.documents")}
      </Link>
    ),
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const t = useI18n();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const dropdownMenu = (
    <Menu
      items={[
        token
          ? {
              key: "logout",
              label: (
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  {t("navbar.logout")}
                </button>
              ),
            }
          : {
              key: "login",
              label: <Link href="/login">{t("navbar.login")}</Link>,
            },
      ]}
    />
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "#F68A67",
            itemSelectedColor: "white",
            itemHoverBg: "rgba(246, 138, 103, 0.1)",
            itemHoverColor: "#F68A67",
            horizontalItemSelectedColor: "white",
          },
          Button: {
            colorPrimary: "#F68A67",
          },
        },
        token: {
          colorPrimary: "#F68A67",
        },
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "#353535",
        }}
      >
        <Link href="#" style={{ color: "white" }}></Link>
        <Link
          href="/"
          style={{ color: "white", display: "flex", alignItems: "center" }}
        >
          <div style={{ paddingTop: "1.5rem" }}>
            <LogoIcon50 />
          </div>
        </Link>
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={items.map((item) => ({ ...item, label: item.label(t) }))}
          style={{
            flex: 1,
            background: "#353535",
            borderBottom: "none",
            color: "white",
            justifyContent: "center",
            fontWeight: "700",
          }}
        />
        <div style={{ display: "flex", gap: "1rem " }}>
          <Link href="#" style={{ color: "white" }}>
            <HeartOutlined />
          </Link>
          <Dropdown
            overlay={dropdownMenu}
            trigger={["hover"]}
            onVisibleChange={setDropdownVisible}
            visible={dropdownVisible}
          >
            <UserOutlined
              style={{ color: "white", fontSize: "16px", cursor: "pointer" }}
            />
          </Dropdown>
          <LanguageSwitcher />
        </div>
      </Header>
    </ConfigProvider>
  );
}
