import Layout from "../components/Layout";
import Home from "../components/Home";
import MyProjects from "../components/MyProjects";
import Footer from "../components/Footer";

function Index() {
  return (
    <>
      <Layout>
        <Home />
        <MyProjects />
      </Layout>
      <Footer />
    </>
  );
}

export default Index;
