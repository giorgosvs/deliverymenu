import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import { Button } from "./UI/Button";
import CartContext from "./store/CartContext.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";

export const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  
  const totalCartItems = cartCtx.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0); //receiving item quantity through context

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="deliverate" />
        <h1 id="title">deliverymenu</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};
