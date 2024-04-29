import React, { useState } from 'react';
import loginboy from '../pics/loginimage.jpg'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from 'react-icons/fa6';

const Login = () => {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [serverMsg, setServerMsg] = useState(null)
    const [viewPass, setViewPass] = useState(false)

    const navigate = useNavigate()
    const user = JSON.stringify(localStorage.getItem('userinfo'))
    if(user.username) {
        navigate('/')
    }
    // console.log(user)
    const handleSubmitForm = (e) => {
        e.preventDefault()
        const form = e.target
        const username = form.username.value;
        const password = form.password.value;
        // console.log(name, password)
        fetch(`https://profile-view-be.vercel.app/login?username=${username}&pass=${password}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data?.username){
                toast.success("Login successful")
                setSuccess(true)
                setError(false)
                setServerMsg(`Hey ${data.username}! Login successful.`)
                localStorage.setItem('userinfo', JSON.stringify(data))
                setTimeout(() => {
                    navigate("/")
                }, 1500);
            }
            else if(data?.code === 21)
            {
                toast.error(data.message)
                setError(true)
                setSuccess(false)
                setServerMsg("user name or password is incorrect!")
            }
        })
    }

    return (
        <div className='h-screen md:w-[70%] mx-auto'>
                <div className='flex items-center justify-center h-screen md:p-0 p-5  '>
                    <div className='border-[1px] border-[#262626] flex items-center md:flex-row flex-col'>
                        <img className='md:w-[30%]' style={{imageRendering: 'optimizeSpeed'}} src={loginboy} alt="" />
                            <form onSubmit={handleSubmitForm} className='w-full md:px-10 p-5 pb-5 md:pb-0'>
                            <div className='w-full'>
                                    <h1 className='text-[50px] font-bold text-slate-100'>LOGIN</h1>
                                    <p className='text-white'>Enter your username and password</p> <br />
                                    <input required name='username' className='text-md text-slate-200 outline-none py-2 md:w-[90%] w-full  bg-transparent border-b-[1px] border-[#262626] mb-5' placeholder='type your user name here...' id='username' type="text" /> 
                                    <br />
                                    
                                    {/* <label htmlFor="password" className='text-white  mt-5'>create a strong password</label> <br /> */}
                                    <div className='flex items-center'>
                                        <input required name='password' className='text-md text-slate-200 outline-none py-2 md:w-[90%] w-full bg-transparent border-b-[1px] border-[#262626]' placeholder='type your password here...' id='password' type={viewPass ? "text" : "password"} />
                                        <button onClick={() => setViewPass(!viewPass)} title={viewPass ? 'hide password':'view password'} type='button' className='-ml-5 text-white text-xl'>{viewPass ? <FaEye></FaEye> : <FaEyeSlash />}</button>
                                    </div>
                                     <br />

                                    {error && <p className='text-red-600'>{serverMsg}</p>}
                                    {success && <p className='text-green-600'>{serverMsg}</p>}
                                    <button type="submit" className='bg-[#1b1b1b] border-[1px] uppercase border-[#262626] px-5 py-2 mt-2  md:w-[90%] w-full hover:bg-[#2c2c2c] duration-200 text-slate-200' >Submit</button>
                                    <p className='mt-2 text-slate-200'>Are you new in Profile-View? <span onClick={() => navigate('/signup')} className='text-yellow-500 underline font-semibold cursor-pointer'>click to create a account</span></p>
                            </div>
                            </form>
                    </div>
                </div>
        </div>
    );
};

export default Login;