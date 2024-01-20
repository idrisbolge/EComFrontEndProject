import { useContext } from "react";
import "./Cart.css";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";
import { CartContext } from "../../context/CartProvider";

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <CartProgress />
              <div className="shop-table-wrapper">
                <CartTable />
                <CartCoupon />
              </div>
            </form>
            <CartTotal />
          </div>
        ) : (
          <div>
            <h2>Sepette Ürün Yok</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
