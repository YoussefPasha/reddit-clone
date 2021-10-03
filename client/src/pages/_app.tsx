import { AppProps } from "next/app";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/auth";

import "../styles/tailwind.css";
import "../styles/icons.css";

axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/login", "/register"];
  const authRoute = authRoutes.includes(pathname);

  return (
    <AuthProvider>
      {!authRoute && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
