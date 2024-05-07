import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 sm:w-40 transition-all duration-300 md:focus:w-64 rounded-full px-2 py-2 text-sm text-stone-700 bg-yellow-200 focus:outline-none focus:ring focus:ring-yellow-500"
        placeholder="enter order id#"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </form>
  );
}

export default SearchOrder;
