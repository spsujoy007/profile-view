import { useEffect, useState } from 'react';
import useProfileData from './Hooks/useProfileData';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const jsonuser = localStorage.getItem('userinfo')
    const user = JSON.parse(jsonuser && jsonuser)
    // const userProfile = useProfileData();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://profile-view-be.vercel.app/userdata?username=${user?.username}&token_id=${user?.user_token.split("%")[0]}`);
                const data = await response.json();
                console.log("Protect: ", data)
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData()
    }, [])


    const navigate = useNavigate()
    try{
        if(user?.username && userProfile.code === 22){
            localStorage.removeItem("userinfo")
            return navigate('/signup')
        }
        else if(!user?.username){
            localStorage.removeItem("userinfo")
            return navigate('/signup')
        }
        else{
            return children
        }
    }
    finally{

    }
};

export default ProtectedRoute;