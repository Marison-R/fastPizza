import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/User";

function Header() {
  return (
    <header className=" flex  items-center justify-between bg-yellow-500 p-4  uppercase sm:px-6">
      <Link to="/" className=" tracking-widest">
        Fast react pizza co
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
