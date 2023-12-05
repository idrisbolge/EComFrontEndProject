import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Proptypes from "prop-types";
import Policy from "../components/Layout/Policy/Policy";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Policy />
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;

MainLayout.proTypes = {
  children: Proptypes.node,
};
