import { useDispatch } from "react-redux";
import { removeItem } from "./CartSlice";

function DeleteItem({ id }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(removeItem(id))}
      className="ms-4 bg-yellow-300 rounded-full inline-block px-4 py-2 transition-all duration-300  hover:bg-yellow-400 hover:translate-y-0.5"
    >
      Delete
    </button>
  );
}

export default DeleteItem;
