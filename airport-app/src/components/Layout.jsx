import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main">

        <Header />

        {/* 👇 THIS IS IMPORTANT */}
        <Outlet />

      </div>

    </div>
  );
}

export default Layout;