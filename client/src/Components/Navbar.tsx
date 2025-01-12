import { Link, useNavigate } from "react-router-dom";
import Logo from "@/Assets/login_logo.png";
import { useStateContext } from "../Contexts/ContextProvider";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, ShoppingBag, User } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { Auth_Logout } from "../Pages/Auth/Auth_Util";
import OrderSummary from "../Pages/Owner/POSComp/OrderSummary";
import { useState } from "react";
import { usePosStateContext } from "../Contexts/POSContextProvider";

function Navbar() {
  const { user } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const {posOrder} = usePosStateContext()
  return (
    <div className="sticky top-0 z-5 w-full border-b bg-white">
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
          {user && user?.role == "Customer" ? (
            <>
              <Link
                to="/customer"
                className="text-brown-600 hover:text-brown-800"
              >
                Menu
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="relative text-brown-800 hover:text-brown-600"
              >
                <ShoppingBag className="h-6 w-6" />
                {posOrder?.meals.length != 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {posOrder?.meals.length}
                  </span>
                )}
              </button>
              {<UserNav />}
              <OrderSummary isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
          ) : (
            <>
              {" "}
              <Link to="/" className="text-brown-600 hover:text-brown-800">
                Home
              </Link>
              {/* <Link to="/about" className="text-brown-600 hover:text-brown-800">
            About
          </Link> */}
              <Link to="/login">
                <button className="rounded-md bg-brown-600 px-4 py-2 text-white hover:bg-brown-700">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
function UserNav() {
  const { user,setToken } = useStateContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const logout = await Auth_Logout();
    if (logout.status) {
      setToken(null);
      navigate("/login");
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <Menu.Button className="flex items-center gap-1 px-4 py-2 text-gray-900 rounded-md hover:bg-gray-100">
          <User className="h-4 w-4 text-gray-700" />
          {user?.fullName}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/customer/order"
                  className={`${
                    active ? "bg-brown-600 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  My Orders
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${
                    active ? "bg-brown-600 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-brown-600 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
