import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/Assets/login_logo.png";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Whisked logo" className="h-10" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-brown-800">
              Whisked Cafe
            </span>
            <span className="mt-[-.2rem] text-gray-700">by Ericka</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-brown-600 hover:text-brown-800">
            Home
          </Link>
          <Link to="/menu" className="text-brown-600 hover:text-brown-800">
            Menu
          </Link>
          <Link to="/about" className="text-brown-600 hover:text-brown-800">
            About
          </Link>
          <Link to="/login">
            <button className="rounded-md bg-brown-600 px-4 py-2 text-white hover:bg-brown-700">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
