import React from "react";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Slider from "../components/Slider/Slider";
import Policy from "../components/Layout/Policy/Policy";
import Category from "../components/Category/Category";
import Product from "../components/Products/Product";
import Campaigns from "../components/Campaigns/Campaigns";
import Blog from "../components/Blog/Blog";
import Brand from "../components/Brand/Brand";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";

const Homepage = () => {
  return (
    <React.Fragment>
      <Header />
      <Slider />
      <Category />
      <Product />
      <Campaigns />
      <Product />
      <Blog />
      <Brand />
      <CampaignSingle />
      <Policy />
      <Footer />
    </React.Fragment>
  );
};

export default Homepage;
