import * as heroicon from "@heroicons/react/24/outline";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import Item from "@components/item";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Store } from "@prisma/client";

interface PostInterface {
  id: number;
  body: string;
}

interface StoreWithCount extends Store {
  _count: { favs: number };
}
interface StoreResponse {
  ok: boolean;
  stores: StoreWithCount[];
}

const Home: NextPage<{ posts: PostInterface[] }> = ({ posts }) => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<StoreResponse>("/api/stores");
  console.log(data);
  return (
    <div className="">
      <Head>
        <title>Looking for best</title>
        <meta name="description" content="Showing recruting list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Home" hasTabBar canGoBack>
        <div>
          {data?.stores?.map((store) => {
            return (
              <Item
                key={store.id}
                id={store.id}
                title={store.name}
                address={store.address}
                image={store.image}
                comments={store._count.favs}
                hearts={1}
              />
            );
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
