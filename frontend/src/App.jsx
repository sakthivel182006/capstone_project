import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Packages from "./pages/Packages";
import AdminHome from "./pages/admin/AdminHome";
// import WhereHouseManager from "./pages/wherehousemanager/WhereHouseManager";
import Profile from "./pages/Profile";


import GuiderLayout from "./pages/guider/GuiderLayout";
import GuiderHome from "./pages/guider/GuiderHome";

import Packages from "./pages/Packages";

// import Products from "./pages/Products";
// import OrderPage from "./pages/derPage";

// import OrdersDetails from "./pages/OrdersDetails";

function App() {
  const role = localStorage.getItem("role");

  const AdminProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (role !== "ADMIN") {
        const timer = setTimeout(() => {
          navigate("/");
        }, 5000);

        return () => clearTimeout(timer);
      }
    }, [navigate]);

    if (role !== "ADMIN") {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-red-600 text-xl font-bold">
          <p>Only admins can use this page</p>
          <p className="text-sm mt-3 text-gray-600">
            Please wait... You will be redirected in 5 seconds.
          </p>
        </div>
      );
    }

    return children;
  };

  const WarehouseProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (role !== "GUIDER") {
        const timer = setTimeout(() => {
          navigate("/");
        }, 5000);

        return () => clearTimeout(timer);
      }
    }, [navigate]);

    if (role !== "GUIDER") {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-red-600 text-xl font-bold">
          <p>Only warehouse managers can use this page</p>
          <p className="text-sm mt-3 text-gray-600">
            Please wait... You will be redirected in 5 seconds.
          </p>
        </div>
      );
    }

    return children;
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allpackages" element={<Packages />} />
        {/* <Route path="/guider/packages" element={<Packages />} /> */}


        {/* <Route path="/order" element={<OrderPage />} /> */}
        {/* <Route path="/product" element={<Products />} /> */}
        {/* <Route path="/booked" element={<OrdersDetails />} /> */}

        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          }
        />



        {/* GUIDER DASHBOARD */}
        
        
       <Route
  path="/guider/*"
  element={
    <WarehouseProtectedRoute>
      <GuiderHome />
    </WarehouseProtectedRoute>
  }
/>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;