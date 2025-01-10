import { useActionState, useContext } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "./ui/Modal";
import { currencyFormatter } from "../utils/formatting";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import { ORDERS_API_URL } from "../apis/foodApi";
import useHttp from "../hooks/useHttp";
import { FetchConfig } from "../types";
import Error from "./Error";

const requestConfig: FetchConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { data, error, sendRequest, clearData } = useHttp(
    ORDERS_API_URL,
    null,
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleClose = () => userProgressCtx.hideCheckout();

  const handleClear = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  const checkoutAction = async (prevState, fd: FormData) => {
    const customerData = Object.fromEntries(fd.entries());

    const bodyData = JSON.stringify({
      order: { items: cartCtx.items, customer: customerData },
    });

    await sendRequest(bodyData);
  };

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClear}
      >
        <h2>Success!</h2>
        <p>Your order was successfully placed.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleClear}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to place order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
