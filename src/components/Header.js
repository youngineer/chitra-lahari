import React, { useEffect, useState } from 'react'
import { clearButton, logo, notificationBell, searchIcon, threeHorizontalLines, userAvatar, YOUTUBE_SEARCH_API } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getSearchSuggestions = async() => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await data.json();
      console.log(json[1]);
      
      setSuggestions(json[1] || []); // Safely set suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]); // Clear suggestions on error
    }
  };

  useEffect(() => {
    // Only fetch if search query has some length
    if (searchQuery.trim()) {
      const timer = setTimeout(() => {
        getSearchSuggestions();
      }, 200);
    
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm fixed w-full">
      <button
        className="hover:bg-gray-100 p-2 rounded-md transition-colors"
        onClick={toggleMenuHandler}
      >
        <img
          alt="menu"
          src={threeHorizontalLines}
          className="w-6 h-6 cursor-pointer"
        />
      </button>

      <button>
        <img alt="logo" src={logo} className="mx-10 h-14 w-auto" />
      </button>

      <div className="relative flex items-center flex-grow mx-8">
        <div className="relative w-3/4">
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value)
                e.preventDefault();
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)} 
            />
            {suggestions.length > 0 && showSuggestions && (
              <ul className="absolute z-10 w-full py-2 rounded-lg bg-white shadow-2xl mt-1 cursor-default">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="hover:bg-slate-200 px-2 py-1 cursor-default"
                  >
                    🔍 {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {searchQuery && (
            <button 
              className="absolute right-16 top-1/2 -translate-y-1/2"
              onClick={handleClearSearch}
            >
              <img
                alt="clear search bar"
                src={clearButton}
                className="w-5 h-5 text-gray-400"
              />
            </button>
          )}
          <button className="absolute right-2 top-1/2 -translate-y-1/2 border-black">
            <img
              src={searchIcon}
              alt="search icon"
              className="w-9 h-9 text-gray-500"
            />
          </button>
        </div>
      </div>

      <button className="hover:bg-gray-100 p-2 rounded-md transition-colors">
        <img
          alt="notification bell"
          src={notificationBell}
          className="w-6 h-6"
        />
      </button>

      <button className="hover:bg-gray-100 p-2 rounded-md transition-colors ml-2">
        <img
          alt="user avatar"
          src={userAvatar}
          className="w-8 h-8 rounded-full"
        />
      </button>
    </div>
  );
};

export default Header;