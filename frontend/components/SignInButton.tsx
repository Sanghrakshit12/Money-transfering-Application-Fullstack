import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface AuthButtonProps {
  userName: string;
  password: string;
}

export default function AuthButton({ userName, password }: AuthButtonProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          userName,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/Dashboard");
    } catch (e) {
      setError("Server Not Responding");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleSubmit}
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        SignIn
      </button>
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}
