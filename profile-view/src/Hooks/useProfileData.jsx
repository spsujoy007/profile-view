import React, { useEffect, useState } from 'react';

const useProfileData = () => {
    const user = JSON.parse(localStorage.getItem('userinfo'))
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://profile-view-be.vercel.app/userdata?username=${user.username}`);
                const data = await response.json();
                setUserProfile(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [user.username]); // Only re-run the effect if user.username changes

    return userProfile;
};

export default useProfileData;
