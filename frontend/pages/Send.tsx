import axios from "axios";
import AuthHeading from "../components/AuthHeading";
import Navbar from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function TransferPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  async function Tranfer() {
    try {

      await axios.post(
        "http://localhost:3000/api/v1/accounts/transfer",
        {
          to: id,
          amount:parseInt(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/Dashboard");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="bg-gray-300 min-h-screen font-serif">
      <Navbar />
      <div className="flex items-center justify-center pt-36">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="text-center pb-8">
            <AuthHeading label="Transfer" />
          </div>
          <div className="font-semibold text-gray-800 pb-2">To - {name}</div>

          <div className="font-semibold text-gray-800 pb-2">
            Amount (in Rs):
          </div>
          <div className="pb-4">
            <input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
           
              type="text"
              className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={Tranfer}
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600 focus:outline-none w-full"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
