import { createOrder } from "../../services/apiRestaurant";
import { Form, redirect } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store from "../..";
import { clearCart, getTotalPrice } from "../cart/CartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  let totalPrice = useSelector(getTotalPrice);
  const cart = useSelector((state) => state.cart.cart);
  const userName = useSelector((state) => state.user.username);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  totalPrice += priorityPrice;
  const { address, position } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart></EmptyCart>;
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>
      {/*<button onClick={() => dispatch(fetchAddress())}>click ME</button>*/}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input
            className="w-full transition-all  bg-white border text-sm border-yellow-500 border-spacing-0  rounded-full focus:outline-none focus:ring focus:ring-yellow-500 px-2"
            type="text"
            defaultValue={userName}
            name="customer"
            required
          />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input
              className="w-full transition-all bg-white border text-sm border-yellow-500
            border-spacing-0 rounded-full focus:outline-none focus:ring
            focus:ring-yellow-500 px-2"
              type="tel"
              name="phone"
              required
            />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              className="w-full transition-all  relative bg-white border text-sm border-yellow-500 border-spacing-0  rounded-full focus:outline-none focus:ring focus:ring-yellow-500 px-2"
              type="text"
              name="address"
              defaultValue={address}
              required
            />
          </div>
          <span className="absolute right-36 h-2 w-18 text-sm">
            <Button
              onclick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Address
            </Button>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 mt-3"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="pt-2.5" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={position ? `${position.longitude},${position.latitude}` : ""}
        />
        <div>
          <Button>Order Now with {formatCurrency(totalPrice)}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const FormData = await request.formData();
  const data = Object.fromEntries(FormData);
  //console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // console.log(order);
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  // console.log(newOrder);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
