import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@layouts/Layout";
import AuthState from "@context/auth-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </Layout>
  );
}

export default MyApp;
