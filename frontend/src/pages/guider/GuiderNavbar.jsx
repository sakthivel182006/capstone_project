import { useNavigate } from "react-router-dom";

const GuiderNavbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-blue-700 text-white flex justify-between items-center px-6 py-3">

      <button
        onClick={toggleSidebar}
        className="bg-white text-blue-700 px-3 py-1 rounded"
      >
        ☰
      </button>

      <h2 className="text-lg font-bold">
        Guider Dashboard
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-1 rounded"
      >
        Logout
      </button>

    </div>
  );
};

export default GuiderNavbar;