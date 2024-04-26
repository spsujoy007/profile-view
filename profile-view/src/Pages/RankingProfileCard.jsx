import React from 'react';
import null_avatar from '../Assets/null_avatar.jpg'

const RankingProfileCard = ({profileData, rankedProfiles}) => {

    const {profile_pic, name, username, profile_view, profile_likes, profile_link} = profileData
    const ifTOP = profileData.profile_likes === rankedProfiles[0].profile_likes
    return (
        <div
                        className={`${ifTOP  ? 'bg-[#53142D]' : 'bg-[#1f1f1f]'} mb-3 px-2 py-1 rounded-md flex items-center justify-between gap-x-2 border-[1px] hover:border-[#363636] border-[#0e0e0e]`}
                    >
                        <div className='flex items-center gap-x-2'>
                            <img src={profile_pic ? profile_pic : null_avatar} className='w-[35px] h-[35px] rounded-full border-[1px] p-1 border-[#373737]' alt="" />
                            <h4 className={`${ifTOP ? "text-white text-lg":"text-white text-md"} `}>{name ? name.split(0,15) : username.split(0,15)}</h4>
                        </div>


                        <div className='flex items-center gap-x-2 uppercase'>
                            <p>views: {profile_view}</p>
                            <p>|</p>
                            <p>liked: {profile_likes ? profile_likes : 0}</p>
                            <a className='ml-5 text-white underline' target='_blank' rel="noreferrer" href={profile_link}>view profile</a>
                        </div>
                    </div>
    );
};

export default RankingProfileCard;