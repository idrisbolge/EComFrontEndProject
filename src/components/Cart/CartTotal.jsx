import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";

const CartTotal = () => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const { cartItems } = useContext(CartContext);

  const cartItemsTotals = cartItems.map((item) => {
    const itemTotal = (item.price.current-item.price.current*item.price.discount/100) * item.quantity;
    return itemTotal;
  });

  const subTotals = cartItemsTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);
  
  const cargoFee = 15

  const cartTotals = (fastCargoChecked? (subTotals+cargoFee) :subTotals).toFixed(2)


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
          <button className="btn btn-lg">Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
