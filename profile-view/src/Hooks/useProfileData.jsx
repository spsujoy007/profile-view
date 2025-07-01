import React, { useEffect, useState } from 'react';

const useProfileData = () => {
    const user = JSON.parse(localStorage.getItem('userinfo'));
    const [userProfile, setUserProfile] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://profile-view-be.vercel.app/userprofile?username=${user?.username}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                const data = await response.json();
                if(data && data?.code === 22)
                {
                    const getinfo = localStorage.getItem('userinfo')
                    if(getinfo){
                        localStorage.setItem('userinfo', JSON.stringify({}))
                    }
                }
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                localStorage.removeItem('userinfo')
            }
        };

        fetchData();
    }, [user?.username]); // Only re-run the effect if user.username changes

    return userProfile;
};

export default useProfileData;
