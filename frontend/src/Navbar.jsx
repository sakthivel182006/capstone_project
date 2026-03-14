import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (token) setIsLoggedIn(true);
    if (savedRole) setRole(savedRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setOpenSidebar(false);
    navigate("/");
  };

  const handleDashboardNavigation = () => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "GUIDER") navigate("/guider");
    setOpenSidebar(false);
  };

  const handleSearch = () => {
    navigate("/product");
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-red-700 to-rose-700 text-white px-8 py-4 flex justify-between items-center relative z-50 shadow-lg">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpenSidebar(true)}
            className="bg-white text-red-700 px-3 py-2 rounded hover:bg-gray-200"
          >
            ☰
          </button>
          <h2 className="text-xl font-bold">Warehouse Management System</h2>
        </div>

        {/* CENTER SEARCH */}
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md w-80">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 text-black outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white px-4 py-2 hover:bg-red-700"
          >
            Search
          </button>
        </div>

        {/* RIGHT MENU */}
        <div className="space-x-8 flex items-center">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/allpackages" className="hover:text-gray-200">
            packages
          </Link>

          

          {isLoggedIn ? (
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white text-red-700 px-4 py-1 rounded hover:bg-gray-200"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 z-50 ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">

          <div>
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
              <div>
                <h2 className="text-xl font-bold">Warehouse Management System</h2>
                {role && (
                  <p className="text-xs text-gray-300 mt-1">
                    Role: {role}
                  </p>
                )}
              </div>
              <button onClick={() => setOpenSidebar(false)}>✕</button>
            </div>

            {isLoggedIn && (role === "ADMIN" || role === "GUIDER") && (
              <div className="p-5">
                <button
                  onClick={handleDashboardNavigation}
                  className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
                >
                  {role === "ADMIN"
                    ? "Admin Dashboard"
                    : "Guider Dashboard"}
                </button>
              </div>
            )}
          </div>

          <div className="p-6 space-y-4 border-t border-gray-700">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setOpenSidebar(false);
                  }}
                  className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setShowRegister(true);
                    setOpenSidebar(false);
                  }}
                  className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        ></div>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded w-96 relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-3 text-gray-600"
            >
              ✕
            </button>
            <Login
              switchToRegister={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded w-96 relative">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-2 right-3 text-gray-600"
            >
              ✕
            </button>
            <Register
              switchToLogin={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;