/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        blueMain: "#00778D",
        blueTypography: "#114B5F",
        whiteEdited: "#F6F6F6",
        blueLight: "#DCE8EC",
        blueInput: "#848b8e",
      },
      colors: {
        blueTypography: "#114B5F",
        blueMain: "#00778D",
        dark: "#001922",
        darkSecondary: "#000F14",
        dark3: "#001319",
      },
      borderRadius: {
        teste: "5rem",
        teste2: "50%",
      },
    },
  },
  plugins: [],
};
