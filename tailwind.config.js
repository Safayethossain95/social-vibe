/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true, // Ensures the container is centered
        padding: {
          DEFAULT: "1rem", // Default padding for all breakpoints
          sm: "2rem",      // Small screen padding
          lg: "4rem",      // Large screen padding
          xl: "5rem",      // Extra-large screen padding
          "2xl": "6rem",   // 2XL screen padding
        },
      },
    },
  },
  plugins: [],
}

