import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthButtonProps {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default function AuthButton({
  userName,
  firstName,
  lastName,
  password,
}: AuthButtonProps) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    try {
      axios.post("http://localhost:3000/api/v1/user/signup", {
        userName,
        firstName,
        lastName,
        password,
      });
      navigate("/Dashboard");
    } catch (e) {
      console.log("Server Not Responding");
    }
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={handleSubmit}
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Signup
      </button>
    </div>
  );
}
