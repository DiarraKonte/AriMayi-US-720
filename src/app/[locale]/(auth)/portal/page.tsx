import { Image, Space } from "antd";
import Title from "antd/es/typography/Title";
type Props = {
  params: { locale: string };
};

export default function Portal({ params: { locale } }: Props) {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: "flex", paddingTop: 15 }}
    >
      <Title level={3} style={{ padding: 5 }}>
        {" "}
        Work in progress
      </Title>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/images/comming-soon.png"
          width={500}
          height={500}
          alt="comming-soon"
        />
      </div>
    </Space>
  );
}
