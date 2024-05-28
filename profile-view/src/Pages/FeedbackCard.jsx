import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
var moment = require('moment');
moment().format();
const FeedbackCard = ({feedbackData}) => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [loading, setLoading] = useState(false)

    const {username, feedback, postdate} = feedbackData

    useEffect(() => {
        setLoading(true)
            fetch(`https://profile-view-be.vercel.app/profile/${username}`, {
            method: "GET"
        })
        .then(res => res.json()) // Convert response to text
        .then(data => {
            setLoading(false)
            setUserProfile(data);
        })
        .catch(e => setLoading(false))
    }, [username])

    const postedDate = moment(postdate).startOf('minute').fromNow();    


    // for inner div link: 
    // const urlRegex = /(https?:\/\/[^\s]+)/g;
    // const formattedText = feedback.replace( urlRegex,  '<ahref="$1" target="_blank">$1</a>');

    return (
        <div className='bg-[#090909] p-5 rounded-xl border-[#1d1d1d] border-[1px]'>
            <div className='p-2  rounded-xl'>
                <code><h1><span className='text-green-500'>{`${username} ->`}</span> {feedback}</h1></code>
                {/* <div dangerouslySetInnerHTML={{ __html: formattedText }} ></div> */}
            </div>
            {
                loading ?
                <div className='flex items-center gap-2 mt-5 cursor-pointer'>
                    <div className='w-[45px] h-[45px] rounded-full bg-[#2d2d2d]'></div>
                    <div>
                        <p className='w-[150px] h-[15px] rounded-full bg-[#2d2d2d]'></p>
                        <p className='w-[150px] h-[10px] mt-1 rounded-full bg-[#2d2d2d]'></p>
                    </div>
                </div>
            :
                <div className='flex items-center gap-2 mt-5 cursor-pointer'>
                    <img onClick={() => navigate(`/profile/${username}`)} className='w-[45px] h-[45px] rounded-full' src={userProfile.profile_pic} alt="" />
                    <div>
                        <code><h5>{userProfile.name ? userProfile.name : userProfile.username}</h5></code>
                        <p className='text-sm'>{postedDate}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default FeedbackCard;