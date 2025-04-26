import { Montserrat, Open_Sans } from "next/font/google";

// Fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

// Colors
const primaryColor = "#F68a67"; // orange
const secondaryColor = "#FFECDF"; // peach
const purpleColor = "#816CFF";
const lightPurpleColor = "#B163FF";
const turquoiseColor = "#54E0E9";
const lightGrey = "#C7C7C7";
const darkGrey = "#888";
const darkColor = "#353535";
const blackColor = "#000";
const whiteColor = "#fff";

const gradients = {
  primary: `linear-gradient(252.28deg, ${lightPurpleColor} 0%, ${purpleColor} 38.02%, ${turquoiseColor} 100%)`,
};

export const theme = {
  token: {
    // Fonts settings
    fontFamily: `${montserrat.style.fontFamily}, ${openSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,

    // Colors assignments
    colorPrimary: primaryColor,
    colorSecondary: secondaryColor,
    colorText: darkColor,
    colorWhite: whiteColor,
    colorNeutral: purpleColor,
    colorBg: whiteColor,
    colorTurquoise: turquoiseColor,
    colorPurple: purpleColor,
  },
  components: {
    Card: {
      borderRadius: 15,
      boxShadow: "0 2px 4px #A25C4526",
    },
    Input: {
      colorPrimary: blackColor,
      hoverBorderColor: blackColor,
      borderRadius: 8,
      colorTextPlaceholder: darkGrey,
      algorithm: true, // Enable algorithm
    },
    Menu: {
      background: darkColor,
      itemColor: whiteColor,
      itemSelectedColor: primaryColor,
    },
    Modal: {
      contentBg: "#fff",
      headerBg: "transparent",
      padding: 32,
      paddingContentHorizontalLG: 32,
      paddingContentVerticalLG: 32,
      borderRadiusLG: 12,
      boxShadow: "none",
      colorBgMask: "rgba(255, 255, 255, 0.85)",
    },
  },
};
