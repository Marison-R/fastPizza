import { formatCurrency } from "../../utils/helpers";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  console.log(ingredients);
  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <p className="pl-2">
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold pr-2">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="mt-3 ml-2 capitalize text-sm italic text-stone-500">
        {ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
