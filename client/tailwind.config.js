export default {
  darkMode: "class", // ✅ REQUIRED
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          lightBg: "#f4f3ec",
          darkBg: "#0b0b0c",
        },
      },
    },
  },
  plugins: [],
};
