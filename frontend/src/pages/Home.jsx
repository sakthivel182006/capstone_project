import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-600 to-rose-700 text-white flex items-center justify-center">

      <div className="text-center max-w-3xl px-6">

        <h1 className="text-5xl font-extrabold mb-6">
          Welcome Warehouse Management System
        </h1>

        <p className="text-lg text-red-100 mb-8 leading-relaxed">
          Our platform helps businesses efficiently manage products,
          warehouse inventory, user roles, and real-time stock updates.
          Designed for Admins and Warehouse Managers to streamline
          operations and boost productivity.
        </p>

        <div className="flex justify-center gap-6">

          <button
            onClick={() => navigate("/product")}
            className="bg-white text-red-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Click Here to Book Product
          </button>

          <button
            onClick={() => navigate("/about")}
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-700 transition duration-300"
          >
            Learn More
          </button>

        </div>

      </div>

    </div>
  );
};

export default Home;