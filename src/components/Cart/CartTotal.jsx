import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { loadStripe } from "@stripe/stripe-js";
import { message,Spin } from "antd";

const CartTotal = () => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useContext(CartContext);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;

  const cartItemsTotals = cartItems.map((item) => {
    const itemTotal =
      (item.price.current - (item.price.current * item.price.discount) / 100) *
      item.quantity;
    return itemTotal;
  });

  const subTotals = cartItemsTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cargoFee = 15;

  const cartTotals = (
    fastCargoChecked ? subTotals + cargoFee : subTotals
  ).toFixed(2);

  const handlePayment = async () => {
    setLoading(true)
    if (!user) {
      return message.info("Alışverişi tamamlamak için lütfen giriş yapınız.");
    }
    const body = {
      products: cartItems,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };

    try {
      const stripe = await loadStripe(stripePublicKey);
      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Ödeme İşlemi Başarısız");
      }
      const session = await res.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="cart-collaterals">
      <div className="cart-totals">
        <h2>Cart totals</h2>
        <table>
          <tbody>
            <tr className="cart-subtotal">
              <th>Subtotal</th>
              <td>
                <span id="subtotal">{subTotals.toFixed(2)}</span>
              </td>
            </tr>
            <tr>
              <th>Shipping</th>
              <td>
                <ul>
                  <li>
                    <label>
                      Fast Cargo: $15.00
                      <input
                        type="checkbox"
                        id="fast-cargo"
                        checked={fastCargoChecked}
                        onChange={() => setFastCargoChecked(!fastCargoChecked)}
                      />
                    </label>
                  </li>
                  <li>
                    <a href="#">Change Address</a>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <strong id="cart-total">{cartTotals}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="checkout">
          <Spin spinning={loading}>
            <button className="btn btn-lg" onClick={handlePayment}>
              Proceed to checkout
            </button>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
