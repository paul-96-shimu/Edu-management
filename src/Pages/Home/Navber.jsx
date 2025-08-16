import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import EduLogo from "../../Shared/EduLogo";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  // Routes when logged out
  const publicNavItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allclass">All Classes</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contacts Us</NavLink>
      </li>
    </>
  );

  // Routes when logged in (extra protected routes)
  const privateNavItems = (
    <>
      {publicNavItems}
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/teach">Teach on EduManage</NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 w-full z-50 bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden"
                role="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 text-black rounded-box w-52"
              >
                {user ? privateNavItems : publicNavItems}
              </ul>
            </div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <EduLogo />
              <span>EduManage</span>
            </Link>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {user ? privateNavItems : publicNavItems}
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end">
            {user ? (
              <div className="relative">
                <img
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  src={user.photoURL || "https://i.ibb.co/YpPKNmf/user.png"}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                  alt="profile"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg border rounded z-20">
                    <div className="px-4 py-2 text-sm font-semibold border-b">
                      {user.displayName || "User"}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-sm btn-secondary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
