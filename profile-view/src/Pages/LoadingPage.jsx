import React from 'react';
import './LoadingPage.css'

const LoadingPage = () => {
    return (
        <div className='min-w-screen min-h-screen flex items-center justify-center bg-[#121212f1]'>
           <div>
                <div className="loader"></div>
                <div className='flex items-center justify-center h-screen '>
                        <p className='mt-36 text-xl uppercase text-white'><span className='text-[#D5133A]'>Hey dev!</span> wait for sometime...</p>
                </div>
           </div>
        </div>
    );
};

export default LoadingPage;