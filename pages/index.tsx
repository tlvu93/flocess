import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Container, { ContainerStyle } from '@layouts/Container';

import styles from '../styles/Home.module.css';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <Container style={ContainerStyle.Light}>
      <div className={styles.container}>
        <Head>
          <title>Flocess - Home</title>
          <meta name='description' content='Home' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main>
          <h1 className={styles.title}>
            Welcome to <p className='font-bold'>Flocess</p>
          </h1>

          <div className={styles.grid}>
            <Link href='/user-dashboard'>
              <a className={styles.card}>
                <h2>User Dashboard &rarr;</h2>
                <p>Get an overview over all workflows</p>
              </a>
            </Link>
          </div>
        </main>
      </div>
    </Container>
  );
};

export default Home;
