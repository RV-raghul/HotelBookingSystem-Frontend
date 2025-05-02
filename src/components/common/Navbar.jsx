import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useLogout from '../hooks/useLogout';

function Navbar({ setIsAuthenticated }) {
  const logout = useLogout();
  const role = sessionStorage.getItem('role')
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-[10vh] bg-black flex justify-between sticky top-0 z-50">
      <div className="flex ml-2 items-center">
        <img src="src/assets/Logo.png" alt="logo" className="h-20" />
        <h1 className="playwrite-hu-header text-white text-3xl ml-1">onlyHotels</h1>
      </div>
      <div className="flex items-center mr-5 relative" ref={dropdownRef}>
        <div
          className="border border-white rounded-full hover:cursor-pointer"
          onClick={toggleDropdown}
        >
         { role === 'USER' && ( <img src="src/assets/profile.png" alt="profile" className="w-12 h-12" />) }
        </div>

        {dropdownOpen && role === 'USER' && (
          <div className="absolute top-14 right-0 bg-white rounded-md shadow-lg py-2 w-48 z-10">
             <p
              className="px-4 subheader py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/");
                setDropdownOpen(false);
              }}
            >
              Home
            </p>
            
            <p
              className="px-4 subheader py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/profile");
                setDropdownOpen(false);
              }}
            >
              Profile
            </p>
            <p
              className="px-4 py-2 subheader text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/bookings");
                setDropdownOpen(false);
              }}
            >
              My Bookings
            </p>
          </div>
        )}

        <div
          onClick={handleLogout}
          className="flex ml-5 hover:cursor-pointer"
          title="Logout"
        >
          <img
            src="src/assets/logout_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
            alt="logout"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
