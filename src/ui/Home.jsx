import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const userName = useSelector((state) => state.user.username);
  return (
    <div className=" my-8 sm:my-16 px-4">
      <h1 className="text-center text-xl font-semibold text-stone-500">
        The best pizza.
        <br />
        <span className="text-yellow-500 block">
          Straight out of the oven, straight to you.
        </span>
        {userName == "" ? (
          <CreateUser />
        ) : (
          <Button to="/menu">Continue Ordering {userName}</Button>
        )}
      </h1>
    </div>
  );
}

export default Home;
