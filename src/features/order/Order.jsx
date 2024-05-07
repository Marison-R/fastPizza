// Test ID: IIDSAT

import {
  useFetcher,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  console.log(order);
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher]
  );
  console.log(fetcher.data);
  const paramas = useParams();
  console.log(paramas.orderId);
  return (
    <div className="py-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className=" font-semibold text-xl">
          Status of Order ID{" "}
          <span className="text-red-500">#{paramas.orderId}</span>
        </h2>

        <div>
          {priority && (
            <span className="bg-red-500 rounded-full uppercase px-2 py-1 font-semibold text-red-50 mx-4">
              Priority
            </span>
          )}
          <span className="space-x-4 bg-green-500 uppercase rounded-full px-2 py-1 font-semibold text-green-50 mx-4">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between my-4 mt-8 text-l bg-stone-200 px-4 py-6">
        <p className="text-l font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className=" divide-y-2 divide-stone space-y-2">
        {cart.map((item) => (
          <OrderItem
            item={item}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
          ></OrderItem>
        ))}
      </ul>
      <div className="my-4 mt-8 text-l bg-stone-200 px-4 py-6 space-y-4">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
