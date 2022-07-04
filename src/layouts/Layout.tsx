import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "@components/header/header";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className="min-h-screen bg-gray-100">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
    <footer>
      <hr />
      <span>I&apos;m here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
