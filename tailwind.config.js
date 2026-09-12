/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07070b",
        panel: "#0e0e15",
        panel2: "#131320",
        line: "#232333",
        fog: "#8a8a97",
        paper: "#f2f2f5",
        signal: "#5b7cff",
        signalSoft: "#8fa4ff",
      },
      fontFamily: {
        display: ["'IBM Plex Mono'", "monospace"],
        body: ["'IBM Plex Mono'", "monospace"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.02em",
      },
    },
  },
  plugins: [],
};