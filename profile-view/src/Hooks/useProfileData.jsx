import React, { useEffect, useState } from 'react';

const useProfileData = () => {
    const user = JSON.parse(localStorage.getItem('userinfo'))[0]
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        refetch()
    }, [user.username])

    const refetch = () => {
        fetch(`http://localhost:5000/userdata?username=${user.username}`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        setUserProfile(data)
    })
    }
    return userProfile
};

export default useProfileData;