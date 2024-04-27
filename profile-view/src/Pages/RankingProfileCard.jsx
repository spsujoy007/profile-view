import React from 'react';
import null_avatar from '../Assets/null_avatar.jpg'
import { useNavigate } from 'react-router-dom';

const RankingProfileCard = ({profileData, rankedProfiles}) => {
    const navigate = useNavigate()

    const {profile_pic, name, username, profile_view, profile_likes, profile_link} = profileData
    const ifTOP = profileData.profile_likes === rankedProfiles[0].profile_likes && profileData.profile_view === rankedProfiles[0].profile_view
    return (
        <div
                        className={`${ifTOP  ? 'bg-[#53142D]' : 'bg-[#1f1f1f]'} mb-3  rounded-md flex items-center justify-between gap-x-2 border-[1px] hover:border-[#363636] border-[#0e0e0e]`}
                    >
                        <div className='flex items-center gap-x-2 px-2 py-1'>
                            <img src={profile_pic ? profile_pic : null_avatar} className='w-[35px] h-[35px] rounded-full border-[1px] p-1 border-[#373737]' alt="" />
                            <h4 className={`${ifTOP ? "text-white text-lg":"text-white text-md"} `}>{name ? name.split(0,15) : username.split(0,15)}</h4>
                        </div>


                        <div className='flex items-center gap-x-2 uppercase h-full'>
                            <p>views: {profile_view > 999 ? `${String(profile_view)[0]}k+` : profile_view}</p>
                            <p>|</p>
                            <p>liked: {profile_likes ? profile_likes : 0}</p>
                            <p onClick={() => navigate(`/profile/${username}`)} className={`ml-5 cursor-pointer h-full py-3 px-2 ${ifTOP ? "bg-[#771f3f]" : "bg-black"} text-white text-sm`} >view profile</p>
                        </div>
                    </div>
    );
};

export default RankingProfileCard;