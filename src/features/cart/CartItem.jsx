import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center justify-between py-4">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-6">
        <p className=" mr-4">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          id={pizzaId}
          quantity={quantity}
        ></UpdateItemQuantity>
        <DeleteItem id={pizzaId}></DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;
