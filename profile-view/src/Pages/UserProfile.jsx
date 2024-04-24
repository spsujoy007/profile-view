import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useProfileData from '../Hooks/useProfileData';
import null_avatar from '../Assets/null_avatar.jpg'

import bgProfile from '../Assets/profilebg.jpg'

import './UserProfile.css'
import { FaDatabase, FaDribbble, FaFacebook, FaGithub, FaHackerrank, FaInstagram, FaLinkedin, FaPager, FaTwitter } from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";
import { IoReturnDownBack } from "react-icons/io5";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
  } from "react-share";
import LoadingPage from './LoadingPage';
  

const UserProfile = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        if(localStorage.getItem('userinfo')){
            setUser(JSON.parse(localStorage.getItem('userinfo')))
        }
    }, [])

    const [loading, setLoading] = useState(true)
    const [checkValid, setCheckValid] = useState(true)
    
    const {
        bio, 
        name, 
        username,
        profile_link,
        github_link,
        twitter_link,
        portfolio_link,
        hackerRank_link,
        profile_pic, 
        dribble_link,
        linkedin_link,
        facebook_link,
        codeForce_link,
        instagram_link,
    } = useLoaderData()
    const navigate = useNavigate()

    useEffect(() => {
        if(username){
            setLoading(false)
        }
        else if(!username){
            setLoading(false)
            setCheckValid(false)
            // goHome()
        }
    }, [username])

    const pathname = window.location.pathname.split("/")[2]

    // for return home automatic ===========================
    const [timer, setTimer] = useState(5)
    if(!checkValid){
        if(timer === 0){
            navigate('/')
        }
        if(timer !== 0){
            setInterval(() => {
                setTimer(timer - 1)
            }, 1000)
        }
    }
    //======================================================

    return (
        <>
            {
                loading ?
                <LoadingPage></LoadingPage>
                :
                <>
                    {
                        !checkValid ?
                        <div className='min-h-screen flex items-center justify-center bg-[#000000d0]'>
                            <div>
                                <p className=' text-xl'>Profile-view says: This is a invalid URL. No user founded in our database with this username: <span className='font-bold text-yellow-600'>{pathname}</span></p>
                                <span className='text-white font-bold'>Check again and back to profile-view</span>
                                <p className='mt-5'>Back to home in <span className='text-red-700 font-bold'>({timer}) seconds</span></p>
                            </div>
                        </div>
                        :
                        <div className='min-h-screen pt-20'>
            <div className='md:max-w-[800px] mx-auto flex justify-end'>
                <p onClick={() => navigate('/')} className='mr-5 py-2 flex items-end gap-3 hover:text-white cursor-pointer duration-200'>back to home page<IoReturnDownBack /></p>
            </div>
            <div style={{
                backgroundImage: `linear-gradient(150deg, #000000c6, #000000fd), url(${profile_pic ? profile_pic : bgProfile})`,
                width: '100%',
                height: '100%',  // or any other dimensions
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                imageRendering: 'pixelated'
            }}
            className=' md:max-w-[800px] mx-auto border-[1px] border-[#2e2e2e] bg-[#181818] rounded-xl p-5 min-h-[500px]'>
                <div className='flex items-center gap-4 '>
                    <img className='userImage w-[80px] h-[80px] rounded-xl border-[1px] border-[#2e2e2e] p-1' src={profile_pic != null ? profile_pic : null_avatar} alt="" />
                    <div>
                        <h3 className='text-[26px] uppercase py-0 font-bold text-white'>{name}</h3>
                        <p className='text-lg text-white'>{bio}</p>
                    </div>
                </div>

                <div className='border-[1px] border-[#2e2e2e] mt-10 p-2 rounded-xl bg-[#151515bb]'>
                    {
                        (github_link === null && hackerRank_link ===null && codeForce_link ===null && linkedin_link ===null && portfolio_link ===null && dribble_link ===null && facebook_link ===null && twitter_link ===null && instagram_link ===null) &&
                        <div>
                            <p>Nothing to show</p>
                        </div>
                    }
                    {
                    (github_link !=null || hackerRank_link !=null || codeForce_link !=null) &&
                <div className=''>
                    <p className=''>coding related</p>
                        <div className='mt-2 grid md:grid-cols-3 grid-cols-1 gap-2'>
                        {
                            github_link &&<a href={github_link} target='_blank' rel="noreferrer" className='flex items-center gap-2 bg-[#222222] hover:bg-[#ededed] rounded-lg border-[1px] border-black hover:border-[#3d3d3d] duration-300 text-white hover:text-black p-2'><FaGithub className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Github</p>
                                    <p className='text-sm'>Find out my projects</p>
                                </div>
                            </a>
                        }
                        {
                            hackerRank_link &&<a href={hackerRank_link} target='_blank' rel="noreferrer" className='flex items-center gap-2 bg-[#222222] hover:bg-[#29a05d] rounded-lg border-[1px] border-black hover:border-[#3d3d3d] duration-300 text-white px-3 py-1'><FaHackerrank className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>HackerRank</p>
                                    <p className='text-sm'>problem solving skills</p>
                                </div>
                            </a>
                        }
                        {
                            codeForce_link &&<a href={codeForce_link} target='_blank' rel="noreferrer" className='flex items-center gap-2 bg-[#222222] hover:bg-[#B41F25] rounded-lg border-[1px] border-black hover:border-[#3d3d3d] duration-200 text-white px-3 py-1'><SiCodeforces className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>CodeForce</p>
                                    <p className='text-sm'>problem solving skills</p>
                                </div>
                            </a>
                        }
                    </div>
                </div>
                }

                {/* professional profiles */}
                {
                    (linkedin_link !=null || portfolio_link !=null || dribble_link !=null) &&
                <div className='mt-10'>
                    <p className=''>professional profiles and portfolio</p>
                    <div className='mt-2 grid md:grid-cols-3 grid-cols-1 gap-2'>
                        {
                            linkedin_link &&<a href={linkedin_link} target='_blank' rel="noreferrer" className='flex items-center gap-2 hover:bg-[#0073AF] bg-[#222222] duration-300 rounded-lg text-white p-2'><FaLinkedin className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Linkedin</p>
                                    <p className='text-sm'>checkout my activities</p>
                                </div>
                            </a>
                        }
                        {
                            portfolio_link &&<a href={portfolio_link} target='_blank' rel="noreferrer" className='flex items-center gap-2 hover:bg-[#29a05d] duration-300 rounded-lg bg-[#222222] text-white px-3 py-1'><FaPager className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Portfolio</p>
                                    <p className='text-sm'>my personal website</p>
                                </div>
                            </a>
                        }
                        {
                            dribble_link &&<a href={dribble_link} target='_blank' rel="noreferrer" className='flex items-center gap-2 hover:bg-[#EB528D] duration-300 rounded-lg bg-[#222222] text-white px-3 py-1'><FaDribbble className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Dribble</p>
                                    <p className='text-sm'>my design skills</p>
                                </div>
                            </a>
                        }
                    </div>
                </div>
                    }

                {/* social links */}
                {
                    (facebook_link !=null || twitter_link !=null || instagram_link !=null) &&
                <div className='mt-10'>
                    <p className=''>social media profiles</p>
                    <div className='mt-2 grid md:grid-cols-3 grid-cols-1 gap-2'>
                        {
                            facebook_link &&<a href={facebook_link} target='_blank' rel="noreferrer" className='flex flex-col items-center gap-2 bg-[#1F7BF2] rounded-lg overflow-hidden text-white pt-5 hover:bg-[#222222] duration-500'>
                                <FaFacebook className='text-5xl' /> 
                                <div className='bg-white text-black w-full mt-3 p-3'>
                                    <p className='font-bold'>Facebook</p>
                                    <p className='text-sm'>view my recent posts</p>
                                </div>
                            </a>
                        }
                        {
                            twitter_link !=null &&<a href={twitter_link} target='_blank' rel="noreferrer" className='flex flex-col items-center gap-2 bg-[#24A4F2] rounded-lg overflow-hidden text-white pt-5 hover:bg-[#222222] duration-500'>
                                <FaTwitter className='text-5xl' /> 
                                <div className='bg-white text-black w-full mt-3 p-3'>
                                    <p className='font-bold'>Twitter</p>
                                    <p className='text-sm'>checkout my activities</p>
                                </div>
                            </a>
                        }
                        {
                            instagram_link &&<a href={instagram_link} target='_blank' rel="noreferrer" className='flex flex-col items-center gap-2 bg-[#DD286B] rounded-lg overflow-hidden text-white pt-5 hover:bg-[#222222] duration-500'>
                                <FaInstagram className='text-5xl' /> 
                                <div className='bg-white text-black w-full mt-3 p-3'>
                                    <p className='font-bold'>Instagram</p>
                                    <p className='text-sm'>view my latest posts and stories</p>
                                </div>
                            </a>
                        }
                    </div>
                </div>
                }

                </div>

                {/* social share links */}
                <p className='mt-3 ml-1'>share with</p>
                <div className='flex justify-center bg-[#1c1c1caa]  p-2 rounded-lg'>
                    <div className=' flex gap-10'>
                        {/* <FacebookShareButton url={`https://profileview-v01.web.app/profile/${user?.username}`} /> */}
                        <FacebookShareButton
                            title={`Profile - ${user.username}`}
                            url={profile_link}
                            caption="Hey! this is my profile-view. Let's connect each other."
                        >
                            <FacebookIcon size={25} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton
                            title={`Profile - ${user.username}`}
                            url={profile_link}
                            caption="Hey! this is my profile-view. Let's connect each other."
                        >
                            <TwitterIcon size={25} round={true} />
                        </TwitterShareButton>
                        <LinkedinShareButton
                            title={`Profile - ${user.username}`}
                            url={profile_link}
                            caption="Hey! this is my profile-view. Let's connect each other."
                        >
                            <LinkedinIcon size={25} round={true} />
                        </LinkedinShareButton>
                    </div>
                </div>
            </div>
                <div className='flex justify-center mt-20'>
                    <p>Share your profiles and connect each other. {!user?.username && <span className='underline cursor-pointer text-white' onClick={() => navigate('/signup')}>click to signup</span>} 😀</p>
                </div>
                        </div>
                    }
                </>
            }
        </>
    );
};

export default UserProfile;