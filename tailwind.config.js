// const colorNames = ["white", "black", "grayLight", "grayLightRegular", "grayRegular", "grayLightDark", "grayDark", "blue", "blueRegular", "blueLight", "green", "greenRegular", "greenLight", "red", "redRegular", "redLight", "orange", "orangeRegular", "orangeLight"];

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./public/index.html", "./dist/index.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["NanumSquareNeo"]
      },
      fontSize: {
        "xs": ["0.75rem", "150%"],//12px
        "sm": ["0.875rem;", "150%"],//14px
        "base": ["1rem", "150%"],//16px
        "lg": ["1.125rem", "150%"],//18px
        "xl": ["1.25rem;", "150%"],//20px
        "2xl": ["1.5rem", "150%"],//24px
        "6xl": ["3.75rem", "100%"]//60px
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
      },
      animation: {
        knocking: 'knocking 0.8s ease-in-out infinite',
      },
      keyframes: {
        knocking: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotateX(0deg)'},
          '50%': { transform: 'translate(0px, 8px) rotateX(32deg)'},
        }
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-blueLight",
    "bg-greenLight",
    "bg-redLight",
    "bg-orangeLight"
  ],
}