import React from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import Logo from "@/Assets/login_logo.png";
import {
  ChartNoAxesColumn,
  CirclePercent,
  CupSoda,
  House,
  LogOut,
  Logs,
  User,
} from "lucide-react";

function OwnerDefaultLayout() {
  const { user, token } = useStateContext();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-60 bg-white min-h-screen hidden md:flex flex-col items-start space-y-16 p-6 py-10 border-r shadow-xs">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Whisked logo" className="h-10" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-brown-800">
              Whisked Cafe
            </span>
            <span className="mt-[-.2rem] text-gray-700">by Ericka</span>
          </div>
        </Link>
        <ul className="w-full space-y-1">
          <SideBarLink
            href="/dashboard"
            icon={<House size={20} />}
            label="Dashboard"
          />
          <SideBarLink href="/pos" icon={<CupSoda size={20} />} label="POS" />
          <SideBarLink
            href="/inventory"
            icon={<CirclePercent size={20} />}
            label="Inventory"
          />
          <SideBarLink href="/menu" icon={<Logs size={20} />} label="Menu" />
          <SideBarLink
            href="/reports"
            icon={<ChartNoAxesColumn size={20} />}
            label="Reports"
          />
          <SideBarLink
            href="/employee"
            icon={<User size={20} />}
            label="Employee"
          />
          <SideBarLink
            href="/logout"
            icon={<LogOut size={20} />}
            label="Logout"
          />
        </ul>
      </aside>
      <main className="flex-1 ">
        <nav className=" bg-white shadow-xs border-b ">
          <div className="max-w-screen-2xl mx-auto px-6 py-4 flex  justify-between items-center">
            {getTitle(location.pathname)}
          </div>
        </nav>
        <div className="p-6 max-w-screen-2xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function getTitle(pathname: string) {
  switch (pathname) {
    case "/pos":
      return (
        <div>
          <h1 className="text-brown-600 font-bold text-xl">POS</h1>
          <span className="text-gray-600 text-sm">Point of Sale</span>
        </div>
      );
    case "/dashboard":
      return (
        <div>
          <h1 className="text-brown-600 font-bold text-xl">Dashboard</h1>
          <span className="text-gray-600 text-sm">Overview</span>
        </div>
      );
    case "/inventory":
      return "inventory";
    case "/employee":
      return (
        <div>
          <h1 className="text-brown-600 font-bold text-xl">Employee</h1>
          <span className="text-gray-600 text-sm">
            Manage your employee
          </span>
        </div>
      );
    case "/reports":
      return (
        <div>
          <h1 className="text-brown-600 font-bold text-xl">Reports</h1>
          <span className="text-gray-600 text-sm">
            Review your past transactions and order history
          </span>
        </div>
      );
    default:
      return "Dashboard";
  }
}

function SideBarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const location = useLocation();

  const isActive = location.pathname === href;
  return (
    <Link
      to={href}
      className={`flex gap-4 font-medium text-sm items-center  p-2 rounded-md w-full ${
        isActive
          ? "bg-brown-600 text-gray-50 bg-opacity-95"
          : "text-gray-500 hover:bg-brown-100"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

export default OwnerDefaultLayout;
