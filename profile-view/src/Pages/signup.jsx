import React, { useEffect, useState } from 'react';
import boyimg from '../pics/signupboy.jpg'
import './signup.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = ({signup}) => {

    const [error, setError] = useState(false)
    const [getSpace, setGetSpace] = useState(false)
    const [message, setMessage] = useState(null)
    const [spaceMsg, setSpaceMsg] = useState(null)
    const [suggestion_name, setSuggestion_name] = useState(undefined)
    const [password_issue, setPasswordIssue] = useState(false)
    const [pass, setPass] = useState('')
    // console.log(password_issue)

    const navigate = useNavigate()

    // if(!localStorage.getItem('userinfo')) localStorage.setItem('userinfo', JSON.stringify({}))
    const user = JSON.stringify(localStorage.getItem('userinfo'))
    if(user.username) {
        navigate('/')
    }

    useEffect(() => {
        if (pass.length >= 8) {
            setPasswordIssue(false);
        }
    }, [pass]);

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.username.value;
        const password = form.password.value;
        const profile_link = `https://profileview-v01.web.app/profile/${name}`

        if(name.includes(" ")){
            // alert('Remove space')
            setGetSpace(true)
            setSpaceMsg("Please remove space from username")
            return
        }

        if(password.length < 8)
        {
            setPasswordIssue(true)
            return
        }
        if(name[0] !== '@'){
            alert("user name should be start with @")
        }
        else{
            const userinfo = {
                username: name,
                password: password,
                profile_link: profile_link,
                join_date: Date()
            }
            // console.log(userinfo)

            fetch('https://profile-view-be.vercel.app/signup', {
                method: "POST",
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(userinfo)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.code === 20){
                    toast.error('username already exists')
                    setError(true)
                    setMessage(false)
                    setGetSpace(false)
                    setMessage(data.error)
                    setSuggestion_name(name + Math.floor(Math.random() * (100 - 10 + 1))+1)
                }
                else{
                    if(data[0].acknowledged === true){
                        if(error === false)
                        {
                            setError(false)
                        }
                            localStorage.setItem('userinfo', JSON.stringify(userinfo))
                            toast.success('Account created!')
                            navigate('/')
                            // signup(false)
                    }
                }
            })
        }
    }

    return (
        <div className='h-screen w-[90%] mx-auto'>
                <div className='flex items-center justify-center h-screen md:p-0 p-2'>
                    <div className=' border-[1px] border-[#262626] flex items-center md:flex-row flex-col'>
                        <img className='md:w-[30%]' src={boyimg} alt="" />
                            <form onSubmit={handleSubmitForm} className='w-full px-10 pb-5 md:pb-0'>
                            <div className='w-full'>
                                    <h1 className='text-[50px] font-bold text-slate-100'>SIGN UP</h1>
                                    <p className='text-white'>create a unique username and password</p> <br />
                                    <input
                                     required 
                                     autoComplete="false" 
                                     name='username' 
                                     className='text-md pl-2 text-white outline-none py-2 md:w-[90%] w-full bg-transparent border-b-[1px] border-[#262626]' 
                                     placeholder='type a username. ex: @johnsmith' 
                                     id='username' 
                                     type="text" /> 
                                    
                                    <span className='text-red-500 block'> {error && `${message} Try ${suggestion_name} or other`}</span>
                                    <span className='text-red-500 block'> {getSpace && `${spaceMsg}`}</span>

                                    {/* <label htmlFor="password" className='text-white  mt-5'>create a strong password</label> <br /> */}
                                    <input
                                     required 
                                     autoComplete="new-password" 
                                     name='password' 
                                     className='mt-5 pl-2 text-white text-md outline-none py-2 md:w-[90%] w-full bg-transparent border-b-[1px] border-[#262626]' 
                                     placeholder='type your password here...' 
                                     id='password' 
                                     onChange={(e) => setPass(e.target.value)}
                                     type="password" />
                                    <span className='text-red-500 block'> {password_issue && `Password must be 8+ characters.`}</span>
                                     <br />
                                    <button type="submit" className='bg-[#101317] border-[1px] capitalize border-[#262626] px-5 py-2 mt-2 md:w-[90%] w-full hover:bg-[#2c2c2c] duration-200' >Create account or Press Enter</button>
                                    <p className='mt-2'>Do you have an account? <span onClick={() => navigate('/login')} className='text-white underline font-bold cursor-pointer'>click to log in</span></p>
                            </div>
                            </form>
                    </div>
                </div>
        </div>
    );
};

export default Signup;