"use client";
import ContactUs from "./components/contactUs";
import Link from "next/link";
import { theme } from "antd";
import NavBar from "../components/navBar";

export default function Home() {
  const { useToken } = theme;
  const { token } = useToken();
  return (
    <main
      style={{
        height: "100vh",
        background: "white",
      }}
    >
      <NavBar />
      <Link
        href="/portal"
        style={{ color: token.colorWhite, textDecoration: "none", padding: 2 }}
      >
        {" "}
        Portal
      </Link>
      <Link
        href="/login"
        target="_blank"
        style={{ color: token.colorWhite, textDecoration: "none", padding: 2 }}
      >
        {" "}
        Account
      </Link>
      <ContactUs />
    </main>
  );
}
