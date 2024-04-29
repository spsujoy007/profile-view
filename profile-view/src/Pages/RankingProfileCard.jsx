import React from 'react';
import null_avatar from '../Assets/null_avatar.jpg'
import { useNavigate } from 'react-router-dom';

const RankingProfileCard = ({profileData, rankedProfiles}) => {
    const navigate = useNavigate()

    const {profile_pic, name, username, profile_view, profile_likes, profile_link} = profileData
    const ifTOP = profileData.profile_likes === rankedProfiles[0].profile_likes && profileData.profile_view === rankedProfiles[0].profile_view
    return (
        <div 
            className={`${ifTOP  ? 'bg-[#53142D]' : 'bg-[#1f1f1f]'} mb-3  rounded-md flex md:flex-row flex-col md:items-center md:justify-between gap-x-2 border-[1px] hover:border-[#363636] border-[#0e0e0e]`} >
                
                        <div className='flex items-center gap-x-2 px-2 py-1'>
                            <img src={profile_pic ? profile_pic : null_avatar} className='w-[35px] h-[35px] rounded-full border-[1px] p-1 border-[#bb3c6a]' alt="" />
                            <h4 className={`${ifTOP ? "text-white text-lg":"text-white text-md"} `}>{name ? name.split(0,15) : username.split(0,15)}</h4>
                        </div>


                        <div className='flex items-center justify-between gap-x-1 h-full md:p-0 p-2 text-slate-200 text-sm'>
                            <p>Views: {profile_view > 999 ? `${String(profile_view)[0]}k+` : profile_view}</p>
                            <p>-</p>
                            <p>Likes: {profile_likes ? profile_likes : 0}</p>
                            <p onClick={() => navigate(`/profile/${username}`)} className={`ml-5 cursor-pointer h-full md:w-fit text-center  py-3 px-2 w-[40%] ${ifTOP ? "bg-[#771f3f]" : "bg-black"} text-white text-sm`} >view profile</p>
                        </div>
                    </div>
    );
};

export default RankingProfileCard;