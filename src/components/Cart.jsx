import React, { useContext } from "react";
import { Modal } from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../utility/formatting";
import { Button } from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import { CartItem } from "./CartItem";
import { toast } from "react-toastify";

export const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  function handleClearCart(){
    cartCtx.clearCart();
    userProgressCtx.showCart();
    toast.info("Your cart was cleared", {
        autoClose: 700,
        hideProgressBar: true,
        pauseOnHover: false
      }); 
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      {cartCtx.items.length === 0 && <p>Your Cart is empty. Add a new meal to proceed!</p>}
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
      {cartCtx.items.length > 0 && <Button textOnly className="clear-cart-button" onClick={handleClearCart}>
              Clear Cart
            </Button>}
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
          
        )}
      </p>
    </Modal>
  );
};
