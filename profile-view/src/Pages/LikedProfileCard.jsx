import React, { useEffect, useState } from 'react';
import null_avatar from '../Assets/null_avatar.jpg'
import { useNavigate } from 'react-router-dom';


const LikedProfileCard = ({likedData}) => {
    const [userProfile, setUserProfile] = useState({})
    const navigate = useNavigate()
    const {
        bio, 
        name, 
        username,
        profile_pic, 
    } = userProfile


    useEffect(() => {
            fetch(`http://localhost:5000/profile/${likedData?.username}`, {
            method: "GET"
        })
        .then(res => res.json()) // Convert response to text
        .then(data => {
            setUserProfile(data);
        })
    }, [likedData.username])

    return (
        <div className='cursor-pointer flex items-center gap-x-2 btn-bg py-1 border-[1px] border-[#242424] hover:bg-[#282828] p-2'  onClick={() => navigate(`/profile/${username}`)}>
            <img className='w-[40px] h-[40px] rounded-full' src={profile_pic ? profile_pic : null_avatar} alt="" />
            <p className='text-white '>{name ? name : username}</p>
        </div>

        // <div className='mb-2 bg-[#000] relative mx-auto md:w-fit w-[300px]'>
        //     <img className='' src={profile_pic ? profile_pic : null_avatar} alt="" />
        //     <div className='p-2 h-[130px]'>
        //         <h4 className='text-lg text-white'>{name ? name: username}</h4>
        //         <p className='text-sm mt-2'>{bio && bio.slice(0, 50)}...</p>
        //     </div>
        //     <button onClick={()=> navigate(`/profile/${username}`)} className=' bottom-0 w-full '>View Profile</button>
        // </div>
    );
};

export default LikedProfileCard;