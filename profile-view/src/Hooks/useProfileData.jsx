import React, { useEffect, useState } from 'react';

const useProfileData = () => {
    const user = JSON.parse(localStorage.getItem('userinfo'))[0]
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/userdata?username=${user.username}`);
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
