/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        indigo: "#4F46E5",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
      },
      backdropBlur: {
        glass: "10px",
      },
    },
  },
  plugins: [],
}
