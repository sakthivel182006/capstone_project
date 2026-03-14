import { useState } from "react";
import api from "../config/Api";

function Login({ switchToRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/users/login", {
        email,
        password
      });

      const data = response.data;

      localStorage.setItem("userid", data.id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login successful");
      window.location.reload();

    } catch (error) {
      alert("Invalid credentials");
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
      >
        Login
      </button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Click here to Register
        </span>
      </p>
    </>
  );
}

export default Login;