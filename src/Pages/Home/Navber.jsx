import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router'; 

import { AuthContext } from '../../Context/AuthContext/AuthContext';
import EduLogo from '../../Shared/EduLogo';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/login');
      })
      .catch(err => console.error(err));
  };

  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/allclass">All Classes</NavLink></li>
      <li><NavLink to="/teach">Teach on EduManage</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" role="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <EduLogo />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <img
              onClick={() => setDropdownOpen(!dropdownOpen)}
              src={user.photoURL || 'https://i.ibb.co/YpPKNmf/user.png'}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
              alt="profile"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded z-20">
                <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
                  {user.displayName || 'User'}
                </div>
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
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
          <Link to="/login" className="btn btn-sm btn-primary">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
