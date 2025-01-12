/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      container: {
        center: true, // Center the container by default
        padding: {
          DEFAULT: '0', // Default padding for all screen sizes
          sm: '2rem', // Padding for small screens
          lg: '2rem', // Padding for large screens
          xl: '4rem', // Padding for extra-large screens
          '2xl': '4rem', // Padding for 2xl screens
        },
        screens: {
          sm: '100%', // Take full width for small screens
          md: '100%', // Take full width for medium screens
          lg: '1283px', // Fixed width for large screens
          xl: '1600px', // Fixed width for extra-large screens
        },
      },
    },
  },
  plugins: [],
}

