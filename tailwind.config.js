/** @type {import("tailwindcss").Config} */
module.exports = {
  prefix: "km-",
  important: true,
  content: ["./dist/*.{js,ts}"],
  theme: {
    extend: {
      maxWidth: {
        "360px": "360px",//22.5rem
        "full-44px": "calc(100% - 44px)"//2.75rem
      },
      minWidth: {
        "32px": "32px",//2rem
        "36px": "36px",//2.25rem
      },
      height: {
        "60px": "60px",//3.75rem
        "140px": "140px",//8.75rem
      },
      minHeight: {
        "32px": "32px",
        "36px": "36px",
      },
      fontFamily: {
        sans: ["NanumSquareNeo"]
      },
      fontSize: {
        "2xs": ["10px", "150%"],//0.625rem
        "xs": ["12px", "150%"],//0.75rem
        "sm": ["14px", "150%"],//0.875rem
        "base": ["16px", "150%"],//1rem
        "lg": ["18px", "150%"],//1.125rem
        "xl": ["20px", "150%"],//1.25rem
        "2xl": ["24px", "150%"],//1.5rem
        "6xl": ["60px", "100%"]//3.75rem
      },
      colors: {
        "white": "#FFFFFF",
        "black": "#121212", 
        "grayLight": "#F8F8F8",
        "grayLightRegular": "#F3F3F3",
        "grayRegular": "#E7E7E7",
        "grayLightDark": "#E0E0E0",
        "grayDark": "#888888",
        "blue": "#066CFA",
        "blueDark": "#0659FA",
        "blueRegular": "#CDE2FE",
        "blueLight": "#E6F0FF",
        "green": "#2DC653",
        "greenRegular": "#D5F4DD",
        "greenLight": "#EAF9EE",
        "red": "#EF233C",
        "redRegular": "#FCD3D8",
        "redLight": "#FEF4F5",
        "orange": "#FF8000",
        "orangeRegular": "#FFE6CC",
        "orangeLight": "#FFF2E5",
      }
    },
    spacing: {
      "1": "4px",
      "2": "8px",
      "2.5": "10px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "7": "28px",
      "8": "32px",
      "9": "36px",
      "10": "40px",
      "11": "44px",
      "12": "48px",
    },
    borderRadius: {
      "none": "0px",
      DEFAULT: "4px",
      "lg": "8px",
      "2xl": "16px",
      "full": "9999px",
    }
  },
  plugins: [],
  safelist: [
    "km-bg-blueLight",
    "km-bg-greenLight",
    "km-bg-redLight",
    "km-bg-orangeLight"
  ],
}