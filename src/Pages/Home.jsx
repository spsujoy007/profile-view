import React, { useState } from 'react';
import Signup from './signup';
import Login from './Login';
import { useGlitch } from 'react-powerglitch'
import './global.css'

const Home = () => {
    const glitch = useGlitch()
    const [singup, setSignup] = useState(false)
    let user = JSON.parse(localStorage.getItem('userinfo'))[0]
    console.log(user)
    return (
        <div className='h-screen'>
            {
                user?.username ?
                <div className='h-screen flex items-center justify-center flex-col'>
                    <h1 className='text-[6rem] text-center text-slate-200 uppercase' ref={glitch.ref} >Hello dear</h1>
                    {/* <span className='text-[#ddcf37]'>{user?.username}</span> */}
                    <p className='text-lg'>Your account was created successfully. Let's share the social links with <span className='font-bold text-[#e4bf39]'>PROFILE-VIEW</span></p>
                    {/* <div className='bg-[#14040c] text-[#af2d6c] mt-3 py-[0.5px] rounded-full w-[20%] text-center'>
                        {user?.username}
                    </div> */}
                    <span className='mt-1 text-slate-300 text-sm uppercase'>Hey <span className='bg-[#340b1d] text-[#a42a5f] px-2 font-bold'>{user?.username}</span> Click on arrange profile button </span>
                    <button className='px-5 py-2 w-[300px] btn-bg rounded-md border-[1px] border-[#242424] uppercase mt-10'>Arrange Profile</button>
                </div>
                :
                <>
                    {
                        singup ? 
                        <Signup signup={setSignup}></Signup>
                        :
                        <div className='h-screen flex items-center justify-center flex-col'>
                            <h1 className='md:text-[6rem] text-[4rem] text-center text-slate-200 uppercase'><span ref={glitch.ref} className='text-[#e4bf39] font-bold'>Hey dev!</span> <br /> Welcome to the "profile-view"</h1>
                            {
                                !user.username &&
                                    <div className='flex gap-2'>
                                        <div className="tooltip tooltip-open tooltip-bottom tooltip-info cursor-pointer " data-tip="click on it">
                                            <p className='text-white text-xl underline' onClick={() => setSignup(!singup)}>tap create a profile </p> 
                                        </div>
                                        <p className='text-white text-xl' title="hello world">and show your social id's</p>
                                    </div>
                            }
                        </div>
                    }
                </>
            }
            
        </div>
    );
};

export default Home;