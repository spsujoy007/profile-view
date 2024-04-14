import React from 'react';
import { useLoaderData } from 'react-router-dom';

const UserProfile = () => {

    const {
        bio, 
        name, 
        github_link,
        twitter_link,
        portfolio_link,
        hackerRank_link,
        profile_pic, 
        drible_link,
        linkedin_link,
        facebook_link,
        codeForce_link,
        instagram_link,
    } = useLoaderData() 
    const data = useLoaderData() 
    // console.log(data)

    return (
        <div className='min-h-screen'>
            <h1 className='text-[100px]'>{name}</h1>
            <h1 className='text-[100px]'>sfe</h1>
        </div>
    );
};

export default UserProfile;