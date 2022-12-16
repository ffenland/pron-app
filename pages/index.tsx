import * as heroicon from "@heroicons/react/24/outline";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import Store from "@components/store";
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
      <Layout title="Home" hasTabBar canGoBack>
        <div>
          {["1", "2", "3", "4", "5", "6", "7"].map((item, index) => {
            return <Store key={index} id={item} />;
          })}
        </div>
        <FloatingButton href="/store/upload">
          <heroicon.PlusIcon className="h-8 w-8" />
        </FloatingButton>
      </Layout>
    </div>
  );
};

export default Home;
