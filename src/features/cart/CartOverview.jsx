import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getToatalQuantiy, getTotalPrice } from "./CartSlice";

function CartOverview() {
  const totalQuantity = useSelector(getToatalQuantiy);
  const totalPrice = useSelector(getTotalPrice);
  if (!totalPrice) {
    return null;
  }
  return (
    <div className=" flex items-center justify-between bg-stone-700 sm:px-6 px-4 py-4 uppercase  text-white">
      <p className=" space-x-4">
        <span>{totalQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">
        <span className="text-gray-300">Open cart &rarr;</span>
      </Link>
    </div>
  );
}

export default CartOverview;
