import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from 'react-icons/io5';
import RankingProfileCard from './RankingProfileCard';
import MiniLoading from './MiniLoading';

const RankingProfiles = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const[rankedProfiles, setRankedProfiles] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch("https://profile-view-be.vercel.app/profile_ranking", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setRankedProfiles(data)
            setLoading(false)
            // console.log(data)
        })
    }, [])
    return (
        <div className='min-h-screen pt-20'>
            <div className='md:max-w-[800px] mx-auto p-5 bg-[#171717a0] rounded-lg'>
            <div className='flex justify-end'>
                <p onClick={() => navigate('/')} className='mr-5 py-2 flex items-end gap-3 text-white cursor-pointer duration-200 '>back to home page<IoReturnDownBack /></p>
            </div>
            <h1 className='text-xl text-white uppercase'>Top 10 Ranked profiles</h1>
            {
                loading ?
                <MiniLoading></MiniLoading>
                :
                <div className='mt-5'>
                {
                    rankedProfiles.map(p => <RankingProfileCard
                        key={p._id}
                        profileData={p}
                        rankedProfiles={rankedProfiles}
                    ></RankingProfileCard>)
                }
            </div>
            }
            </div>
        </div>
    );
};

export default RankingProfiles;