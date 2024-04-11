import React from 'react';
import Container from '../Components/Container'
import boyimg from '../pics/signupboy.jpg'
import './signup.css'

const Signup = () => {

    if(!localStorage.getItem('userinfo'))
    {
        localStorage.setItem('userinfo', JSON.stringify([]))
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.username.value;
        const password = form.password.value;
        const userinfo = {
            username: name,
            password: password
        }
        console.log(userinfo)

        // window.location.reload()
        
    }

    return (
        <div className='h-screen'>
                <div className='flex items-center justify-center h-screen md:p-0 p-2'>
                    <div className=' border-[1px] border-[#262626] flex items-center md:flex-row flex-col space-x-16'>
                        <img className='md:w-[30%]' src={boyimg} alt="" />
                        <div className='w-full'>
                            <form onSubmit={handleSubmitForm}>
                                <h1 className='text-[50px] font-bold text-slate-100'>SIGN UP</h1>
                                <p className='text-white'>create a unique username and password</p> <br />
                                <input name='username' className='text-md outline-none py-2 md:w-[50%] w-[90%] bg-transparent border-b-[1px] border-[#262626] mb-5' placeholder='type user name here...' id='username' type="text" /> 
                                <br />
                                
                                {/* <label htmlFor="password" className='text-white  mt-5'>create a strong password</label> <br /> */}
                                <input name='password' className='text-md outline-none py-2 md:w-[50%] w-[90%] bg-transparent border-b-[1px] border-[#262626]' placeholder='type your password here...' id='password' type="password" /> <br />
                                <button type="submit" className='bg-[#1b1b1b] border-[1px] uppercase border-[#262626] px-5 py-2 mt-2 w-[50%] hover:bg-[#2c2c2c] duration-200' >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Signup;