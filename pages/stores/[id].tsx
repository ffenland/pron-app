import Layout from "@components/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";

const StoreDetail: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  return (
    <Layout canGoBack hasTabBar={false}>
      <div className="p-3">
        <span>Your Id is</span>
        <span>{id}</span>
      </div>
    </Layout>
  );
};

export default StoreDetail;
