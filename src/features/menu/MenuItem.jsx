import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurretOrdered } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const isOrdered = useSelector(getCurretOrdered(id));
  console.log(isOrdered);
  const dispatch = useDispatch();
  const x = useSelector((state) => state.cart.cart);
  const quantity = useSelector(getCurretOrdered(id));
  function handleAddCart() {
    const newPizza = {
      pizzaId: id,
      name,
      unitPrice,
      totalPrice: unitPrice,
      quantity: 1,
    };
    dispatch(addItem(newPizza));
    console.log(x);
  }
  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className="h-28" />
      <div className="flex grow flex-col py-0.5">
        <p>{name}</p>
        <p>{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          {!soldOut && !isOrdered && (
            <Button onclick={handleAddCart}>Add to cart</Button>
          )}
          {isOrdered ? (
            <div className="flex items-center">
              <UpdateItemQuantity
                id={id}
                quantity={quantity}
              ></UpdateItemQuantity>
              <DeleteItem id={id} />
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
