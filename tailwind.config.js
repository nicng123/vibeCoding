export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      colors: {
        softBg: "#f7f8fa",
        softPrimary: "#a2d2ff",
        softAccent: "#ffc8dd",
      },
    },
  },
  plugins: [],
}