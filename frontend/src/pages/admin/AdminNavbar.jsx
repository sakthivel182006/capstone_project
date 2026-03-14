import React from "react";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="bg-purple-900 px-3 py-2 rounded hover:bg-purple-800"
        >
          ☰
        </button>

        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <span className="text-sm">Welcome Admin</span>
    </nav>
  );
};

export default AdminNavbar;