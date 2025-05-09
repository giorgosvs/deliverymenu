import React, { useContext } from "react";
import { currencyFormatter } from "../utility/formatting";
import { Button } from "./UI/Button";
import CartContext from "./store/CartContext.jsx";
import { toast } from "react-toastify";

export const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
    toast.success("Meal added successfully to cart!", {
        autoClose: 700,
        hideProgressBar: true,
        pauseOnHover: false
      });
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.desc}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};
