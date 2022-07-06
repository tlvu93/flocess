import '../styles/globals.css';

import AuthState from '@context/auth-context';
import WorkflowState from '@context/workflow-context';
import Layout from '@layouts/Layout';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthState>
      <WorkflowState>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WorkflowState>
    </AuthState>
  );
}

export default MyApp;
