/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        background: "#f0f7ff",  // 浅蓝色背景
        primary: "#2d5b8e",     // 深蓝色文字
        active: "#ff69b4",      // 粉色强调
        secondary: "#91c4ff",   // 次要蓝色
        accent: "#ffb6c1",      // 浅粉色
      },
    },
  },
  plugins: [],
};