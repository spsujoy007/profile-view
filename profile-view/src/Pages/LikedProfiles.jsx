import React, { useEffect, useState } from 'react';
import useProfileData from '../Hooks/useProfileData';
import LikedProfileCard from './LikedProfileCard';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from 'react-icons/io5';
import MiniLoading from './MiniLoading';

const LikedProfiles = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {username} = JSON.parse(localStorage.getItem('userinfo'))

    const [likedProfiles, setLikedProfiles] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch(`https://profile-view-be.vercel.app/mylikedProfiles?username=${username}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setLikedProfiles(data.likedProfiles)
            setLoading(false)
        })
    }, [username])
    return (
        <div className='min-h-screen pt-20'>
            <div className='max-w-[800px] mx-auto p-5 bg-[#171717a0] rounded-lg '>
                <div className='flex justify-end'>
                    <p onClick={() => navigate('/')} className='mr-5 py-2 flex items-end gap-3 text-white cursor-pointer duration-200 '>tap to back<IoReturnDownBack /></p>
                </div>
                <h3 className='text-xl mb-2 uppercase text-white'>Your liked profiles: {likedProfiles.length}</h3>
                <hr />
                {
                    loading ?
                    <MiniLoading></MiniLoading>
                    :
                    <div className={`mt-8 grid md:grid-cols-3 grid-cols-1 gap-2`}>
                    {
                        likedProfiles.map(data => <LikedProfileCard
                            key={data.username}
                            likedData={data}
                        ></LikedProfileCard>)
                    }
                </div>
                }
            </div>
        </div>
    );
};

export default LikedProfiles;