import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@layouts/Layout";
import AuthState from "@context/auth-context";
import { Children } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthState>
  );
}

export default MyApp;
