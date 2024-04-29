import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlitch } from 'react-powerglitch'
import bgimage from '../Assets/profileviewbg.jpg'

const MainHome = () => {
    const navigate = useNavigate()
    const glitch = useGlitch()

    return (
        <div style={{
            backgroundImage: `linear-gradient(120deg, #00000018, #000000c3), url(${bgimage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            imageRendering: "optimizeSpeed"
        }} className=''>
            {/* mx-auto md:max-w-[1240px]  */}
            <div className='mx-auto md:max-w-[1240px] md:px-0 px-10'>
                <div className='flex items-center h-screen'>
                <div className='md:w-[60%]'>
                    <h1 className='md:text-6xl text-5xl w-[80%] overflow-hidden uppercase text-[#e4bf39] font-bold' ref={glitch.ref}>Hey dev!</h1>
                    <h1 className='text-2xl text-white mt-5'>Share your social links and professional profiles</h1>
                    <p className='text-slate-200 text-2xl'>with each other in an extraordinary way.</p>
                    <p className='text-white mt-2'>Also, you can share your profile with HR or any recruiters.</p>
                    <p className='text-[#E4BF39] mt-5'>with a single link you can show all of your social media, professional and coding related profile links. It's very easy to share profiles. Just type your profile usernames and boom! 💥</p>
                    <div className="mt-10 cursor-pointer flex items-center gap-2">
                        <button onClick={() => navigate('/signup')} className='px-5 py-2   md:my-0 my-2 rounded-lg border-[1px] border-[#1a1a1a]  hover:text-slate-200 font-semibold hover:bg-[#0D0D0D] bg-white text-black duration-200 '>Create a account</button>
                        <p>|</p>
                        <button onClick={() => navigate('/login')} className='px-5 py-2    md:my-0 my-2 rounded-lg border-[1px] border-[#1a1a1a]  text-slate-200 font-semibold bg-[#0D0D0D] hover:bg-[#000000] duration-200 uppercase'>Login</button>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
    );
};

export default MainHome;