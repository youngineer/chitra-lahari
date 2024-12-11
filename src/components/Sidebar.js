import React from 'react'
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);

  if (!isMenuOpen) return null;
  
  return (
    <div className='w-48 shadow-lg px-4'>
      <ul className='cursor-pointer font-semibold m-2'>
        <li>Home</li>
        <li>Shorts</li>
        <li>Subscription</li>
      </ul>
      <hr></hr>

      <h4 className='cursor-pointer font-semibold'>You</h4>
      <ul className='cursor-pointer m-2'>
        <li>History</li>
        <li>Playlists</li>
        <li>Watch later</li>
        <li>Liked Videos</li>
      </ul>
      <hr></hr>

      <h4 className='cursor-pointer font-semibold'>Explore</h4>
      <ul className='cursor-pointer m-2'>
        <li>Trending</li>
        <li>Shopping</li>
        <li>Movies</li>
      </ul>
      <hr></hr>

    </div>
  );
};

export default Sidebar