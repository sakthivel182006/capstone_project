import { useState } from "react";
import api from "../config/Api";

function Register({ switchToLogin }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/api/users/register", {
        username,
        email,
        password
      });

      alert("Registration successful");
      switchToLogin();

    } catch (error) {
      alert("Registration failed");
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

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
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
      >
        Register
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Click here to Sign In
        </span>
      </p>
    </>
  );
}

export default Register;