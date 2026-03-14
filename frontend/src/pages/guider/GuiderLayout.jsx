import GuiderSidebar from "./GuiderSidebar";
import { Outlet } from "react-router-dom";

function GuiderLayout() {

  return (
    <div className="flex">

      <GuiderSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">

        <Outlet />

      </div>

    </div>
  );
}

export default GuiderLayout;