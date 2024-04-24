import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "../pages/Signup";
import SignInPage from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import Transferpage from "../pages/Send";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Transferpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
