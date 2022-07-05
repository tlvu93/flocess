import '../styles/globals.css';

import AuthState from '@context/auth-context';
import Layout from '@layouts/Layout';

import type { AppProps } from 'next/app';
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
