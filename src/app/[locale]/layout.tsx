import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { theme } from "@/styles/theme";
import "antd/dist/reset.css";
import { I18nProviderClient } from "../../../locales/client";
import { ReactElement } from "react";
import { StoreProvider } from "../storeProvider";
import Locale from "intl-locale-textinfo-polyfill";

export const metadata: Metadata = {
  title: "AriMayi",
  description: "L'expérience concrète par la formation",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
      },
    ],
  },
  other: {
    canonical: "https://www.arimayi.io",
  },
  keywords: ["formation", "expérience", "éducation", "AriMayi"],
  openGraph: {
    title: "AriMayi",
    description: "L'expérience concrète par la formation",
    url: "https://www.arimayi.io",
    siteName: "AriMayi",
    images: [
      {
        url: "/og-cover-image.png",
        width: 1200,
        height: 630,
        alt: "AriMayi - L'expérience concrète par la formation",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactElement;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { direction: dir } = new Locale(locale).textInfo;

  return (
    <html lang={locale} dir={dir}>
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <I18nProviderClient locale={locale}>
            <AntdRegistry>
              <ConfigProvider theme={theme}>{children}</ConfigProvider>
            </AntdRegistry>
          </I18nProviderClient>
        </StoreProvider>
      </body>
    </html>
  );
}
