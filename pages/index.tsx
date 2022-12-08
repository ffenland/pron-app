import Layout from "@components/layout";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Looking for best</title>
        <meta name="description" content="Showing recruting list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Home" hasTabBar>
        <div>
          <span>안녕하세요 Welcome</span>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
