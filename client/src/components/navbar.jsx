import React from 'react'
import { PiHouseSimpleBold, PiBookmarksFill, Subscribe } from "react-icons/pi";
import { BiSolidLike } from "react-icons/bi";
import Image from 'next/image';

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

    const navItemDesigns = "text-lg font-medium text-gray-700 cursor-pointer py-3 border border-[#fff] hover:border-gray-200 duration-300 pl-5 rounded-[20px] mb-2 flex justify-start items-center gap-3";


  return (
    <div className='w-80 p-5 fixed bg-[#fdfdfe] h-screen rounded-3xl shadow-2xl shadow-mauve-300'>
        <h1 className='text-2xl font-bold mb-5 pl-5'>ProfilesView</h1>
        {/* <Image width={"300"} height={"10"} alt='logo' src={'/logos/fulllogo.png'}></Image> */}
        <ul>
            {navItems.map((item, index) => (
                <li key={index} className={navItemDesigns}>
                    {item.icon}
                    {item.name}
                </li>
            ))}
        </ul>
    </div>
  )
}
