import React from "react";
import Header from "../components/Layout/Header/Header";
import Policy from "../components/Layout/Policy/Policy";
import Footer from "../components/Layout/Footer/Footer";
import Blog from "../components/Blog/Blog";

const BlogPage = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="blog-page">
        <Blog />
      </div>

      <Policy />
      <Footer />
    </React.Fragment>
  );
};

export default BlogPage;
