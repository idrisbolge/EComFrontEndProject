import Cart from "../components/Cart/Cart";
import Header from "../components/Layout/Header/Header";
import Policy from "../components/Layout/Policy/Policy";
import Footer from "../components/Layout/Footer/Footer";
import React from "react";

const CartPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Cart />
      <Policy />
      <Footer />
    </React.Fragment>
  );
};

export default CartPage;
