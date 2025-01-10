import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "./ui/Modal";
import { currencyFormatter } from "../utils/formatting";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import { ORDERS_API_URL } from "../apis/foodApi";

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleClose = () => userProgressCtx.hideCheckout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const customerData = Object.fromEntries(fd.entries());

    await fetch(ORDERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  };

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" onClick={handleClose} textOnly>
            Close
          </Button>
          <Button type="submit">Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
