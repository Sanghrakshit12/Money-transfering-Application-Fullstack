import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="w-screen flex items-center justify-start bg-blue-700 p-2 pl-10">
      <div className="text-xl font-bold text-white">
        <Link to={"/"} className="font-serif font-semibold">
          MoneyTransferX{" "}
        </Link>
      </div>
      <div className="pl-2">
        <Link to={"/"}>
          <img
            style={{ width: "50%", height: "50%" }}
            src="../public/icon.png"
            alt="Icon"
          />
        </Link>
      </div>
    </div>
  );
}
