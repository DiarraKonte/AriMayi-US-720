import { Color } from "antd/es/color-picker";
import React from "react";

type TitleProps = {
  balise: keyof JSX.IntrinsicElements;
  name: string;
};

const Title: React.FC<TitleProps> = ({ balise, name }) => {
  const Tag = balise;

  return (
    <Tag
      style={{
        fontFamily: "Inter, sans-serif", // Changé de Montserrat à Inter
        fontWeight: 1000, // Ajouté pour obtenir le style bold
        textTransform: "uppercase", // Ajouté pour les majuscules
        letterSpacing: "1px", // Ajouté pour l'espacement des lettres
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
        background:
          "linear-gradient(252.28deg, #B163FF 0%, #816CFF 38.02%, #54E0E9 100%)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        display: "inline-block",
      }}
    >
      {name}
    </Tag>
  );
};

export default Title;
