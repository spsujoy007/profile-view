import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from 'react-icons/io5';
import RankingProfileCard from './RankingProfileCard';

const RankingProfiles = () => {
    const navigate = useNavigate()
    const[rankedProfiles, setRankedProfiles] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/profile_ranking", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setRankedProfiles(data)
            console.log(data)
        })
    }, [])
    return (
        <div className='min-h-screen pt-20'>
            <div className='max-w-[800px] mx-auto p-5 bg-[#171717a0] rounded-lg'>
            <div className='flex justify-end'>
                <p onClick={() => navigate('/')} className='mr-5 py-2 flex items-end gap-3 text-white cursor-pointer duration-200 underline'>back to home page<IoReturnDownBack /></p>
            </div>
            <h1 className='text-xl text-white uppercase'>Top 10 Ranked profiles</h1>
            <div className='mt-5'>
                {
                    rankedProfiles.map(p => <RankingProfileCard
                        key={p._id}
                        profileData={p}
                        rankedProfiles={rankedProfiles}
                    ></RankingProfileCard>)
                }
            </div>
            </div>
        </div>
    );
};

export default RankingProfiles;