import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useProfileData from '../Hooks/useProfileData';
import null_avatar from '../Assets/null_avatar.jpg'
import bgProfile from '../Assets/profilebg.jpg'
// icons
import { FaDatabase, FaDiscord, FaDribbble, FaFacebook, FaFilePdf, FaGithub, FaHackerrank, FaInstagram, FaLinkedin, FaPager, FaTwitter, FaUserGraduate } from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { MdVerifiedUser } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import './UserProfile.css'

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
import { FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useTitle } from '../Hooks/useTitle';
// import webbg from '../../src/Assets/noicebg.png'


const UserProfile = () => {
    const findUser = JSON.parse(localStorage.getItem('userinfo'))
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
        profile_view,
        profile_likes,
        profile_link,
        github_link,
        twitter_link,
        portfolio_link,
        hackerRank_link,
        profile_pic, 
        dribble_link,
        linkedin_link,
        resume_link,
        discord_link,
        facebook_link,
        codeForce_link,
        instagram_link,
    } = useLoaderData()
    const navigate = useNavigate()

    useTitle(`${username}`)

    // count visits ---------=========-------------------------------
    const isFirstRun = useRef(true);
    useEffect(() => {
    if (isFirstRun.current) {
        isFirstRun.current = false;

        if(findUser.username && findUser.username !== username)
        {
            viewedProfile()
            visitedProfileHistory()
        }
        return;
    }
    
    }, [findUser.username, username]);
//-----------------------=========--------------------------------

    function viewedProfile(){
        fetch(`http://localhost:5000/count_view?username=${username}&loginUSERNAME=${findUser.username ? findUser.username : null}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount === 1){
                console.log("profile visited")
            }
            console.log(data)
        })
    }

    function visitedProfileHistory(){
        fetch(`http://localhost:5000/visited_profile`, {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: findUser.username,
                visitedProfiles:[
                    {
                        username,
                        profile_link
                    }
                ]
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

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


    const handleLikeProfile = () => {
        setLoading(true)
        const likedata ={
            username: findUser.username,   
            likedProfiles: [
                {
                    username,
                    liked_date: new Date()
                }
            ]
        }

        const url = `http://localhost:5000/likeprofile`
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(likedata)
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false)
            console.log(data)
            window.location.reload()
        })
    }


    const TapToCopy = () => {
        navigator.clipboard.writeText(profile_link) 
        toast.success("Profile url copied!")
    }

    const [ifliked, setIfLiked] = useState(false)
    // view liked or not
    useEffect(() => {
        fetch(`http://localhost:5000/profilelike_history?username=${findUser.username}&visitprofile=${username}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if(data.liked === true){
                console.log(data)
                setIfLiked(true)
            }
            else{
                setIfLiked(false)
            }
        })
    }, [findUser.username, username])

    return (
        <div className='pt-14'>
            {
                loading ?
                <LoadingPage></LoadingPage>
                :
                <>
                    {
                        !checkValid ?
                        <div className='min-h-screen flex items-center justify-center bg-[#000000d0]'>
                            <div>
                                <p className=' text-xl text-slate-200'>Profile-view says: This is a invalid URL. No user founded in our database with this username: <span className='font-bold text-yellow-600'>{pathname}</span></p>
                                <span className='text-white font-bold'>Check again and back to profile-view</span>
                                <p className='mt-5 text-slate-200'>Back to home in <span className='text-red-700 font-bold'>({timer}) seconds</span></p>
                            </div>
                        </div>
                        :
                        <div className='min-h-screen pt-5'>
            {/* <div className='md:max-w-[800px] mx-auto flex justify-end'>
                <p onClick={() => navigate('/')} className='mr-5 py-2 flex items-end gap-3 hover:underline cursor-pointer duration-200 text-slate-200'>back to home page<IoReturnDownBack /></p>
            </div> */}
            <div style={{
                backgroundImage: `linear-gradient(150deg, #000000c6, #000000fd), url(${profile_pic ? profile_pic : null_avatar})`,
                width: '100%',
                height: '100%',  // or any other dimensions
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                imageRendering: 'optimizeQuality'
            }}
            className=' md:max-w-[800px] mx-auto border-[1px] border-[#2e2e2e] bg-[#181818] md:rounded-xl p-5 min-h-[500px] '>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 '>
                        {/* profile image  */}
                        <div className='rounded-xl border-[1px] border-[#2e2e2e] p-[3px]'>
                            <div className='hover:animate-pulse cursor-pointer w-[90px] h-[90px] rounded-md overflow-hidden flex items-center bg-white'>
                                <img onClick={()=> {
                                    profile_pic !== null && window.open(profile_pic, '_blank')
                                }} className='' src={profile_pic != null ? profile_pic : null_avatar} alt="" />
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <h3 className='text-[26px] capitalize py-0 font-bold text-white'>{name ? name : username}</h3>
                                {/* <MdVerifiedUser className='text-xl text-[#48cd4c]' /> */}
                            </div>
                            <p className='text-lg hidden md:flex text-white'>{bio}</p>
                        </div>
                    </div>
                    <div className='md:mr-5'>
                        {/* like system */}
                        {
                            findUser.username && findUser.username !== username && <>
                                    {
                                        ifliked ?
                                        <button className='tooltip' data-tip="You cannot dislike it dear! 🥹">
                                        <BiSolidLike className='text-3xl text-white'/>
                                </button>
                                :
                                <button className='tooltip tooltip-warning' data-tip="Once you like a profile, you cannot dislike it." onClick={() => {
                                    if(findUser.username !== username){handleLikeProfile()
                                    }}}>
                                    <BiLike className='text-3xl text-white'/>
                                </button>
                            }
                            </>
                        }
                    </div>
                </div>

                <p className='mt-3 text-md md:hidden flex text-white'>{bio}</p>
                <div className='border-[1px] border-[#2e2e2e] md:min-h-[400px]  p-2 rounded-xl bg-[#151515bb] mt-6'>
                    {
                        (github_link === null && hackerRank_link ===null && codeForce_link ===null && linkedin_link ===null && portfolio_link ===null && dribble_link ===null && facebook_link ===null && twitter_link ===null && instagram_link ===null && discord_link === undefined && portfolio_link !== undefined) &&
                        <div className='h-full'>
                            {/* count profile views  */}
                            <div className='flex justify-end'>
                                <div className='bg-[#333333c2] rounded-l-full border-[#454545] text-[#ffffff] border-[1px] px-2 py-1 flex gap-x-2 items-center  text-sm'>
                                    <p className='text-right   '>Profile views: {profile_view >= 1000 ? `${String(profile_view)[0]}k+`: profile_view}</p>
                                    <p>|</p>
                                    <p>Liked: {profile_likes ? profile_likes : 0}</p>
                                </div>
                            </div>
                            <p className='mt-10 text-center text-white'>{username} has not shared any of his information with us</p>
                        </div>
                    }
                    {
                    (github_link !=null || hackerRank_link !=null || codeForce_link !=null) &&
                <div className=''>

                    {/* count profile views  */}
                    <div className='flex justify-end'>
                        <div className='bg-[#333333c2] rounded-l-full border-[#454545] text-[#ffffff] border-[1px] px-2 py-1 flex gap-x-2 items-center  text-sm'>
                            <p className='text-right   '>Profile views: {profile_view >= 1000 ? `${String(profile_view)[1]}k`: profile_view}</p>
                            <p>|</p>
                            <p>Likes: {profile_likes ? profile_likes : 0}</p>
                        </div>
                    </div>

                    <p className='text-white'>coding related</p>
                        <div className='mt-2 grid md:grid-cols-3 grid-cols-1 gap-2'>
                        {
                            github_link &&<a href={`https://github.com/${github_link}`} target='_blank' rel="noreferrer" className='flex items-center gap-2 bg-[#222222] hover:bg-[#ededed] rounded-lg border-[1px] border-black hover:border-[#3d3d3d] duration-300 text-white hover:text-black p-2'><FaGithub className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Github</p>
                                    <p className='text-sm'>Find out my projects</p>
                                </div>
                            </a>
                        }
                        {
                            hackerRank_link &&<a href={`https://www.hackerrank.com/${hackerRank_link}`} target='_blank' rel="noreferrer" className='flex items-center gap-2 bg-[#222222] hover:bg-[#29a05d] rounded-lg border-[1px] border-black hover:border-[#3d3d3d] duration-300 text-white px-3 py-1'><FaHackerrank className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>HackerRank</p>
                                    <p className='text-sm'>problem solving skills</p>
                                </div>
                            </a>
                        }
                        {
                            codeForce_link &&<a href={`https://codeforces.com/profile/${codeForce_link}`} target='_blank' rel="noreferrer" className='flex items-center gap-2 bg-[#222222] hover:bg-[#B41F25] rounded-lg border-[1px] border-black hover:border-[#3d3d3d] duration-200 text-white px-3 py-1'><SiCodeforces className='text-5xl' /> 
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
                    (linkedin_link !=null || portfolio_link !=null || dribble_link !=null || discord_link !=null || resume_link !=null) &&
                <div className='mt-5'>
                    <p className='text-white'>professional profiles and portfolio</p>
                    <div className='mt-2 grid md:grid-cols-3 grid-cols-1 gap-2'>
                        {
                            linkedin_link &&<a href={`https://www.linkedin.com/in/${linkedin_link}`} target='_blank' rel="noreferrer" className='flex items-center gap-2 hover:bg-[#0073AF] bg-[#222222] duration-300 rounded-lg text-white p-2'><FaLinkedin className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Linkedin</p>
                                    <p className='text-sm'>checkout my activities</p>
                                </div>
                            </a>
                        }
                        {
                            resume_link &&<a href={resume_link} target='_blank' rel="noreferrer" className='flex items-center gap-2 hover:bg-[#4ab17f] bg-[#222222] duration-300 rounded-lg text-white p-2'><FaFilePdf className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Resume</p>
                                    <p className='text-sm'>more about me in details</p>
                                </div>
                            </a>
                        }
                        {
                            portfolio_link &&<a href={portfolio_link} target='_blank' rel="noreferrer" className='flex items-center gap-2 hover:bg-[#29a05d] duration-300 rounded-lg bg-[#222222] text-white px-3 p-2'><GoProjectSymlink className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Portfolio</p>
                                    <p className='text-sm'>my personal website</p>
                                </div>
                            </a>
                        }
                        {
                            dribble_link &&<a href={`https://dribbble.com/${dribble_link}`} target='_blank' rel="noreferrer" className='flex items-center gap-2 hover:bg-[#EB528D] duration-300 rounded-lg bg-[#222222] text-white px-3 p-2'><FaDribbble className='text-5xl' /> 
                                <div>
                                    <p className='font-bold'>Dribble</p>
                                    <p className='text-sm'>my design skills</p>
                                </div>
                            </a>
                        }
                        {/* newly added */}
                        {
                            discord_link &&<p onClick={() => {
                                    navigator.clipboard.writeText(discord_link) 
                                    toast.success("username copied")
                                }} className='flex items-center tooltip tooltip-warning cursor-pointer gap-2 hover:bg-[#5D6AF2] duration-300 rounded-lg bg-[#222222] text-white px-3 p-2' data-tip="Click to copy"><FaDiscord className='text-5xl' /> 
                                <div>
                                    <p className='font-bold text-left'>Discord</p>
                                    <p className='text-sm text-left'>let's talk about code</p>
                                </div>
                            </p>
                        }
                    </div>
                </div>
                    }

                {/* social links */}
                {
                    (facebook_link !=null || twitter_link !=null || instagram_link !=null) &&
                <div className='mt-6'>
                    <p className='text-white'>social media profiles</p>
                    <div className='mt-2 grid md:grid-cols-3 grid-cols-1 gap-2'>
                        {
                            facebook_link &&<a href={`https://www.facebook.com/${facebook_link}`} target='_blank' rel="noreferrer" className='flex flex-col items-center gap-2 bg-[#1F7BF2] rounded-lg overflow-hidden text-white pt-5 hover:bg-[#222222] duration-500'>
                                <FaFacebook className='text-5xl' /> 
                                <div className='bg-white text-black w-full mt-3 p-3'>
                                    <p className='font-bold'>Facebook</p>
                                    <p className='text-sm'>view my recent posts</p>
                                </div>
                            </a>
                        }
                        {
                            twitter_link !=null &&<a href={`https://twitter.com/${twitter_link}`} target='_blank' rel="noreferrer" className='flex flex-col items-center gap-2 bg-[#24A4F2] rounded-lg overflow-hidden text-white pt-5 hover:bg-[#222222] duration-500'>
                                <FaTwitter className='text-5xl' /> 
                                <div className='bg-white text-black w-full mt-3 p-3'>
                                    <p className='font-bold'>Twitter</p>
                                    <p className='text-sm'>checkout my activities</p>
                                </div>
                            </a>
                        }
                        {
                            instagram_link &&<a href={`https://www.instagram.com/${instagram_link}`} target='_blank' rel="noreferrer" className='flex flex-col items-center gap-2 bg-[#DD286B] rounded-lg overflow-hidden text-white pt-5 hover:bg-[#222222] duration-500'>
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
                {
                    (github_link !== null || hackerRank_link !==null || codeForce_link !==null || linkedin_link !==null || portfolio_link !==null || dribble_link !==null || facebook_link !==null || twitter_link !==null || instagram_link !==null) &&
                    <div className=''>
                        <p className='mt-3 ml-1 text-white'>share with</p>
                        <div className='flex justify-center bg-[#1c1c1caa] h-full p-2 rounded-lg'>
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

                                <p className='bg-sky-700 hover:bg-sky-900 duration-200 flex items-center gap-2 cursor-pointer px-2   rounded-full text-white text-sm' onClick={TapToCopy}
                                ><FaCopy></FaCopy><span>Tap to copy</span></p>
                            </div>
                        </div>
                    </div>
                }
            </div>
                <div className='flex justify-center py-20'>
                    <p className='text-white'>Share your profiles and connect with each other. {!user?.username && <span className='underline cursor-pointer text-white' onClick={() => navigate('/signup')}>click to signup</span>} 😀</p>
                </div>
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default UserProfile;