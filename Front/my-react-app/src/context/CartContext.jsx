// src/context/CartContext.jsx
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  total: 0
};

function cartReducer(state, action) {
  switch(action.type) {
    case "ADD_ITEM":
      const exist = state.cart.find(item => item.id === action.payload.id);
      let newCart;
      if (exist) {
        newCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      return { 
        cart: newCart, 
        total: newCart.reduce((acc, item) => acc + item.prix * item.quantity, 0)
      };

    case "REMOVE_ITEM":
      const filtered = state.cart.filter(item => item.id !== action.payload);
      return { 
        cart: filtered, 
        total: filtered.reduce((acc, item) => acc + item.prix * item.quantity, 0)
      };

    case "UPDATE_QUANTITY":
      const updated = state.cart.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { 
        cart: updated, 
        total: updated.reduce((acc, item) => acc + item.prix * item.quantity, 0)
      };

    case "CLEAR_CART":
      return { cart: [], total: 0 };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
