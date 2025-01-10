import { CartMeal } from "../types";
import { currencyFormatter } from "../utils/formatting";

interface CartItemProps {
  item: CartMeal;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem = ({ item, onIncrease, onDecrease }: CartItemProps) => {
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} - {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
