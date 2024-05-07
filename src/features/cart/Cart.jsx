import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./CartSlice";
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const userName = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="mt-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="font-bold">Your cart, {userName}</h2>
      <ul className="mt-4 flex flex-col divide-y">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId}></CartItem>
        ))}
      </ul>
      <div>
        <Button to="/order/new">Order pizzas</Button>
        <button
          onClick={() => dispatch(clearCart())}
          className="ms-4 bg-stone-200 rounded-full inline-block px-4 py-2 transition-all duration-300  hover:bg-stone-300 hover:translate-y-0.5"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
