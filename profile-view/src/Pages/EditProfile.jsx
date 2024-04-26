import React, { useEffect, useState } from 'react';
import Container from '../Components/Container';
import { FaDribbble, FaFacebook, FaGithub, FaHackerrank, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { SiCodeforces } from "react-icons/si";
import './global.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
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
        fetch(`http://localhost:5000/userdata?username=${user?.username}`, {
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
        dribble_link,
        linkedin_link,
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
            fetch('https://api.cloudinary.com/v1_1/cloudinarybysp/image/upload', {
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                if(data.url){

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
                    const photoURL = data.url
                    const form = e.target
                    const name = form.name.value
                    const bio = form.bio.value
                    const github = form.github.value
                    const portfolio = form.portfolio.value
                    const hackerRank = form.hackerRank.value
                    const codeForce = form.codeForce.value
                    const dribble = form.dribble.value
                    const linkedin = form.linkedin.value
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
                            navigate(`/profile/${user.username}`)
                        }
                        else{
                            setServerMsg(`Invalid user!`)
                            toast.error("Invalid user!")
                            navigate('/signup')
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
                <div className='max-w-[1240px] mx-auto'>
                        {/* <div className={`text-center sticky top-0 ${callServer ? 'bg-green-700': 'bg-red-700'} ${editMode ? 'bg-red-700' : ' bg-green-700'} py-1 rounded-b-md  text-white`}> */}
                        <div className={`text-center ${editMode ? 'bg-red-700' : ' bg-green-700'} py-1 rounded-b-md  text-white`}>
                            <p className='text-sm'>{callServer ? `${serverMsg}` : `${editMode ? 'Edit mode enabled' : 'View mode enabled'}`}</p>
                        </div>
                <div className='flex md:flex-row flex-col gap-5 md:mt-10 p-5 md:p-0'>
                    <div>
                        <p className='py-2 ml-2'>Image section</p>
                        <label htmlFor="profile_pic" >
                            <div className={`md:w-[300px] md:h-[300px] overflow-hidden ${buttonBg} rounded-lg flex items-center justify-center`}>
                                {
                                    viewImg ?
                                    <img src={viewImg ? viewImg : profile_pic} alt="" />
                                    :
                                    <FaPlus className='text-[100px]' />
                                }
                            </div>
                            {/* <button className={`uppercase w-full py-2 btn-bg ${buttonBg} mt-1 rounded-b-lg`}> add picture</button> */}
                        </label>
                        <input onChange={handleGetPhoto} id='profile_pic' className='hidden' type="file" />
                        
                        <p className="ml-1 ">Tap on the image or plus icon to change the photo</p>
                    </div>


                    <div className='w-full '>
                        <p className='py-2 ml-2'>Information section</p>
                        <form onSubmit={handleSaveProfile}>
                        <div className='bg-zinc-900 border-2 border-slate-500 border-dashed rounded-md w-full px-8 p-8'>
                            <div className='flex justify-end'>
                            <div className="form-control tooltip tooltip-open tooltip-left tooltip-primary" data-tip="Tap to view mode">
                                    <label className="label cursor-pointer">
                                        {/* <span className="label-text mr-2">{!editMode ? "tap to edit" :"tap to view"}</span>  */}
                                        <input type="checkbox" onClick={() => setEditMode(!editMode)} className="toggle" defaultChecked />
                                    </label>
                                </div>
                            </div>

                            <input required name='name' placeholder='your name...' type="text" className='py-2 bg-transparent p-2 text-4xl outline-none border-[1px] border-[#373737]' defaultValue={name && name} /> <br />
                            <input name='bio' placeholder='something about your self...' type="text" className='bg-transparent p-2 mt-2 text-2xl w-full mb-3 outline-none border-[1px] border-[#373737]' defaultValue={bio} />
                            <hr />

                                <div className='mt-5 md:w-[100%]'>
                                    <div className='flex items-center border-black'>
                                        <label htmlFor="github" className='text-2xl py-2 text-white bg-black px-8'><FaGithub /></label>
                                        <input defaultValue={github_link} className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type github profile username only' id='github' name='github' type="text" />
                                    </div>

                                    <div className='flex items-center border-[#cbcbcb] mt-4'>
                                        <label htmlFor="portfolio" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><CgWebsite /></label>
                                        <input defaultValue={portfolio_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type portfolio link' id='portfolio' name='portfolio' type="text" />
                                    </div>

                                    <div className='flex items-center border-[#000] mt-4'>
                                        <label htmlFor="hackerRank" className='text-2xl py-2 text-white bg-[#000] px-8'><FaHackerrank /></label>
                                        <input defaultValue={hackerRank_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type hackerRank profile username only' id='hackerRank' name='hackerRank' type="text" />
                                    </div>

                                    <div className='flex items-center border-[#cbcbcb] mt-4'>
                                        <label htmlFor="codeForce" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><SiCodeforces /></label>
                                        <input defaultValue={codeForce_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type codeForce profile username only' id='codeForce' name='codeForce' type="text" />
                                    </div>

                                    <div className='flex items-center border-[#000] mt-4'>
                                        <label htmlFor="dribble" className='text-2xl py-2 text-white bg-[#000] px-8'><FaDribbble /></label>
                                        <input defaultValue={dribble_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type dribble profile username only' id='dribble' name='dribble' type="text" />
                                    </div>

                                    <div className='flex items-center border-[#cbcbcb] mt-4'>
                                        <label htmlFor="linkedin" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><FaLinkedinIn /></label>
                                        <input defaultValue={linkedin_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type linkedin profile username only' id='linkedin' name='linkedin' type="text" />
                                    </div>

                                    <div className='flex items-center border-[#000] mt-4'>
                                        <label htmlFor="facebook" className='text-2xl py-2 text-white bg-[#000] px-8'><FaFacebook /></label>
                                        <input defaultValue={facebook_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type facebook profile username only' id='facebook' name='facebook' type="text" />
                                    </div>

                                    <div className='flex items-center border-[#cbcbcb] mt-4'>
                                        <label htmlFor="instagram" className='text-2xl py-2 text-[#000] bg-[#cbcbcb] px-8'><FaInstagram /></label>
                                        <input defaultValue={instagram_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type instagram profile username only' id='instagram' name='instagram' type="text" />
                                    </div>

                                    <div className='flex items-center border-[#000] mt-4'>
                                        <label htmlFor="twitter" className='text-2xl py-2 text-white bg-[#000] px-8'><FaTwitter /></label>
                                        <input defaultValue={twitter_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' placeholder='type twitter profile username only' id='twitter' name='twitter' type="text" />
                                    </div>

                                    <button className='bg-black hover:bg-gray-950 duration-200 py-2 mt-5 w-full' type="submit ">{saveLoading ? 'Please wait to save...' : 'Click to save'}</button>
                                </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            :

            // view mode 
            <div className='max-w-[1240px] mx-auto'>
                        {/* <div className={`text-center sticky top-0 ${callServer ? 'bg-green-700': 'bg-red-700'} ${editMode ? 'bg-red-700' : ' bg-green-700'} py-1 rounded-b-md  text-white`}> */}
                        <div className={`text-center ${editMode ? 'bg-red-700' : ' bg-green-700'} py-1 rounded-b-md  text-white`}>
                            <p className='text-sm'>{callServer ? `${serverMsg}` : `${editMode ? 'Edit mode enabled' : 'View mode enabled'}`}</p>
                        </div>
                        <div className=' flex justify-end'>
                <p onClick={() => navigate('/')} className='mr-5 py-2 flex items-end gap-3 text-white cursor-pointer duration-200 underline'>back to home page<IoReturnDownBack /></p>
            </div>
                <div className='flex md:flex-row flex-col gap-5 mt-10 p-5 md:p-0'>
                    <div>
                        <p className='py-2 ml-2'>Image section</p>
                        <label htmlFor="profile_pic" >
                            <div className={`md:w-[300px] md:h-[300px] overflow-hidden #${!profile_pic && buttonBg} rounded-lg`}>
                                <img src={viewImg ? viewImg : profile_pic} alt="" />
                            </div>
                        </label>
                        <input disabled onChange={handleGetPhoto} id='profile_pic' className='hidden' type="file" />
                        {/* <button onClick={handleImageChange}>Upload</button> */}
                    </div>


                    <div className='w-full '>
                        <p className='py-2 ml-2'>Information section</p>
                        <form onSubmit={handleSaveProfile}>
                        <div className='bg-zinc-900 rounded-md w-full px-8 p-8'>
                        <div className='flex justify-end'>
                                <div className="form-control tooltip tooltip-open tooltip-left tooltip-warning" data-tip="Tap to edit profile">
                                    <label className="label cursor-pointer">
                                        {/* <span className="text-md mr-2">{!editMode ? <span>tap to edit</span> :"tap to view"}</span>  */}
                                        <input type="checkbox" onClick={() => setEditMode(!editMode)} className="toggle toggle-success"  />
                                    </label>
                                </div>
                            </div>

                            <input disabled name='name' placeholder='your name...' type="text" className='py-2 bg-transparent outline-none text-4xl ' defaultValue={name && name} /> <br />
                            <input disabled name='bio' placeholder='short biodata...' type="text" className='bg-transparent outline-none text-2xl w-full mb-3' defaultValue={bio} />
                            <hr />

                                <div className='mt-5 md:w-[100%]'>
                                    <div className='flex items-center border-black'>
                                        <label htmlFor="github" className='text-2xl py-2 text-white bg-black px-8'><FaGithub /></label>
                                        <input disabled defaultValue={github_link} className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='github' name='github' type="url" />
                                    </div>

                                    <div className='flex items-center border-[#cbcbcb] mt-4'>
                                        <label htmlFor="portfolio" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><CgWebsite /></label>
                                        <input disabled defaultValue={portfolio_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='portfolio' name='portfolio' type="url" />
                                    </div>

                                    <div className='flex items-center border-[#000] mt-4'>
                                        <label htmlFor="hackerRank" className='text-2xl py-2 text-white bg-[#000] px-8'><FaHackerrank /></label>
                                        <input disabled defaultValue={hackerRank_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='hackerRank' name='hackerRank' type="url" />
                                    </div>

                                    <div className='flex items-center border-[#cbcbcb] mt-4'>
                                        <label htmlFor="codeForce" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><SiCodeforces /></label>
                                        <input disabled defaultValue={codeForce_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='codeForce' name='codeForce' type="url" />
                                    </div>

                                    <div className='flex items-center border-[#000] mt-4'>
                                        <label htmlFor="dribble" className='text-2xl py-2 text-white bg-[#000] px-8'><FaDribbble /></label>
                                        <input disabled defaultValue={dribble_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='dribble' name='dribble' type="url" />
                                    </div>

                                    <div className='flex items-center border-[#cbcbcb] mt-4'>
                                        <label htmlFor="linkedin" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><FaLinkedinIn /></label>
                                        <input disabled defaultValue={linkedin_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='linkedin' name='linkedin' type="url" />
                                    </div>

                                    <div className='flex items-center border-[#000] mt-4'>
                                        <label htmlFor="facebook" className='text-2xl py-2 text-white bg-[#000] px-8'><FaFacebook /></label>
                                        <input disabled defaultValue={facebook_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='facebook' name='facebook' type="url" />
                                    </div>

                                    <div className='flex items-center border-[#cbcbcb] mt-4'>
                                        <label htmlFor="instagram" className='text-2xl py-2 text-[#000] bg-[#cbcbcb] px-8'><FaInstagram /></label>
                                        <input disabled defaultValue={instagram_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='instagram' name='instagram' type="url" />
                                    </div>

                                    <div className='flex items-center border-[#000] mt-4'>
                                        <label htmlFor="twitter" className='text-2xl py-2 text-white bg-[#000] px-8'><FaTwitter /></label>
                                        <input disabled defaultValue={twitter_link}  className='py-2 text-md bg-[#212121] outline-none pl-4 w-full' id='twitter' name='twitter' type="url" />
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