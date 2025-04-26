"use client";
import { theme } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/lib/typography/Text";
import { Content } from "antd/lib/layout/layout";
import LogoIcon162 from "../../../../../public/svg/logo_162x152px.svg";
import LoginContainer from "../../(auth)/portal/admin/components/LoginContainer";

type Props = {
  params: { locale: string };
};

export default function LogIn({ params: { locale } }: Props) {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <main
      style={{
        height: "100vh",
        background: "#353535",
      }}
    >
      <Content
        style={{
          paddingTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LogoIcon162 />
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
            marginTop: "50px",
          }}
        >
          Connexion
        </Title>
        <Text
          style={{
            fontSize: "17px",
            fontWeight: "900",
            color: token.colorWhite,
          }}
        >
          Veuillez renseigner les champs suivants :
        </Text>
        <LoginContainer />
      </Content>
    </main>
  );
}
