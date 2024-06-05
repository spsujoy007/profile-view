import React, { useEffect, useState } from 'react';
import { useGlitch } from 'react-powerglitch';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '../Hooks/useTitle';
import useProfileData from '../Hooks/useProfileData';
import toast from 'react-hot-toast';
import { CiLogout } from 'react-icons/ci';
import LoadingPage from './LoadingPage';


const UserHOME = ({username: name}) => {

    const glitch = useGlitch()
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('userinfo'))
    useTitle("Home")
    const {username, profile_link} = useProfileData()

    
    const [loading, setLoading] = useState(true)

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

    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/userdata?username=${user?.username}&token_id=${user?.user_token.split("%")[0]}`);
                const data = await response.json();
                console.log("Protect: ", data)
                if(data.code === 22){
                    setLoading(false)
                    localStorage.removeItem("userinfo")
                    navigate('/login')
                    return
                }
                else{
                    setLoading(false)
                }
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData()
    }, [])

    return (
        <>
            {
            loading ?
            <LoadingPage></LoadingPage>
            :
            <div className='h-[100vh] px-5 md:px-0 flex items-center justify-center flex-col min:h-screen'>
                        <h1 className={`${name?.length >= 10 ? `${name?.length >= 18 ? 'md:text-[4rem]' : 'md:text-[5rem]'}` : "md:text-[6rem]"} text-[2rem] text-center text-slate-200 uppercase `} ref={glitch.ref} >Hello {name}</h1>
                        <p className='text-lg text-center text-slate-200'>Your account was created successfully and you are also logged in. Let's share the social links with <span className='font-bold text-[#e4bf39]'>PROFILE-VIEW</span></p>

                        <span className='mt-1 text-slate-300 text-sm uppercase'><a href={profile_link} target='_blank' rel='noreferrer' className='bg-[#340b1d] text-[#a42a5f] px-2 font-bold'>{name}</a> Click on edit profile button to edit profile </span>
                        <div className=' mt-10 mx-auto w-full md:w-fit'>


                        <div className='mt-0 text-center'>
                            <ul className="menu uppercase lg:menu-horizontal btn-bg border-[1px] border-[#242424] rounded-box">
                                <li>
                                    <button onClick={() => navigate('/editprofile')} className='px-5 py-2 md:w-[200px] w-full  hover:btn-bg rounded-lg border-[1px] border-[#242424] uppercase text-slate-200'>Edit Profile</button>
                                </li>
                                <li>
                                    <button onClick={() => navigate(`/profile/${user.username}`)} className='px-5 py-2 md:w-[200px] w-full btn-bg md:ml-2 md:my-0 my-2 rounded-lg border-[1px] border-[#242424] uppercase text-slate-200'>My Profile</button>
                                </li>
                                <li>
                                    <details className=' md:ml-2 btn-bg text-slate-200 rounded-lg border-[1px] border-[#242424] uppercase' >
                                    <summary>
                                        More Options
                                    </summary>
                                    <ul className='bg-[#1212129f] border-[1px] border-[#242424]  p-2'>
                                        <li className='mb-2'>
                                            <button onClick={() => navigate('/ranks')} className='btn-bg rounded-lg border-[1px] border-[#242424] md:min-w-[150px]'>Ranked Profiles</button>
                                        </li>
                                        <li className='mb-2'>
                                            <button onClick={() => navigate('/likedprofiles')} className='btn-bg rounded-lg border-[1px] border-[#242424] md:min-w-[150px]'>Liked profiles</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleLogout()} className='btn-bg rounded-lg border-[1px] border-[#242424] md:min-w-[150px] uppercase flex justify-center items-center gap-2'><CiLogout/> Log out</button>
                                        </li>
                                    </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
        }
        </>
    );
};

export default UserHOME;