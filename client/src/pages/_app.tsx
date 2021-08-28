import { AppProps } from "next/app";
import axios from "axios";

import "../styles/globals.css";

axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
