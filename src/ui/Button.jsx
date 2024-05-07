import { Link } from "react-router-dom";

function Button({ children, to, onclick }) {
  if (onclick) {
    return (
      <button
        onClick={onclick}
        className=" block px-4 py-2 text-stone-700 uppercase font-semibold disabled:cursor-not-allowed bg-yellow-300 rounded-full my-4 transition-all hover:translate-y-0.5 hover:bg-yellow-400"
      >
        {children}
      </button>
    );
  }
  if (to) {
    return (
      <Link
        className=" inline-block px-4 py-2 text-stone-700 uppercase font-semibold disabled:cursor-not-allowed bg-yellow-300 rounded-full my-4 transition-all hover:translate-y-0.5 hover:bg-yellow-400"
        to={to}
      >
        {children}
      </Link>
    );
  }
  return (
    <button className=" block px-4 py-2 text-stone-700 uppercase font-semibold disabled:cursor-not-allowed bg-yellow-300 rounded-full my-4 transition-all hover:translate-y-0.5 hover:bg-yellow-400">
      {children}
    </button>
  );
}

export default Button;
