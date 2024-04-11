import React, { useState } from 'react';
import Signup from './signup';
import Login from './Login';

const Home = () => {

    const [singup, setSignup] = useState(false)


    return (
        <div>
            {
                singup ?
                <Signup signup={setSignup}></Signup>
                :
                <div className='h-screen flex items-center justify-center flex-col'>
                    <h1 className='text-[6rem] text-center text-slate-200 uppercase'><span className='text-[#e4bf39] font-bold'>Hey dev!</span> <br /> Welcome to the "profile-view"</h1>
                    <div className='flex gap-2'>
                        <div className="tooltip tooltip-open tooltip-bottom tooltip-info cursor-pointer " data-tip="click on it">
                            <p className='text-white text-xl underline' onClick={() => setSignup(!singup)}>tap create a profile </p> 
                        </div>
                        <p className='text-white text-xl' title="hello world">and show your social id's</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;