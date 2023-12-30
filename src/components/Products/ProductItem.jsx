import { useContext } from "react";
import "./ProductItem.css";
import propTypes from "prop-types";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";

const ProductItem = ({ productItem }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const filteredCart = cartItems.find((cartItem)=> cartItem._id=== productItem._id);

  return (
    <li className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          
          <img src={productItem.img[0]} alt="" className="img1"></img>
          <img src={productItem.img[1]} alt="" className="img2"></img>
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {productItem.name}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">
            {(parseFloat(productItem.price.current) * parseInt(productItem.price.discount) / 100).toFixed(2)}
          </strong>
          <span className="old-price">
            { productItem.price.current.toFixed(2)} 
          </span>
        </div>
        <span className="product-discount">{productItem.price.discount}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() => addToCart(productItem)}
            disabled={filteredCart}
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to= {`product/${productItem._id}`} className="product-link" onClick={()=>{

          }}>
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  productItem: propTypes.object,
  setCartItems: propTypes.func,
};
