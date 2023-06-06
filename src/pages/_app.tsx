import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import ThemeContext, { ThemeProvider } from "@/contexts/ThemeContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
