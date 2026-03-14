import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5 space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2">
        Dashboard Menu
      </h2>

      <Link to="/admin" className="block hover:text-purple-400">
        Dashboard
      </Link>

      <Link to="/admin/users" className="block hover:text-purple-400">
        Manage Users
      </Link>
      <Link to="/admin/guiders" className="block hover:text-purple-400">
        Local Guiders
      </Link>

      
     
    </div>
  );
};

export default AdminSidebar;