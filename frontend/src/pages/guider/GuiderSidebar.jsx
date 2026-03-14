import { Link } from "react-router-dom";

const GuiderSidebar = () => {

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">

      <h2 className="text-xl font-bold mb-6">
        Guider Panel
      </h2>

      <div className="flex flex-col space-y-4">

        <Link
          to="/guider"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/guider/packages"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Packages
        </Link>

      </div>

    </div>
  );
};

export default GuiderSidebar;