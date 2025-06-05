/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mantine/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
    },
    fontFamily: {
      sans: ["Open Sans", "serif"],
      display: ["Orbitron", "Georgia", "serif"],
    },
    extend: {
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-in": "slideIn .4s ease-in-out forwards",
      },
      colors: {
        azul: {
          100: "#DDE9F6",
          150: "#D9DFFA",
          200: "#99BCE5",
          300: "#568FD4",
          400: "#435EE6",
          700: "#2B64A9",
          800: "#163356",
          900: "#0F1F71",
          950: "#0A154C",
        },
        laranja: {
          300: "#FFBA80",
          500: "#FF8C2A",
          800: "#803A00",
          950: "#2A1300",
        },
      },
      screens: {
        xs: "430px", // Novo breakpoint para telas menores que `sm`
      },
    },
  },
  plugins: [],
};
