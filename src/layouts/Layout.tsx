import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "@components/header/header";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

export default Layout;
