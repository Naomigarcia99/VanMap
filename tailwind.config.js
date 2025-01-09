/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        pastelBlue: "#AEC6CF",
        pastelPink: "#FDD7E4",
        pastelBeige: "#F5F5DC",
        pastelGreen: "#B5EAD7",
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
