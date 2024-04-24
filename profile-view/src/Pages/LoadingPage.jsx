import React from 'react';
import './LoadingPage.css'

const LoadingPage = () => {
    return (
        <div className='min-w-full min-h-screen bg-[#121212dd]'>
           <div class="loader"></div>
           <div className='flex items-center justify-center h-screen '>
                <p className='mt-36 text-xl uppercase text-white'><span className='text-[#D5133A]'>Hey dev!</span> wait for sometime...</p>
           </div>
        </div>
    );
};

export default LoadingPage;