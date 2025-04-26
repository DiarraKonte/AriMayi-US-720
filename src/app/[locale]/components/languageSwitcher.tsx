"use client";
import React from "react";
import { Dropdown, Menu, Space } from "antd";
import Flag from "react-world-flags";
import { useChangeLocale, useCurrentLocale } from "../../../../locales/client";
import { locales } from "@/config";

const flags = {
  en: "gb",
  fr: "fr",
};

export default function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const menu = (
    <Menu
      items={locales.map((loc) => ({
        key: loc,
        label: (
          <span
            onClick={() => changeLocale(loc)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            <Flag
              code={flags[loc]}
              style={{
                width: 20,
                height: 14,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            {loc.toUpperCase()}
          </span>
        ),
      }))}
    />
  );

  return (
    <Space wrap>
      <Dropdown overlay={menu} trigger={["hover"]}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <Flag
            code={flags[locale]}
            style={{
              width: 20,
              height: 14,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          {locale.toUpperCase()}
        </span>
      </Dropdown>
    </Space>
  );
}
