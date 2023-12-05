
import React from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import BlogDetail from "../components/BlogDetail/BlogDetail";


const BlogDetailPage = () => {
  return (
    <React.Fragment>
      <Header />
      <BlogDetail/>
      <Footer />
    </React.Fragment>
  );
};

export default BlogDetailPage;
