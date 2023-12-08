import React from "react";
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
      <Slider />
      <Category />
      <Product />
      <Campaigns />
      <Product />
      <Blog />
      <Brand />
      <CampaignSingle />
      <Policy />
    </React.Fragment>
  );
};

export default Homepage;
