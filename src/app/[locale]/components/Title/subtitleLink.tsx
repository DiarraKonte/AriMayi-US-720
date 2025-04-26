import { Color } from "antd/es/color-picker";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use } from "react";
import { useScopedI18n } from "../../../../../locales/client";

type SubtitleProps = {
  link: string;
  name: string;
};

const Subtitle: React.FC<SubtitleProps> = ({ link, name }) => {
  const params = useParams();
  const locale = params.locale as string;
  const t = useScopedI18n("link");

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        fontWeight: "600",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <p>{name}</p>
      <p style={{ color: "#F68A67" }}>-</p>
      <Link
        href={`/${locale}${link}`}
        style={{ textDecoration: "none", color: "#F68A67" }}
      >
        {t("seeAll")}
      </Link>
    </div>
  );
};

export default Subtitle;
