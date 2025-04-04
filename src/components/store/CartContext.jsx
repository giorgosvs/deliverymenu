import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    //add item to state

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      //update quantity of existing item in cart
      const existingitem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...state.items[existingCartItemIndex],
        quantity: existingitem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //add new item - case we did not have it in cart
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    //remove item from state
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if(action.type === 'CLEAR_CART') {
    return {...state, items: []};
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({type: 'ADD_ITEM',item});
  }

  function removeItem(id) {
    dispatchCartAction({type: 'REMOVE_ITEM',id});
  }

  function clearCart() {
    dispatchCartAction({type: 'CLEAR_CART'});
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

//   console.log(cartContext);

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;
