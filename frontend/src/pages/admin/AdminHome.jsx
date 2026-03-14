import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import LocalGuiders from "./LocalGuiders";



const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">

      <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">

        {sidebarOpen && <AdminSidebar />}

        <div className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="guiders" element={<LocalGuiders/>}/>


            {/* <Route path="reports" element={<Reports />} /> */}
            {/* <Route path="products" element={<Products />} /> */}
            {/* <Route path="werehouse" element={<WereHouse />} /> */}
            {/* <Route path="inventory" element={<Werehouseinventory />} /> */}
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;