import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItem, increaseItem } from "./CartSlice";

function UpdateItemQuantity({ id, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 items-center">
      <Button onclick={() => dispatch(increaseItem(id))}>+</Button>
      <span>{quantity}</span>
      <Button onclick={() => dispatch(decreaseItem(id))}>-</Button>
    </div>
  );
}

export default UpdateItemQuantity;
