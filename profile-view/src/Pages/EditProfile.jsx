import React, { useState } from 'react';
import Container from '../Components/Container';
import { FaDribbble, FaFacebook, FaGithub, FaHackerrank, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { SiCodeforces } from "react-icons/si";
import './global.css'

const EditProfile = () => {
    // document.cookie = "username=John Doe";
    // console.log(document.cookie)
    const [viewImg, setViewImg] = useState(undefined)

    const handleGetPhoto = (e) => {
        const file = e.target.files[0]
        if(file){
            const img = URL.createObjectURL(file)
            setViewImg(img)
        }
    }

    const handleSaveProfile = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const bio = form.bio.value
        const github = form.github.value
        const portfolio = form.portfolio.value
        const hackerRank = form.hackerRank.value
        const codeForce = form.codeForce.value
        const drible = form.drible.value
        const linkedin = form.linkedin.value
        const facebook = form.facebook.value
        const instagram = form.instagram.value
        const twitter = form.linkedin.value

        const userdetails = {
            name: name,
            bio: bio,
            github_link: github,
            portfolio_link: portfolio,
            hackerRank_link: hackerRank,
            codeForce_link: codeForce,
            drible_link: drible,
            linkedin_link: linkedin,
            facebook_link: facebook,
            instagram_link: instagram,
            twitter_link: twitter
        }
        console.log(userdetails)
    }

    const buttonBg = 'bg-zinc-900 border-2 border-slate-500 border-dashed '
    return (
        <div className='min-h-screen'>
            <Container>
                        <div className='text-center  bg-green-600 py-1  rounded-sm text-white'>
                            <p className=''>View mode - Tap to edit</p>
                        </div>
                <div className='flex md:flex-row flex-col gap-5 mt-10 p-5 md:p-0'>
                    <div>
                        <p className='py-2 ml-2'>Image section</p>
                        <label htmlFor="profile_pic" >
                            <div className={`w-[300px] h-[300px] ${buttonBg} rounded-lg`}>
                                <img src={viewImg} alt="" />
                            </div>
                            {/* <button className={`uppercase w-full py-2 btn-bg ${buttonBg} mt-1 rounded-b-lg`}> add picture</button> */}
                        </label>
                        <input onChange={handleGetPhoto} id='profile_pic' className='hidden' type="file" />
                    </div>


                    <div className='w-full '>
                        <p className='py-2 ml-2'>Information section</p>
                        <form onSubmit={handleSaveProfile}>
                        <div className='bg-zinc-900 border-2 border-slate-500 border-dashed rounded-md w-full p-5 '>
                            <input name='name' type="text" className='py-2 bg-transparent outline-none text-4xl uppercase' defaultValue={"Sujoy Paul"} /> <br />
                            <input name='bio' type="text" className='bg-transparent outline-none text-2xl w-full mb-3' defaultValue={'Education makes a man to live in live'} />
                            <hr />

                                <div className='mt-5 md:w-[100%]'>
                                    <div className='flex items-center border-y-[1px] border-black'>
                                        <label htmlFor="github" className='text-2xl py-2 text-white bg-black px-8'><FaGithub /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your github id' id='github' name='github' type="url" />
                                    </div>

                                    <div className='flex items-center border-y-[1px] border-[#cbcbcb] mt-4'>
                                        <label htmlFor="portfolio" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><CgWebsite /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your portfolio' id='portfolio' name='portfolio' type="url" />
                                    </div>

                                    <div className='flex items-center border-y-[1px] border-[#000] mt-4'>
                                        <label htmlFor="hackerRank" className='text-2xl py-2 text-white bg-[#000] px-8'><FaHackerrank /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your hackerRank id' id='hackerRank' name='hackerRank' type="url" />
                                    </div>

                                    <div className='flex items-center border-y-[1px] border-[#cbcbcb] mt-4'>
                                        <label htmlFor="codeForce" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><SiCodeforces /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your codeForce id' id='codeForce' name='codeForce' type="url" />
                                    </div>

                                    <div className='flex items-center border-y-[1px] border-[#000] mt-4'>
                                        <label htmlFor="drible" className='text-2xl py-2 text-white bg-[#000] px-8'><FaDribbble /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your drible id' id='drible' name='drible' type="url" />
                                    </div>

                                    <div className='flex items-center border-y-[1px] border-[#cbcbcb] mt-4'>
                                        <label htmlFor="linkedin" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><FaLinkedinIn /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your linkedin id' id='linkedin' name='linkedin' type="url" />
                                    </div>

                                    <div className='flex items-center border-y-[1px] border-[#cbcbcb] mt-4'>
                                        <label htmlFor="facebook" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><FaFacebook /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your facebook id' id='facebook' name='facebook' type="url" />
                                    </div>

                                    <div className='flex items-center border-y-[1px] border-[#000] mt-4'>
                                        <label htmlFor="instagram" className='text-2xl py-2 text-white bg-[#000] px-8'><FaInstagram /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your instagram id' id='instagram' name='instagram' type="url" />
                                    </div>

                                    <div className='flex items-center border-y-[1px] border-[#cbcbcb] mt-4'>
                                        <label htmlFor="twitter" className='text-2xl py-2 text-black bg-[#cbcbcb] px-8'><FaTwitter /></label>
                                        <input className='py-2 text-md outline-none bg-transparent pl-4 w-full' placeholder='your twitter id' id='twitter' name='twitter' type="url" />
                                    </div>

                                    <button className='bg-black hover:bg-gray-950 duration-200 py-2 mt-5 w-full' type="submit ">Save</button>
                                </div>
                        </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default EditProfile;