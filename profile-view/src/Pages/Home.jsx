import React, { useEffect, useRef, useState } from 'react';
import Signup from './signup';
import Login from './Login';
import { useGlitch } from 'react-powerglitch'
import './global.css'
import { useNavigate } from 'react-router-dom';
import useProfileData from '../Hooks/useProfileData';
import { CiLogout } from "react-icons/ci";
import { RiSearch2Line } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";
import toast from 'react-hot-toast';
import null_avatar from '../Assets/null_avatar.jpg'

import { HiOutlineInformationCircle, HiQuestionMarkCircle } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import LoadingPage from './LoadingPage';
import { useTitle } from '../Hooks/useTitle';
import MainHome from './MainHome';
import UserHOME from './UserHOME';


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

    return (
        <>
            {
                loading ?
                <LoadingPage></LoadingPage>
                :
                <div className='min-h-[100vh]'>
                {
                    user?.username ?
                    <UserHOME username={name}></UserHOME>
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