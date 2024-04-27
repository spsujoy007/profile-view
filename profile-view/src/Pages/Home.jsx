import React, { useEffect, useRef, useState } from 'react';
import Signup from './signup';
import Login from './Login';
import { useGlitch } from 'react-powerglitch'
import './global.css'
import { useNavigate } from 'react-router-dom';
import useProfileData from '../Hooks/useProfileData';
import { CiLogout } from "react-icons/ci";
import toast from 'react-hot-toast';
import { HiOutlineInformationCircle } from "react-icons/hi2";
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
                    <div className='h-screen px-5 md:px-0 flex items-center justify-center flex-col'>
                        {/* <h1 className={`${user.username.length >= 10 ? "md:text-[5rem]" : "md:text-[6rem]"} text-[3rem] text-center text-slate-200 uppercase `} ref={glitch.ref} >Hello {user.username.split("@")[1]}</h1> */}
                        <h1 className={`${name.length >= 10 ? `${name.length >= 18 ? 'md:text-[4rem]' : 'md:text-[5rem]'}` : "md:text-[6rem]"} text-[3rem] text-center text-slate-200 uppercase `} ref={glitch.ref} >Hello {name}</h1>
                        {/* <span className='text-[#ddcf37]'>{user?.username}</span> */}
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
                                        <button onClick={() => navigate(`/profile/${user.username}`)} className='px-5 py-2 md:w-[200px] w-full btn-bg md:ml-1 md:my-0 my-2 rounded-lg border-[1px] border-[#242424] uppercase '>My Profile</button>
                                    </li>
                                }
                                <li>
                                    <details className=' md:mx-1 btn-bg  rounded-lg border-[1px] border-[#242424] uppercase' >
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
                                        {/* <li>
                                        <details >
                                            <summary>Parent</summary>
                                            <ul>
                                            <li><a>item 1</a></li>
                                            <li><a>item 2</a></li>
                                            </ul>
                                        </details>
                                        </li> */}
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
                                <h1 className='md:text-[5rem] text-[4rem] text-center text-slate-200 uppercase'><span ref={glitch.ref} className='text-[#e4bf39] font-bold'>Hey dev!</span> <br /> Welcome to the "profile-view"</h1>
                                {
                                    !user.username &&
                                        <div className='flex gap-2'>
                                            <div className="tooltip tooltip-open tooltip-bottom tooltip-warning cursor-pointer " data-tip="click on it">
                                                <p className='text-white text-xl underline' onClick={() => navigate('/signup')}>tap to create a profile </p> 
                                            </div>
                                            <p className='text-white text-xl' title="hello world">and show your social id's</p>
                                        </div>
                                }
                                <div className='mt-20 text-center'>
                                    <button onClick={() => navigate('/ranks')} className='pt-2 border-t-[1px] hover:underline border-[#fff] text-slate-300 capitalize px-3'>see ranked profiles</button>
                                </div>
                            </div>
                    </>
                }
                                    {/* <a href="" className='text-lg flex items-center gap-2 underline'><FaGithubAlt /> Github</a> */}
                <div className='absolute md:top-5 right-10 md:bottom-auto bottom-5 rounded-full flex gap-2'>
                    <a target='_blank' rel='noreferrer' href='https://github.com/spsujoy007/' className='flex items-center gap-1 text-white underline'><HiOutlineInformationCircle className='text-xl mt-1' /> creator information</a>
                    <p>|</p>
                    <a target='_blank' rel='noreferrer' href='https://profileview-v01.web.app/profile/@spsujoy' className='flex items-center gap-1 text-white underline'><MdAdminPanelSettings  className='text-xl mt-1' /> creator profile</a>
                </div>
            </div>
            }
        </>
    );
};

export default Home;