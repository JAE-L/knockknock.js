/** @type {import("tailwindcss").Config} */
module.exports = {
  prefix: "km-",
  important: true,
  content: ["./dist/*.{js,ts}"],
  theme: {
    fontFamily: {
      'nanumFont': ["NanumSquareNeo"]
    },
    extend: {
      maxWidth: {
        "360px": "360px",//22.5rem
      },
      height: {
        "120px": "120px",//7.5rem
      },
      minHeight: {
        "56px": "56px",
      },
      fontSize: {
        "2xs": ["10px", "160%"],//0.625rem
        "xs": ["12px", "160%"],//0.75rem
        "sm": ["14px", "160%"],//0.875rem
        "base": ["16px", "160%"],//1rem
        "lg": ["18px", "160%"],//1.125rem
        "xl": ["20px", "160%"],//1.25rem
        "2xl": ["24px", "160%"],//1.5rem
        "6xl": ["60px", "100%"]//3.75rem
      },
      colors: {
        "white": "#FFFFFF",
        "black": "#121212", 
        "blue": "#066CFA",
        "blueDark": "#0659FA",
        "blueRegular": "#CDE2FE",
        "blueLight": "#E6F0FF",
        "green": "#2DC653",
        "greenDark": "#2ABC4F",
        "greenRegular": "#D5F4DD",
        "greenLight": "#EAF9EE",
        "red": "#EF233C",
        "redDark": "#E4223A",
        "redRegular": "#FCD3D8",
        "redLight": "#FEF4F5",
        "orange": "#FF8000",
        "orangeDark": "#F57B00",
        "orangeRegular": "#FFE6CC",
        "orangeLight": "#FFF2E5"
      },
      keyframes: {
        "fadeInTop": {
          "0%": {
            opacity: "0.6",
            transform: "translateY(8px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fadeInDown": {
          "0%": {
            opacity: "0.6",
            transform: "translateY(-8px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "blurOpacity": {
          "0%": {
            backgroundColor: "transparent",
            backdropFilter: "blur(0);"
          },
          "100%": {
            backgroundColor: "rgba(100, 116, 139, 0.15);",
            backdropFilter: "blur(8px);"
          }
        },
        "knocking": {
          "0%": {
            transform: "translate3d(0, 0, 1000px) rotateX(6deg) rotateY(0deg) rotateZ(-2deg)"
          },
          "30%": {
            transform: "translate3d(0, -2px, 1000px) rotateX(28deg) rotateY(12deg) rotateZ(-10deg)"
          },
          "50%": {
            transform: "translate3d(0, -1px, 1000px) rotateX(14deg) rotateY(6deg) rotateZ(-4deg)"
          },
          "70%": {
            transform: "translate3d(0, -2px, 1000px) rotateX(28deg) rotateY(12deg) rotateZ(-10deg)"
          },
          "100%": {
            transform: "translate3d(0, 0, 1000px) rotateX(6deg) rotateY(0deg) rotateZ(-2deg)"
          }
        }
      },
      animation: {
        "fadeInTop": "fadeInTop 0.3s ease-out forwards",
        "fadeInDown": "fadeInDown 0.3s ease-out forwards",
        "blurOpacity": "blurOpacity 0.4s ease-out forwards",
        "knocking": "knocking 0.8s ease-in-out infinite"
      },
      zIndex: {
        '9999': '9999',
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
      "14": "56px",
      "16": "64px"
    },
    borderRadius: {
      "none": "0px",
      DEFAULT: "4px",
      "lg": "8px",
      "2xl": "16px",
      "3xl": "18px",
      "full": "9999px",
    },
  },
  plugins: [],
  safelist: [
    "km-bg-blueLight",
    "km-bg-greenLight",
    "km-bg-redLight",
    "km-bg-orangeLight",
    "km-bg-blue",
    "km-bg-green",
    "km-bg-red",
    "km-bg-orange",
    "km-bg-blueDark",
    "km-bg-greenDark",
    "km-bg-redDark",
    "km-bg-orangeDark"
  ]
}