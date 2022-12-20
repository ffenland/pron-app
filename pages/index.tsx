import * as heroicon from "@heroicons/react/24/outline";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import Store from "@components/store";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

interface PostInterface {
  id: number;
  body: string;
}

const Home: NextPage<{ posts: PostInterface[] }> = ({ posts }) => {
  console.log("SSRTEST", posts);
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  //const res = await fetch("url");
  //const posts = await res.json();
  const posts: PostInterface[] = [{ id: 1, body: "hi" }];
  return {
    props: {
      posts,
    },
  };
};
