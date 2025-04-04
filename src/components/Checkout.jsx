import React, { useContext, useActionState } from "react";
import { Modal } from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../utility/formatting";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import useHttp from "./hooks/useHttp";
import { Error } from "./Error";
import { CircularProgress } from "@mui/material";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleClearCart(){
    cartCtx.clearCart();
    userProgressCtx.showCart(); 
  }

  async function checkoutAction(prevState,fd) { //migrated form submition to form action
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest({
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
    });
  }

  const[formState, formAction, pending] = useActionState(checkoutAction,null);

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      {pending ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress color="primary" size={50} />
        </div>
      ) : (
        <form action={formAction}>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
          <Input label="Full Name" type="text" id="name" />
          <Input label="E-Mail Address" type="email" id="email" />
          <Input label="Street" type="text" id="street" />
          <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />
          </div>
          

          {error && <Error title="Failed to submit order" message={error.toString()} />}

          <p className="modal-actions">
            <Button type="button" textOnly onClick={handleClose}>
              Close
            </Button>
            
            <Button>Submit Order</Button>
          </p>
        </form>
      )}
    </Modal>
  );
};
