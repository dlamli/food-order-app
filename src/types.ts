export interface Meal {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartMeal {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

export interface CartContextProps {
  items: CartMeal[],
  addItem: (item: Meal) => void;
  removeItem: (item: string) => void;
}

export interface UserProgress {
  progress: Progress;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
}

export type Action = {
  item: Meal;
  type: ActionType;
}

export type State = {
  items: CartMeal[];
}

export type ActionType = 'ADD_ITEM' | 'REMOVE_ITEM';

export type Progress = '' | 'cart' | 'checkout';