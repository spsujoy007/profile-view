import React from 'react';
import loginboy from '../pics/loginboy.jpeg'

const Login = () => {

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.username.value;
        const password = form.password.value;
        console.log(name, password)
    }

    return (
        <div className='h-screen w-[90%] mx-auto'>
                <div className='flex items-center justify-center h-screen md:p-0 p-2'>
                    <div className='border-[1px] border-[#262626] flex items-center md:flex-row flex-col'>
                        <img className='md:w-[30%]' src={loginboy} alt="" />
                            <form onSubmit={handleSubmitForm} className='w-full px-10 pb-5 md:pb-0'>
                            <div className='w-full'>
                                    <h1 className='text-[50px] font-bold text-slate-100'>LOGIN</h1>
                                    <p className='text-white'>Enter your username and password</p> <br />
                                    <input name='username' className='text-md outline-none py-2 md:w-[90%] w-full  bg-transparent border-b-[1px] border-[#262626] mb-5' placeholder='type user name here...' id='username' type="text" /> 
                                    <br />
                                    
                                    {/* <label htmlFor="password" className='text-white  mt-5'>create a strong password</label> <br /> */}
                                    <input name='password' className='text-md outline-none py-2 md:w-[90%] w-full bg-transparent border-b-[1px] border-[#262626]' placeholder='type your password here...' id='password' type="password" /> <br />
                                    <button type="submit" className='bg-[#1b1b1b] border-[1px] uppercase border-[#262626] px-5 py-2 mt-2  md:w-[90%] w-full hover:bg-[#2c2c2c] duration-200' >Submit</button>
                            </div>
                            </form>
                    </div>
                </div>
        </div>
    );
};

export default Login;