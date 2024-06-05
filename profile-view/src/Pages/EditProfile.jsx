import React, { useEffect, useState } from 'react';
import Container from '../Components/Container';
import { FaDribbble, FaFacebook, FaGithub, FaHackerrank, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { SiCodeforces } from "react-icons/si";
import './global.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from 'react-icons/io5';
import { FaDiscord, FaPlus, FaFilePdf } from 'react-icons/fa6';
import LoadingPage from './LoadingPage';
import { useTitle } from '../Hooks/useTitle';

const EditProfile = () => {
    const [viewImg, setViewImg] = useState(undefined)
    const [imgFile, setimgFile] = useState(undefined)
    const [callServer, setCallServer] = useState(false)
    const [serverMsg, setServerMsg] = useState(null)

    useTitle("My profile")
    
    // const [imglink, setImgLink] = useState(null)
    const [editMode, setEditMode] = useState(false)
    
    const [selectedPhoto, setSelectedPhoto] = useState(false)
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    
    // user profile details ==============================================
    const user = JSON.parse(localStorage.getItem('userinfo')) // user
    const [userProfile, setUserProfile] = useState([])
    //====================================================================

    const [webloading, setwebLoading] = useState(true)
    useEffect(() => {
        if(user.username === userProfile.username){
            setwebLoading(false)
        }
    }, [user.username, userProfile.username])

    
    const handleGetPhoto = (e) => {
        const file = e.target.files[0]
        if(file){
            setSelectedPhoto(true)
            const img = URL.createObjectURL(file)
            setimgFile(file)
            setViewImg(img)
        }
    }
    useEffect(() => {
        fethingData()
    }, [user?.username])

    const fethingData = () => {
        fetch(`http://localhost:5000/userprofile?username=${user?.username}`, {
        method: "GET"
    })
    .then(res => res.text()) // Convert response to text
    .then(text => {
        return JSON.parse(text); // Parse JSON
    })
    .then(data => {
        setUserProfile(data);
        setViewImg(data.profile_pic)
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
    }

    // user informations
    const {
        bio, 
        name, 
        github_link,
        twitter_link,
        portfolio_link,
        hackerRank_link,
        profile_pic, 
        resume_link,
        dribble_link,
        linkedin_link,
        discord_link,
        facebook_link,
        codeForce_link,
        instagram_link,
    } = userProfile
    
    const handleSaveProfile = (e) => {
        e.preventDefault()
        if(selectedPhoto){
            // setLoading(true)
            const data = new FormData()
            data.append('file', imgFile)
            data.append('upload_preset', 'profile-view')
            data.append('cloud_name', 'cloudinarybysp')
            // fetch('https://api.cloudinary.com/v1_1/cloudinarybysp/image/upload/w_300,h_300,c_scale', {
            const transformation = 'w_300,h_300,c_scale'
            fetch(`https://api.cloudinary.com/v1_1/cloudinarybysp/image/upload`, {
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                if(data.url){
                    // console.log(data.split("/upload/"))
                    // let user = data.url.split("profile-view/")[1]
                    // const imgurl = "https://res.cloudinary.com/cloudinarybysp/image/upload/v1714243624/profile-view/uxzzvrmmn2gtj4tiri5l.jpg"
                    let newurl = `${data.url.split("upload")[0]+'upload/c_crop,g_auto,h_2500,w_2500'+data.url.split("upload")[1]}`
                    // deleting previous photo !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // if (profile_pic) {
                    //     const apikey = process.env.REACT_APP_CLOUDINARY_API_KEY
                    //     const secretkey = process.env.REACT_APP_CLOUDINARY_API_SECRET
                    //     const deletePhoto = async() => {
                    //         const publicId = profile_pic.split('/').pop().split('.')[0];
                    //         try {
                    //             const response = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/destroy?public_id=${publicId}&api_key=${apikey}&api_secret=${secretkey}`, {
                    //             method: 'DELETE'
                    //             });

                    //             if (!response.ok) {
                    //             const data = await response.json();
                    //             console.error('Failed to delete image:', data);
                    //             } else {
                    //             const data = await response.json();
                    //             console.log('Image deleted successfully:', data);
                    //             }
                    //         } catch (error) {
                    //             console.error('Fetch Error:', error);
                    //         }
                    //     }
                    //     deletePhoto()
                    //   }
                    const photoURL = newurl
                    const form = e.target
                    const name = form.name.value
                    const bio = form.bio.value
                    const github = form.github.value
                    const portfolio = form.portfolio.value
                    const hackerRank = form.hackerRank.value
                    const codeForce = form.codeForce.value
                    const dribble = form.dribble.value
                    const linkedin = form.linkedin.value
                    const resume = form.resume.value
                    const discord = form.discord.value //change
                    const facebook = form.facebook.value
                    const instagram = form.instagram.value
                    const twitter = form.twitter.value
                    
                    const userdetails = {
                        username: user.username,
                        name: name,
                        bio: bio,
                        profile_pic: photoURL != null ? photoURL : profile_pic,
                        github_link: github != null ? github : github_link,
                        portfolio_link: portfolio != null ? portfolio : portfolio_link,
                        hackerRank_link: hackerRank != null ? hackerRank : hackerRank_link,
                        codeForce_link: codeForce != null ? codeForce : codeForce_link,
                        dribble_link: dribble != null ? dribble : dribble_link,
                        linkedin_link: linkedin != null ? linkedin : linkedin_link,
                        resume_link: resume != null ? resume : resume_link,
                        discord_link: discord != null ? discord : discord_link, //change
                        facebook_link: facebook != null ? facebook : facebook_link,
                        instagram_link: instagram != null ? instagram : instagram_link,
                        twitter_link: twitter != null ? twitter : twitter_link
                    }
                    
                    fetch(`http://localhost:5000/saveprofile`, {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'Application/json'
                        },
                        body: JSON.stringify(userdetails) 
                    })
                    .then(res => res.json())
                    .then(data => {
                        setCallServer(true)
                        setSaveLoading(false)
                        if(data.acknowledged)
                        {
                            setServerMsg(`Hey ${user.username}! Your profile is now updated `)
                            setEditMode(!editMode)
                            toast.success("Profile updated",{
                                icon: '😀',
                            })
                            fethingData()
                            // navigate(`/profile/${user.username}`)
                        }
                        else{
                            setServerMsg(`Invalid user!`)
                            toast.error("Invalid user!")
                            // navigate('/signup')
                        }
                    })
                }
            })
            .catch(e => console.error(e))
        }
        else{
            const form = e.target
                    const name = form.name.value
                    const bio = form.bio.value
                    const github = form.github.value
                    const portfolio = form.portfolio.value
                    const hackerRank = form.hackerRank.value
                    const codeForce = form.codeForce.value
                    const dribble = form.dribble.value
                    const linkedin = form.linkedin.value
                    const resume = form.resume.value
                    const discord = form.discord.value
                    const facebook = form.facebook.value
                    const instagram = form.instagram.value
                    const twitter = form.twitter.value
                    
                    const userdetails = {
                        username: user.username,
                        name: name,
                        bio: bio,
                        profile_pic: profile_pic != null ? profile_pic : null,
                        github_link: github != null ? github : github_link,
                        portfolio_link: portfolio != null ? portfolio : portfolio_link,
                        hackerRank_link: hackerRank != null ? hackerRank : hackerRank_link,
                        codeForce_link: codeForce != null ? codeForce : codeForce_link,
                        dribble_link: dribble != null ? dribble : dribble_link,
                        linkedin_link: linkedin != null ? linkedin : linkedin_link,
                        resume_link: resume != null ? resume : resume_link,
                        discord_link: discord != null ? discord : discord_link,
                        facebook_link: facebook != null ? facebook : facebook_link,
                        instagram_link: instagram != null ? instagram : instagram_link,
                        twitter_link: twitter != null ? twitter : twitter_link
                    }
                    
                    fetch(`http://localhost:5000/saveprofile`, {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'Application/json'
                        },
                        body: JSON.stringify(userdetails) 
                    })
                    .then(res => res.json())
                    .then(data => {
                        setCallServer(true)
                        setSaveLoading(false)
                        if(data.acknowledged)
                        {
                            setServerMsg(`Hey ${user.username}! Your profile is now updated `)
                            setEditMode(!editMode)
                            toast.success("Profile updated",{
                                icon: '😀',
                            })
                            navigate(`/profile/${user.username}`)
                            fethingData()
                        }
                        else{
                            setServerMsg(`Invalid user!`)
                            toast.error("Invalid user!")
                            navigate('/signup')
                        }
                        fethingData()
                    })
        }
        fethingData()
        setSaveLoading(true)

        
    }

    const navigate = useNavigate()
    const buttonBg = 'bg-zinc-900 border-2 border-slate-500 border-dashed '
    
    return (
        <>
            {
                webloading ?
                <LoadingPage></LoadingPage>
                :
                <div className='md:min-h-screen md:pb-20'>
            {
                editMode ?
                <div className='max-w-[1240px] mx-auto md:px-2 '>
                        {/* <div className={`text-center sticky top-0 ${callServer ? 'bg-green-700': 'bg-red-700'} ${editMode ? 'bg-red-700' : ' bg-green-700'} py-1 rounded-b-md  text-white`}> */}
                        <div className={`text-center ${editMode ? 'bg-red-700' : ' bg-green-700'} py-1 rounded-b-md  text-white sticky top-[60px]`}>
                            <p className='text-sm'>{callServer ? `${serverMsg}` : `${editMode ? 'Edit mode enabled' : 'View mode enabled'}`}</p>
                        </div>
                <div className='flex lg:flex-row flex-col gap-5 md:mt-16 p-5 md:p-0'>
                    <div>
                        <p className='py-2 ml-2 text-slate-200'>Image section</p>
                        <label htmlFor="profile_pic" >
                            <div className={`md:w-[300px] md:h-[300px] overflow-hidden ${buttonBg} rounded-lg flex items-start justify-center`}>
                                {
                                    viewImg ?
                                    <img src={viewImg ? viewImg : profile_pic} alt="" />
                                    :
                                    <FaPlus className='text-[100px]' />
                                }
                            </div>
                        </label>
                        <input onChange={handleGetPhoto} id='profile_pic' className='hidden' type="file" />
                        
                        <p className="ml-1 text-slate-200">Tap on the image or plus icon to change the photo</p>
                    </div>


                    <div className='w-full '>
                        <p className='py-2 ml-2 text-slate-200'>Information section</p>
                        <form onSubmit={handleSaveProfile}>
                        <div className='bg-zinc-900 border-2 border-slate-500 border-dashed rounded-md w-full md:px-8 md:p-8'>
                            <div className='flex justify-end mb-5'>
                            <div className="form-control tooltip tooltip-open tooltip-left tooltip-primary" data-tip="Tap to view mode">
                                    <label className="label cursor-pointer">
                                        {/* <span className="label-text mr-2">{!editMode ? "tap to edit" :"tap to view"}</span>  */}
                                        <input type="checkbox" onClick={() => setEditMode(!editMode)} className="toggle" defaultChecked />
                                    </label>
                                </div>
                            </div>
                            <div>
                                </div> 
                            <div className='px-5 md:px-0'>
                                <input required name='name' placeholder='your name...' type="text" className='py-2 bg-transparent p-2 md:text-2xl text-xl w-full outline-none border-[1px] text-white border-[#373737]' defaultValue={name && name} /> <br />
                                <input name='bio' placeholder='something about your self...' type="text" className='bg-transparent p-2 mt-2  text-md w-full mb-3 outline-none border-[1px] text-white border-[#373737]' defaultValue={bio} />
                            </div>
                            {/* <hr /> */}
                                <p className='mt-5 text-sm text-slate-200 md:px-0 px-5'>Just type your usernames of your profiles. <span className='text-yellow-500 '>Example: johnsmith123</span> - <span className='text-red-500'>Warning: Do not paste your full profile link in social media and coding related profile fields!</span></p>
                                <div className='mt-2 md:w-[100%]'>
                                    <div className=''>
                                        <p className='text-md text-slate-300 ml-2 mb-1'>coding related</p>
                                        <div className='flex items-center border-black'>
                                            <label htmlFor="github" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaGithub /></label>
                                            <input defaultValue={github_link} className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='github username' id='github' name='github' type="text" />
                                        </div>

                                        <div className='flex items-center border-gray-600 border-y-[1px]'>
                                            <label htmlFor="hackerRank" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaHackerrank /></label>
                                            <input defaultValue={hackerRank_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='hackerRank username' id='hackerRank' name='hackerRank' type="text" />
                                        </div>

                                        <div className='flex items-center border-[#cbcbcb]'>
                                            <label htmlFor="codeForce" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><SiCodeforces /></label>
                                            <input defaultValue={codeForce_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='codeForce username' id='codeForce' name='codeForce' type="text" />
                                        </div>
                                    </div>

                                    {/* professional profiles  */}
                                    <div className='mt-5'> 
                                    <p className='text-md text-slate-300 ml-2 mb-1'>professional usernames</p>
                                        <div className='flex items-center border-[#cbcbcb]'>
                                            <label htmlFor="linkedin" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaLinkedinIn /></label>
                                            <input defaultValue={linkedin_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='linkedin username' id='linkedin' name='linkedin' type="text" />
                                        </div>

                                        <div className='flex items-center border-gray-600 border-y-[1px]'>
                                            <label htmlFor="discord" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaDiscord /></label>
                                            <input defaultValue={discord_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='discord username' id='discord' name='discord' type="text" />
                                        </div>

                                        <div className='flex items-center'>
                                            <label htmlFor="portfolio" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><CgWebsite /></label>
                                            <input defaultValue={portfolio_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type portfolio link' id='portfolio' name='portfolio' type="text" />
                                        </div>

                                        <div className='flex items-center border-gray-600 border-y-[1px]'>
                                            <label htmlFor="dribble" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaDribbble /></label>
                                            <input defaultValue={dribble_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='dribble username' id='dribble' name='dribble' type="text" />
                                        </div>

                                        <div className='flex items-center border-[#000]'>
                                            <label htmlFor="resume" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaFilePdf /></label>
                                            <input defaultValue={resume_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='drive link of your resume. Ex: https://drive.google.com/myresume' id='resume' name='resume' type="text" />
                                        </div>
                                    </div>

                                    <div className='mt-5'>
                                        <p className='text-md text-slate-300 ml-2 mb-1'>social medias</p>
                                        <div className='flex items-center border-[#000]'>
                                            <label htmlFor="facebook" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaFacebook /></label>
                                            <input defaultValue={facebook_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='facebook username' id='facebook' name='facebook' type="text" />
                                        </div>

                                        <div className='flex items-center border-gray-600 border-y-[1px]'>
                                            <label htmlFor="instagram" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaInstagram /></label>
                                            <input defaultValue={instagram_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='instagram username' id='instagram' name='instagram' type="text" />
                                        </div>

                                        <div className='flex items-center border-[#000]'>
                                            <label htmlFor="twitter" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaTwitter /></label>
                                            <input defaultValue={twitter_link}  className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' placeholder='twitter username' id='twitter' name='twitter' type="text" />
                                        </div>
                                    </div>

                                    <button className='bg-black hover:bg-gray-950 duration-200 py-2 mt-5 w-full text-slate-200' type="submit ">{saveLoading ? 'Please wait to save...' : 'Click to save'}</button>
                                </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            :

            // view mode 
            <div className='md:max-w-[1240px] mx-auto'>
                        {/* <div className={`text-center sticky top-0 ${callServer ? 'bg-green-700': 'bg-red-700'} ${editMode ? 'bg-red-700' : ' bg-green-700'} py-1 rounded-b-md  text-white`}> */}
                        <div className={`text-center  ${editMode ? 'bg-red-700' : ' bg-green-700'} sticky py-1 rounded-b-md z-[100] top-[60px] text-white`}>
                            <p className='text-sm'>{callServer ? `${serverMsg}` : `${editMode ? 'Edit mode enabled' : 'View mode enabled'}`}</p>
                        </div>
                        <div className=' flex justify-end'>
                {/* <p onClick={() => navigate('/')} className='mr-5 py-2 flex items-end gap-3 text-white cursor-pointer duration-200 hover:underline'>back to home page<IoReturnDownBack /></p> */}
            </div>
                <div className='flex md:flex-row flex-col gap-5 mt-16 p-5 md:p-0'>
                    <div>
                        <p className='py-2 ml-2 text-slate-200'>Image section</p>
                        <label htmlFor="profile_pic" >
                            <div className={`md:w-[300px] md:h-[300px] overflow-hidden #${!profile_pic && buttonBg} rounded-lg`}>
                                <img src={profile_pic && profile_pic} alt="" />
                            </div>
                        </label>
                        <input disabled onChange={handleGetPhoto} id='profile_pic' className='hidden' type="file" />
                        {/* <button onClick={handleImageChange}>Upload</button> */}
                    </div>


                    <div className='w-full '>
                        <p className='py-2 ml-2 text-slate-200'>Information section</p>
                        <form onSubmit={handleSaveProfile}>
                        <div className='bg-zinc-900 rounded-md w-full md:px-8 md:p-8'>
                        <div className='flex justify-end'>
                                <div className="form-control  tooltip tooltip-open animate-pulse duration-150 tooltip-left tooltip-warning" data-tip="Tap to edit profile">
                                    <label className="label cursor-pointer z-10">
                                        {/* <span className="text-md mr-2">{!editMode ? <span>tap to edit</span> :"tap to view"}</span>  */}
                                        <input type="checkbox" onClick={() => setEditMode(!editMode)} className="toggle toggle-success"  />
                                    </label>
                                </div>
                            </div>

                            <div className='px-5 md:px-0'>
                                <input disabled name='name' type="text" className='py-2 bg-transparent outline-none md:text-2xl text-xl text-white' defaultValue={name && name} /> <br />
                                <input disabled name='bio' type="text" className='bg-transparent outline-none text-md w-full mb-3 text-white' defaultValue={bio} />
                            </div>
                            {/* <hr /> */}

                                <div className='mt-5 md:w-[100%]'>
                                <div className=''>
                                        <p className='text-md text-slate-300 ml-2 mb-1'>coding related</p>
                                        <div className='flex items-center border-black'>
                                            <label htmlFor="github" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaGithub /></label>
                                            <input defaultValue={github_link}disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='github' name='github' type="text" />
                                        </div>

                                        <div className='flex items-center border-gray-600 border-y-[1px]'>
                                            <label htmlFor="hackerRank" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaHackerrank /></label>
                                            <input defaultValue={hackerRank_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='hackerRank' name='hackerRank' type="text" />
                                        </div>

                                        <div className='flex items-center border-[#cbcbcb]'>
                                            <label htmlFor="codeForce" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><SiCodeforces /></label>
                                            <input defaultValue={codeForce_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='codeForce' name='codeForce' type="text" />
                                        </div>
                                    </div>

                                    {/* professional profiles  */}
                                    <div className='mt-5'> 
                                    <p className='text-md text-slate-300 ml-2 mb-1'>professional usernames</p>
                                        <div className='flex items-center border-[#cbcbcb]'>
                                            <label htmlFor="linkedin" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaLinkedinIn /></label>
                                            <input defaultValue={linkedin_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='linkedin' name='linkedin' type="text" />
                                        </div>

                                        <div className='flex items-center border-gray-600 border-y-[1px]'>
                                            <label htmlFor="discord" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaDiscord /></label>
                                            <input defaultValue={discord_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='discord' name='discord' type="text" />
                                        </div>

                                        <div className='flex items-center'>
                                            <label htmlFor="portfolio" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><CgWebsite /></label>
                                            <input defaultValue={portfolio_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='portfolio' name='portfolio' type="text" />
                                        </div>

                                        <div className='flex items-center border-gray-600 border-y-[1px]'>
                                            <label htmlFor="dribble" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaDribbble /></label>
                                            <input defaultValue={dribble_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='dribble' name='dribble' type="text" />
                                        </div>

                                        <div className='flex items-center border-[#000]'>
                                            <label htmlFor="resume" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaFilePdf /></label>
                                            <input defaultValue={resume_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='resume' name='resume' type="text" />
                                        </div>
                                    </div>

                                    <div className='mt-5'>
                                        <p className='text-md text-slate-300 ml-2 mb-1'>social medias</p>
                                        <div className='flex items-center border-[#000]'>
                                            <label htmlFor="facebook" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaFacebook /></label>
                                            <input defaultValue={facebook_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='facebook' name='facebook' type="text" />
                                        </div>

                                        <div className='flex items-center border-gray-600 border-y-[1px]'>
                                            <label htmlFor="instagram" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaInstagram /></label>
                                            <input defaultValue={instagram_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='instagram' name='instagram' type="text" />
                                        </div>

                                        <div className='flex items-center border-[#000]'>
                                            <label htmlFor="twitter" className='text-2xl py-2 text-white bg-[#212121] border-r-[1px] border-gray-600 px-3'><FaTwitter /></label>
                                            <input defaultValue={twitter_link} disabled className='py-2 placeholder:text-gray-600 text-white text-md bg-[#212121] outline-none pl-4 w-full' id='twitter' name='twitter' type="text" />
                                        </div>
                                    </div>
                                    {/* <button className='bg-black hover:bg-gray-950 duration-200 py-2 mt-5 w-full' type="submit ">Save</button> */}
                                </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>
            }
        </>
    );
};

export default EditProfile;