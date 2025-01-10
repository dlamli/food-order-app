import { createContext, useReducer } from "react";
import { Action, CartContextProps, Meal, State } from "../types";

interface CartContextProviderProps {
  children?: React.ReactNode;
}

export const CartContext = createContext<CartContextProps>({
  items: [],
  addItem: (item: Meal) => item,
  removeItem: (id: string) => id,
});

const cartReducer = (state: State, action: Action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const updatedItems = [...state.items];
    const existingCartItem = state.items[existingCartItemIndex];

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

  return state;
};

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const initialReducer: State = { items: [] };
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialReducer
  );

  const addItem = (item: Meal) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  };

  const removeItem = (id: string) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  };

  const cartContextValue = {
    items: cartState.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
