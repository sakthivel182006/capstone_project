import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import GuiderNavbar from "./GuiderNavbar";
import GuiderSidebar from "./GuiderSidebar";

import Dashboard from "./Dashboard";
import Packages from "./Packages";

const GuiderHome = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">

      <GuiderNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">

        {sidebarOpen && <GuiderSidebar />}

        <div className="flex-1 p-6 bg-gray-100">

          <Routes>

            <Route index element={<Dashboard />} />

            <Route path="packages" element={<Packages />} />

          </Routes>

        </div>

      </div>

    </div>
  );
};

export default GuiderHome;