import React from 'react'
import { clearButton, logo, notificationBell, searchIcon, threeHorizontalLines, userAvatar } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';

const Header = () => {
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
      <button className="hover:bg-gray-100 p-2 rounded-md transition-colors" onClick={() => toggleMenuHandler()}>
        <img alt="menu" src={threeHorizontalLines} className="w-6 h-6 cursor-pointer"></img>
      </button>

      <button>
        <img alt="logo" src={logo} className="mx-12 h-12 w-auto"></img>
      </button>

      <div className="relative flex items-center flex-grow mx-8">
        <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-16 top-1/2 -translate-y-1/2">
            <img
              alt="clear search bar"
              src={clearButton}
              className="w-5 h-5 text-gray-400"
            ></img>
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 border-black">
            <img
              src={searchIcon}
              alt="search icon"
              className="w-9 h-9 text-gray-500"
            ></img>
          </button>
        </div>
      </div>

      <button className="hover:bg-gray-100 p-2 rounded-md transition-colors">
        <img
          alt="notification bell"
          src={notificationBell}
          className="w-6 h-6"
        ></img>
      </button>

      <button className="hover:bg-gray-100 p-2 rounded-md transition-colors ml-2">
        <img
          alt="user avatar"
          src={userAvatar}
          className="w-8 h-8 rounded-full"
        ></img>
      </button>
    </div>
  );
};

export default Header;