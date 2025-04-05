import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FireBase";
import { useContext } from "react";
import { ProductContext } from "../components/ProductContext";

const NavBar = () => {
  const { cart } = useContext(ProductContext);
  const [authUser, setAuthUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => listen();
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign out successful"))
      .catch((error) => console.log(error));
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contactSection');
    contactSection.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8 px-[50px]">
          <NavLink
            to="/"
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            Home
          </NavLink>

          <button
            onClick={scrollToContact}
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            Contact
          </button>

          <NavLink
            to="/cart"
            className="relative flex items-center gap-1 hover:text-gray-300 transition"
          >
            <FaCartPlus className="text-xl" />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <div className="hidden lg:flex items-center gap-6">
          {authUser ? (
            <>
              <span className="text-sm text-gray-300 sm:max-w-none sm:truncate">
                <span className="block sm:inline">
                  {authUser.email.length > 10
                    ? authUser.email.substring(0, 3) + "..." + authUser.email.substring(authUser.email.indexOf("@"))
                    : authUser.email}
                </span>
              </span>

              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                aria-label="Logout from account"
                onClick={userSignOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hover:text-gray-300 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center mt-4 space-y-4 bg-gray-900 p-4">
          {authUser ? (
            <>
              <span className="text-sm text-gray-300">
                {authUser.email.length > 10
                  ? authUser.email.substring(0, 3) + "..." + authUser.email.substring(authUser.email.indexOf("@"))
                  : authUser.email}
              </span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                aria-label="Logout from account"
                onClick={userSignOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hover:text-gray-300 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
