import { Button, Card, Col, Form, Input, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { PhoneFilled, MailFilled, EnvironmentFilled } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { theme } from "antd";
export default function ContactUs() {
  const { useToken } = theme;
  const { token } = useToken();
  return (
    <Content style={{ paddingTop: 15 }}>
      <Title
        style={{
          color: token.colorWhite,
          textAlign: "center",
          paddingBottom: 5,
        }}
      >
        Contact Us
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
            <Title level={2}>Send Message</Title>
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
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input placeholder="Enter a valid email adress" />
              </Form.Item>
              <Form.Item name="message" rules={[{ required: true }]}>
                <TextArea
                  rows={4}
                  placeholder="Enter your message"
                  maxLength={6}
                />
              </Form.Item>
              <Form.Item label="">
                <Button
                  htmlType="submit"
                  style={{ width: "70%" }}
                  type={"primary"}
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
              <EnvironmentFilled /> Adress
            </Title>
            <Text>Paris, France</Text>
            <Title level={4}>
              {" "}
              <PhoneFilled /> Phone
            </Title>
            <Text>(+yy) xxx-yyy-zzz</Text>
            <Title level={4}>
              <MailFilled /> Email
            </Title>
            <Text>contact@arimayi.fr</Text>
          </Card>
        </Col>
      </Row>
    </Content>
  );
}
