// pages/_app.js
import "@/styles/globals.css";
import CursorCFC from "./components/Cursor"; // Adjust path if needed

import { Bodoni_Moda, Poppins } from "next/font/google";

// Load Bodoni for headings
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Load Poppins for body
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${bodoni.variable} ${poppins.variable}`}>
      <CursorCFC />
      <Component {...pageProps} />
    </div>
  );
}
