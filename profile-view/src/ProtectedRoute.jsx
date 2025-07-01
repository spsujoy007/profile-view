import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const jsonuser = localStorage.getItem('userinfo')
    const user = JSON.parse(jsonuser && jsonuser)
    // const userProfile = useProfileData();
    const [userProfile, setUserProfile] = useState({});
    const [calldata, setCalldata] = useState(null);


    // const hasFetched = useRef(false); // Ref to track if fetchUserData has been called

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://profile-view-be.vercel.app/userdata?username=${user.username}&token_id=${user.user_token.split("%")[0]}`);
                const data = await response.json();
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
        // if (!hasFetched.current) {
        //     hasFetched.current = true;
        //     fetchUserData();
        // }
    }, [ user]);
        
        
        const navigate = useNavigate()
        try{
            if(user?.username && userProfile.code === 22){
            localStorage.removeItem("userinfo")
            navigate('/login')
        }
        else if(!user?.username){
            localStorage.removeItem("userinfo")
            navigate('/login')
        }
        else{
            return children
        }
    }
    finally{

    }
};

export default ProtectedRoute;