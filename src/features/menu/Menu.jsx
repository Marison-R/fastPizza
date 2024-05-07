import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
function Menu() {
  const menu = useLoaderData();
  //console.log(menu);
  const carte = useSelector((state) => state.cart.cart);
  console.log(carte);
  return (
    <ul className="flex flex-col divide-y-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
