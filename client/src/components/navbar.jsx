import React from 'react'
import { PiHouseSimpleBold, PiBookmarksFill } from "react-icons/pi";
import { BiSolidLike } from "react-icons/bi";
import ThemeToggle from './ThemeToggle';

export default function Navbar() {

    const navItems = [
        {
            name: "Home",
            icon: <PiHouseSimpleBold />
        },
        {
            name: "Saved",
            icon: <PiBookmarksFill />
        },
        {
            name: "Liked",
            icon: <BiSolidLike />
        }
    ];

    const navItemDesigns = "text-lg font-medium text-gray-700 dark:text-gray-300 cursor-pointer py-3 border border-[#fff] dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 duration-300 pl-5 rounded-[20px] mb-2 flex justify-start items-center gap-3";


  return (
    <div className='w-80 p-5 fixed bg-[#fdfdfe] dark:bg-[#1a1d24] h-screen rounded-3xl shadow-2xl shadow-mauve-300 dark:shadow-none dark:border dark:border-gray-800 transition-colors duration-300'>
        <h1 className='text-2xl font-bold mb-5 pl-5'>ProfilesView</h1>
        <ul>
            {navItems.map((item, index) => (
                <li key={index} className={navItemDesigns}>
                    {item.icon}
                    {item.name}
                </li>
            ))}
        </ul>
        <div className="mt-auto pt-10 pl-5">
          <ThemeToggle />
        </div>
    </div>
  )
}
