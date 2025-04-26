"use client";
import { useDispatch, useSelector } from "react-redux";
import { theme, Button, Form, Input, Typography, Layout } from "antd";
import { loginUser } from "@/lib/features/auth/authThunks";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Text } = Typography;
const { Content } = Layout;

export default function LoginContainer() {
  const { useToken } = theme;
  const { token: themeToken } = useToken();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [form] = Form.useForm();

  const entireState = useSelector((state: RootState) => state);
  console.log("Contenu complet du store:", entireState);

  const authState = useSelector((state: RootState) => state.auth);
  console.log("Contenu du auth store:", authState);

  const handleSubmit = (values: { username: string; password: string }) => {
    console.log("État du store AVANT login:", entireState);

    dispatch(loginUser(values)).then((result) => {
      setTimeout(() => {
        console.log("État du store APRÈS login:", entireState);
        console.log("État de auth APRÈS login:", authState);
      }, 100);
      router.push("/portal/admin");
    });
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
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Veuillez entrer votre identifiant" },
          ]}
        >
          <Input placeholder="Identifiant" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Veuillez entrer votre mot de passe" },
          ]}
        >
          <Input.Password placeholder="Mot de passe" />
        </Form.Item>
        <Link href="#" style={{ marginBottom: "10px" }}>
          <Text style={{ color: themeToken.colorWhite }}>
            Mot de passe oublié ?
          </Text>
        </Link>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{
            backgroundColor: "#F68A67",
            borderColor: "#F68A67",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            width: "285px",
            height: "61px",
          }}
        >
          Je me connecte
        </Button>
      </Form>
      {error && (
        <Text style={{ color: "red", marginTop: "10px" }}>{error}</Text>
      )}
    </Content>
  );
}