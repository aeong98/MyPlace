import type { NextPage } from "next";
import Layout from "../components/common/Layout";
import LoginForm from "../components/form/LoginForm";
const Home: NextPage = () => {
  
  return (
    <Layout>
      <div>hi</div>
      <LoginForm></LoginForm>
    </Layout>
  );
};

export default Home;
