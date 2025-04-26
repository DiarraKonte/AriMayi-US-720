import { Button, Card, Col, Form, Input, message, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { PhoneFilled, MailFilled, EnvironmentFilled } from "@ant-design/icons";
import { useI18n, useScopedI18n } from "../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { postContact } from "@/lib/features/contact/contactThunks";
import { useContact } from "@/lib/features/contact/contactSelectors";
import { useEffect, useState } from "react";
import { theme } from "antd";

export default function ContactUs() {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();
  const scopedEnter = useScopedI18n("enter");
  const scopedInput = useScopedI18n("input");
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const { isLoading, contactResponse } = useContact();
  const [values, setValues] = useState({
    name: "",
    email: "",
    msg: "",
  });

  useEffect(() => {
    if (isLoading == false)
      messageApi.open({
        key,
        type: "success",
        content: contactResponse,
      });
  }, [isLoading, contactResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const sendMessage = async () => {
    await dispatch(postContact({ values }));
  };

  return (
    <>
      {contextHolder}
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", paddingTop: 15 }}
      >
        <Title
          style={{
            color: token.colorWhite,
            textAlign: "center",
            paddingBottom: 5,
          }}
        >
          {t("contactUs")}
        </Title>
        <Row>
          <Col
            xs={{ flex: "100%" }}
            sm={{ flex: "100%" }}
            md={{ flex: "60%" }}
            lg={{ flex: "60%" }}
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            <Card bordered={false} style={{ width: "80%" }}>
              <Title level={2}>{t("sendMessage")}</Title>
              <Form
                name="wrap"
                labelCol={{ flex: "110px" }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600 }}
              >
                <Form.Item name="username" rules={[{ required: true }]}>
                  <Input
                    placeholder={scopedEnter("yourName")}
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: scopedInput("notValid"),
                    },
                    {
                      required: true,
                      message: scopedInput("email"),
                    },
                  ]}
                >
                  <Input
                    placeholder={scopedEnter("email")}
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </Form.Item>
                <Form.Item name="message" rules={[{ required: true }]}>
                  <Input
                    name="msg"
                    placeholder={scopedEnter("message")}
                    maxLength={6}
                    onChange={handleChange}
                    value={values.msg}
                  />
                </Form.Item>
                <Form.Item label="">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "70%" }}
                    onClick={sendMessage}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col
            xs={{ flex: "100%" }}
            sm={{ flex: "100%" }}
            md={{ flex: "40%" }}
            lg={{ flex: "40%" }}
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            <Card bordered={false} style={{ width: "80%" }}>
              <Title level={4}>
                <EnvironmentFilled /> {t("adress")}
              </Title>
              <Text>Paris, France</Text>
              <Title level={4}>
                {" "}
                <PhoneFilled /> {t("phone")}
              </Title>
              <Text>(+33) 666666666</Text>
              <Title level={4}>
                <MailFilled /> {t("email")}
              </Title>
              <Text>contact@arimayi.io</Text>
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
}
