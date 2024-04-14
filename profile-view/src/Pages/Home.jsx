import React, { useState } from 'react';
import Signup from './signup';
import Login from './Login';
import { useGlitch } from 'react-powerglitch'
import './global.css'
import { useNavigate } from 'react-router-dom';
import useProfileData from '../Hooks/useProfileData';
import { CiLogout } from "react-icons/ci";

const Home = () => {
    const glitch = useGlitch()
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('userinfo'))

    const {username} = useProfileData()
    return (
        <>
            <div className='min-h-screen'>
            {
                user?.username ?
                <div className='h-screen px-5 md:px-0 flex items-center justify-center flex-col'>
                    <h1 className='md:text-[6rem] text-[3rem] text-center text-slate-200 uppercase' ref={glitch.ref} >Hello dear</h1>
                    {/* <span className='text-[#ddcf37]'>{user?.username}</span> */}
                    <p className='text-lg text-center '>Your account was created successfully. Let's share the social links with <span className='font-bold text-[#e4bf39]'>PROFILE-VIEW</span></p>

                    <span className='mt-1 text-slate-300 text-sm uppercase'>Hey <span className='bg-[#340b1d] text-[#a42a5f] px-2 font-bold'>{user?.username}</span> Click on arrange profile button </span>
                    <div className='flex items-center gap-3'>
                        <button onClick={() => navigate('/editprofile')} className='px-5 py-2 md:w-[200px] btn-bg rounded-md border-[1px] border-[#242424] uppercase mt-10'>Arrange Profile</button>
                        {
                            username &&
                        <button onClick={() => navigate(`/profile/${user.username}`)} className='px-5 py-2 md:w-[200px] btn-bg rounded-md border-[1px] border-[#242424] uppercase mt-10'>My Profile</button>
                    }
                        {
                            username &&
                            <button onClick={() => console.log('first')} className='px-5 py-2 btn-bg rounded-md border-[1px] border-[#242424]  mt-10 flex items-center  gap-2'><CiLogout className='text-lg' /> Log out</button>
                        }
                    </div>
                </div>
                :
                <>
                        <div className='h-screen flex items-center justify-center flex-col'>
                            <h1 className='md:text-[6rem] text-[4rem] text-center text-slate-200 uppercase'><span ref={glitch.ref} className='text-[#e4bf39] font-bold'>Hey dev!</span> <br /> Welcome to the "profile-view"</h1>
                            {
                                !user.username &&
                                    <div className='flex gap-2'>
                                        <div className="tooltip tooltip-open tooltip-bottom tooltip-info cursor-pointer " data-tip="click on it">
                                            <p className='text-white text-xl underline' onClick={() => navigate('/signup')}>tap create a profile </p> 
                                        </div>
                                        <p className='text-white text-xl' title="hello world">and show your social id's</p>
                                    </div>
                            }
                        </div>
                </>
            }
            
        </div>
        </>
    );
};

export default Home;