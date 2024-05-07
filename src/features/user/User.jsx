import { useSelector } from "react-redux";

function User() {
  const userName = useSelector((state) => state.user.username);
  // console.log(userName);
  if (!userName) return null;
  return (
    <div className="font-semibold hidden text-sm sm:block">{userName}</div>
  );
}

export default User;
