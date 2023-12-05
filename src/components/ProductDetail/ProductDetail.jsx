import BreadCrumb from "./BreadCrumb/BreadCrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import Tabs from "./Tabs/Tabs"

import "./ProductDetail.css";

const ProductDetail = () => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <BreadCrumb />

          <div className="single-content">
            <main className="site-main">
              <Gallery />
              <Info />
            </main>
          </div>

          
          <Tabs />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
