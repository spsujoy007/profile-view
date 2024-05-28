import React from 'react';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import useProfileData from '../Hooks/useProfileData';
import './Navbar.css'
import logo from '../Assets/profile-view logo icon.jpg'

const Navbar = () => {

    // const navigate = useNavigate()
    // const user = useProfileData()
    return (
        <div className='relative w-full'>
            <div className='fixed top-0 w-full z-[100]'>
            <div className='w-[1240px] mx-auto  '>
            <div className="navbar h-[60px]">
  <div className="navbar-start ">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href='/'>Home</a></li>
            <li><a href='/likedprofiles'>Liked profiles</a></li>
            <li><a href='/ranks'>Ranking</a></li>
            <li><a href='/feedback'>Feedback</a></li>
      </ul>
        </div>
        <a href='/' className="btn btn-ghost text-xl">
            <img className='w-[50px]' src={logo} alt="" />
            <p className='text-white'>Profile view</p>
        </a>
    </div>
    <div className="navbar-center hidden lg:flex ml-auto">
        <ul className="menu menu-horizontal px-1">
            <li><a href='/'>Home</a></li>
            <li><a href='/likedprofiles'>Liked profiles</a></li>
            <li><a href='/ranks'>Ranking</a></li>
            {
                
            }
            <li><a href='/feedback'>Feedback</a></li>
        </ul>
    </div>
    </div>

        </div>
            </div>
    <div className='navbg'>

    </div>
        </div>
    );
};

export default Navbar;