import React, { useEffect, useRef, useState } from 'react';
import Signup from './signup';
import Login from './Login';
import { useGlitch } from 'react-powerglitch'
import './global.css'
import { useNavigate } from 'react-router-dom';
import useProfileData from '../Hooks/useProfileData';
import { CiLogout } from "react-icons/ci";
import toast from 'react-hot-toast';
import { HiOutlineInformationCircle, HiQuestionMarkCircle } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import LoadingPage from './LoadingPage';
import { useTitle } from '../Hooks/useTitle';


const Home = () => {
    const glitch = useGlitch()
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('userinfo'))
    useTitle("Home")
    const {username, name, profile_link} = useProfileData()

    
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(user.username === username){
            setLoading(false)
        }
    }, [user, username])

    const handleLogout = () => {
        const permission = window.confirm("Are sure want to logout?")
        if(permission){
            localStorage.removeItem('userinfo')     
            setTimeout(() => {
                window.location.reload()
                toast.success("Logout successful")
            }, 1000);
        }
        else{
            window.location.reload()
        }
    }

    return (
        <>
            {
                loading ?
                <LoadingPage></LoadingPage>
                :
                <div className='min-h-screen relative'>
                {
                    user?.username ?
                    <div className='h-screen px-5 md:px-0 flex items-center justify-center flex-col min:h-screen'>
                        <h1 className={`${name.length >= 10 ? `${name.length >= 18 ? 'md:text-[4rem]' : 'md:text-[5rem]'}` : "md:text-[6rem]"} text-[2rem] text-center text-slate-200 uppercase `} ref={glitch.ref} >Hello {name}</h1>
                        <p className='text-lg text-center '>Your account was created successfully and you are also logged in. Let's share the social links with <span className='font-bold text-[#e4bf39]'>PROFILE-VIEW</span></p>

                        <span className='mt-1 text-slate-300 text-sm uppercase'><a href={profile_link} target='_blank' rel='noreferrer' className='bg-[#340b1d] text-[#a42a5f] px-2 font-bold'>{user?.username}</a> Click on arrange profile button to edit profile </span>
                        <div className=' mt-10 mx-auto w-full md:w-fit'>
                        {/* <div className='flex md:flex-row gap-3 flex-col items-center  '>
                            <button onClick={() => navigate('/editprofile')} className='px-5 py-2 md:w-[200px] w-full btn-bg rounded-md border-[1px] border-[#242424] uppercase '>Arrange Profile</button>
                            {
                                username &&
                            <button onClick={() => navigate(`/profile/${user.username}`)} className='px-5 py-2 md:w-[200px] w-full btn-bg rounded-md border-[1px] border-[#242424] uppercase '>My Profile</button>
                            }
                            
                        </div> */}

                        {/* newly added item  */}
                        <div className='mt-0 text-center'>
                            {/* <button onClick={() => navigate('/ranks')} className='pt-2 border-t-[1px] hover:underline border-[#fff] text-slate-300 capitalize px-3'>click to see ranked profiles</button> */}
                            <ul className="menu uppercase lg:menu-horizontal btn-bg border-[1px] border-[#242424] rounded-box">
                                <li>
                                    <button onClick={() => navigate('/editprofile')} className='px-5 py-2 md:w-[200px] w-full btn-bg rounded-lg border-[1px] border-[#242424] uppercase '>Arrange Profile</button>
                                </li>
                                {
                                    username &&
                                    <li>
                                        <button onClick={() => navigate(`/profile/${user.username}`)} className='px-5 py-2 md:w-[200px] w-full btn-bg md:ml-2 md:my-0 my-2 rounded-lg border-[1px] border-[#242424] uppercase '>My Profile</button>
                                    </li>
                                }
                                <li>
                                    <details className=' md:ml-2 btn-bg  rounded-lg border-[1px] border-[#242424] uppercase' >
                                    <summary>
                                        More Options
                                    </summary>
                                    <ul className='md:bg-[black] p-2'>
                                        <li className='mb-2'>
                                            <button onClick={() => navigate('/ranks')} className='btn-bg rounded-lg border-[1px] border-[#242424] md:min-w-[150px]'>Ranked Profiles</button>
                                        </li>
                                        <li className='mb-2'>
                                            <button onClick={() => navigate('/likedprofiles')} className='btn-bg rounded-lg border-[1px] border-[#242424] md:min-w-[150px]'>Liked profiles</button>
                                        </li>
                                        {
                                            username &&
                                            <li>
                                                <button onClick={() => handleLogout()} className='btn-bg rounded-lg border-[1px] border-[#242424] md:min-w-[150px] uppercase flex justify-center items-center gap-2'><CiLogout/> Log out</button>
                                            </li>
                                        }
                                    </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    :
                    <>
                            <div className='h-screen flex items-center justify-center flex-col w-[80%] mx-auto overflow-hidden'>
                                <h1 className='md:text-[5rem] text-[3rem] text-center text-slate-200 uppercase'><span ref={glitch.ref} className='text-[#e4bf39] font-bold'>Hey dev!</span> <br /><span className='md:text-[5rem] text-xl'>Welcome to the "profile-view"</span></h1>
                                {
                                    !user.username &&
                                        <div className="mt-5 cursor-pointer ">
                                            {/* <p className='text-white text-xl underline' onClick={() => navigate('/signup')}>tap to create a profile </p>  */}
                                            <button onClick={() => navigate('/signup')} className='px-5 py-2 md:w-[300px] w-full btn-bg md:ml-2 md:my-0 my-2 rounded-lg border-[1px] border-[#242424] uppercase '>Create a profile</button>
                                        </div>
                                }
                                <div className='mt-20 text-center'>
                                    <button onClick={() => navigate('/ranks')} className='pt-2 underline text-slate-300 capitalize px-3'>see ranked profiles</button>
                                </div>
                            </div>
                    </>
                }
                                    {/* <a href="" className='text-lg flex items-center gap-2 underline'><FaGithubAlt /> Github</a> */}
                <div className='absolute md:bottom-5 right-10  bottom-5 rounded-full md:flex md:flex-row flex-col gap-2 hidden'>
                    <a target='_blank' rel='noreferrer' href='https://github.com/spsujoy007/' className='flex items-center gap-1 text-white hover:underline'><HiQuestionMarkCircle className='text-xl mt-1' /> How to use profile-view</a>
                    <p>|</p>
                    <a target='_blank' rel='noreferrer' href='https://github.com/spsujoy007/' className='flex items-center gap-1 text-white hover:underline'><HiOutlineInformationCircle className='text-xl mt-1' /> creator information</a>
                    <p>|</p>
                    <a target='_blank' rel='noreferrer' href='https://profileview-v01.web.app/profile/@spsujoy' className='flex items-center gap-1 text-white hover:underline'><MdAdminPanelSettings  className='text-xl mt-1' /> creator profile</a>
                </div>

                <div className='ml-3 pb-5 rounded-full md:hidden  text-center'>
                    <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/posts/spsujoy_webdevelopment-coding-software-activity-7190239137977847809-YuxJ?utm_source=share&utm_medium=member_desktop' className='flex items-center gap-1 text-white hover:underline'><HiQuestionMarkCircle className='text-xl mt-1' /> How to use profile-view</a>
                    <a target='_blank' rel='noreferrer' href='https://github.com/spsujoy007/' className='flex items-center gap-1 text-white hover:underline'><HiOutlineInformationCircle className='text-xl mt-1' /> creator information</a>
                    <a target='_blank' rel='noreferrer' href='https://profileview-v01.web.app/profile/@spsujoy' className='flex items-center gap-1 text-white hover:underline'><MdAdminPanelSettings  className='text-xl mt-1' /> creator profile</a>
                </div>
            </div>
            }
        </>
    );
};

export default Home;