import React, { useEffect, useRef, useState } from 'react';
import Signup from './signup';
import Login from './Login';
import { useGlitch } from 'react-powerglitch'
import './global.css'
import { useNavigate } from 'react-router-dom';
import useProfileData from '../Hooks/useProfileData';
import { CiLogout } from "react-icons/ci";
import { RiSearch2Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import null_avatar from '../Assets/null_avatar.jpg'

import { HiOutlineInformationCircle, HiQuestionMarkCircle } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import LoadingPage from './LoadingPage';
import { useTitle } from '../Hooks/useTitle';
import MainHome from './MainHome';


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
            // window.location.reload()
        }
    }
    
    
    const [searchProfile, setSearchProfile] = useState('')
    const [searchedData, setSearchedData] = useState([])
    const [focusedMode, setFocusedMode] = useState(false)
    const handleSearchProfile = (e) => {
        if(searchProfile.length < 1){
            setFocusedMode(false)
        }
        else{
            setFocusedMode(true)
        }
            fetch(`https://profile-view-be.vercel.app/searchprofile?username=${e}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(data => {
                if(data.length ===0){
                    setSearchedData(undefined)
                }
                setSearchedData(data)
            })
    }
    return (
        <>
            {
                loading ?
                <LoadingPage></LoadingPage>
                :
                <div className='min-h-[100vh] relative'>
                {
                    user?.username ?
                    <div className='h-screen px-5 md:px-0 flex items-center justify-center flex-col min:h-screen'>
                        <h1 className={`${name.length >= 10 ? `${name.length >= 18 ? 'md:text-[4rem]' : 'md:text-[5rem]'}` : "md:text-[6rem]"} text-[2rem] text-center text-slate-200 uppercase `} ref={glitch.ref} >Hello {name}</h1>
                        <p className='text-lg text-center text-slate-200'>Your account was created successfully and you are also logged in. Let's share the social links with <span className='font-bold text-[#e4bf39]'>PROFILE-VIEW</span></p>

                        <span className='mt-1 text-slate-300 text-sm uppercase'><a href={profile_link} target='_blank' rel='noreferrer' className='bg-[#340b1d] text-[#a42a5f] px-2 font-bold'>{user?.username}</a> Click on <span className='text-white font-semibold'>edit profile & Links</span> button to Edit Profile & Links</span>
                        <div className=' mt-10 mx-auto w-full md:w-fit'>

                        {/* newly added item  */}
                        <div className='mt-0 text-center'>
                            <ul className="menu uppercase lg:menu-horizontal btn-bg border-[1px] border-[#242424] rounded-box">
                                <li>
                                    <button onClick={() => navigate('/editprofile')} className='px-5 py-2 md:w-[200px] w-full bg-white hover:btn-bg text-black rounded-lg border-[1px] border-[#242424]  hover:text-slate-200 font-semibold'>Edit Profile & Links</button>
                                </li>
                                {
                                    username &&
                                    <li>
                                        <button onClick={() => navigate(`/profile/${user.username}`)} className='px-5 py-2 md:w-[200px] w-full btn-bg md:ml-2 md:my-0 my-2 rounded-lg border-[1px] font-semibold border-[#242424] uppercase text-slate-200'>My Profile</button>
                                    </li>
                                }
                                <li>
                                    <details className=' md:ml-2 btn-bg text-slate-200 font-semibold rounded-lg border-[1px] border-[#242424] uppercase' >
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

                        {/* search profile data  */}
                        <div className='mt-5 absolute top-0 md:right-6 md:w-fit w-[89vw]'>
                            <div className='md:w-[300px]'>
                            <div className='flex items-center'>
                                <input
                                    onChange={(e) =>{ 
                                        setSearchProfile(e.target.value)
                                        if(e.target.value.length  === 0){
                                            setSearchProfile([])
                                        }
                                        handleSearchProfile(searchProfile)
                                    }
                                    }
                                    type="text" 
                                    placeholder="Search Profile..." 
                                    className=" w-full px-3 py-2 rounded-lg btn-bg border-[1px] border-[#242424] outline-none placeholder:text-gray-400" 
                                />
                                <RiSearch2Line className='-ml-8 text-white' />
                            </div>
                            </div>
                            {
                                focusedMode &&
                                <div className={`${searchedData.length > 0 && 'dropdown-open'} dropdown w-full`}>
                            {
                                searchProfile.length > 0 &&
                                <ul tabIndex={0} className="dropdown-content z-[1] menu shadow btn-bg border-[1px] border-[#242424] rounded-box w-full">
                                {
                                    searchedData.slice(0,`${searchProfile.length > 0 ? 5 : 0}`).map(u => 
                                        <li key={u.username} className='flex items-center w-full bg-[#121212] rounded-lg'>
                                            <a className='w-full' href={`/profile/${u.username}`}>
                                            <img className='w-[30px] h-[30px] rounded-full' src={u.profile_pic ? u.profile_pic : null_avatar} alt="" />
                                                {u.name ? u.name : u.username}</a>
                                        </li>
                                    )
                                }
                            </ul>
                            }
                            </div>
                            }
                        </div>
                        </div>
                    </div>
                    :
                    <>
                            <MainHome></MainHome>
                    </>
                }
                 
                <div className='absolute md:bottom-5 right-10  bottom-5 rounded-full md:flex md:flex-row flex-col gap-2 hidden'>
                    <a target='_blank' rel='noreferrer' href='https://github.com/spsujoy007/' className='flex items-center gap-1 text-white hover:underline'><HiQuestionMarkCircle className='text-xl mt-1' /> How to use profile-view</a>
                    <p>|</p>
                    <a target='_blank' rel='noreferrer' href='https://github.com/spsujoy007/' className='flex items-center gap-1 text-white hover:underline'><HiOutlineInformationCircle className='text-xl mt-1' /> creator information</a>
                    <p>|</p>
                    <a target='_blank' rel='noreferrer' href='https://profileview-v01.web.app/profile/@spsujoy' className='flex items-center gap-1 text-white hover:underline'><MdAdminPanelSettings  className='text-xl mt-1' /> creator profile</a>
                </div>

                <div className='ml-3 pb-5 md:hidden  text-center'>
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