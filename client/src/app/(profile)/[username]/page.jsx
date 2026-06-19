import Button from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { LuUser } from "react-icons/lu";
import { FaChevronRight, FaReact, FaNodeJs  } from "react-icons/fa6";
import { TbBrandNextjs  } from "react-icons/tb";
import { BsTypescript } from "react-icons/bs";
import { RiFocus3Fill } from "react-icons/ri";


function ProfileNavMenu() {
  return (
    <div className='flex gap-5 font-semibold text-sm '>
      <Button size={"xs"} variant={"ghost"}>Overview</Button>
      <Button size={"xs"} variant={"ghost"}>Projects</Button>
      <Button size={"xs"} variant={"ghost"}>Followers</Button>
      <Button size={"xs"} variant={"ghost"}>Following</Button>
      <Button size={"xs"} variant={"ghost"}>Views</Button>
    </div>
  )
}

export default function Profile() {
  return (
    <div>
      <section className='border border-gray-200 rounded-3xl p-5 bg-[#fff] shadow-2xl shadow-mauve-300'>
      {/* Profile summary */}
      <section className='flex'>
        {/* Profile details and metrics */}
        <div className='w-[80%]'>
          <p className='uppercase font-semibold text-gray-400 text-sm'>Profile overview</p>
          <h1 className='text-3xl font-semibold mt-4'>Alex Morgan</h1>

          <p className='text-gray-600 mt-2 w-[70%]'>Alex Morgan is a curious designer and runner who builds clean digital experiences, mentors new creators, and spends weekends exploring cities with a camera and a worn sketchbook.</p>
            
          <div className='mt-5 grid grid-cols-4 gap-5 w-full'>
            <div className='border border-gray-200 rounded-3xl p-5 shadow-3xl '>
              <p className='text-gray-600'>Projects</p>
              <h1 className='text-5xl mt-2'>12</h1>
            </div>

            <div className='border border-gray-200 rounded-3xl p-5 shadow-3xl '>
              <p className='text-gray-600'>Followers</p>
              <h1 className='text-5xl mt-2'>1.8k</h1>
            </div>

            <div className='border border-gray-200 rounded-3xl p-5 shadow-3xl '>
              <p className='text-gray-600'>Following</p>
              <h1 className='text-5xl mt-2'>94</h1>
            </div>
            
            <div className='border border-gray-200 rounded-3xl p-5 shadow-3xl '>
              <p className='text-gray-600'>Views</p>
              <h1 className='text-5xl mt-2'>24.7k</h1>
            </div>
          </div>


      </div>

      {/* Profile image */}
      {/* <div className={`mx-auto my-auto bg-url['/bgs/profile.jpeg']`}>
        <Image className='rounded-full' width={"300"} height={"10"} alt='logo' src={'/bgs/profile.jpeg'}></Image>
        
      </div> */}
      </section>
      {/* Profile actions */}
      <div className='flex gap-2 mt-6 ml-auto justify-end'>
        <Button >Share Profile</Button>
        <Button variant={"filled"}>Edit Profile</Button>
      </div>

          
      </section>

      <section className='mt-10'>
        <ProfileNavMenu></ProfileNavMenu>
      </section>

      {/* About Me */}
      <section className='mt-5 grid grid-cols-3 gap-5'>
        {/* //About me  ///////////////////////*/}
        <div className='p-5 shadow-2xl rounded-3xl bg-white'>
          <div className='flex items-center gap-3 mb-5'>
            <LuUser className='text-2xl text-gray-700'></LuUser>
            <h2 className='font-semibold'>About Me</h2>
          </div>
          <p className='text-gray-600 mt-6'>
            Alex Morgan is a curious designer and runner who builds clean digital experiences, mentors new creators, and spends weekends...
          </p>

          <Button variant='filled' size='sm' className='mt-8 rounded-xl px-6 flex items-center gap-0'>View Full Bio <FaChevronRight className='text-xs'></FaChevronRight> </Button>
        </div>
        
        {/* Tech stack  ///////////////////////*/}
        <div className='p-5 shadow-2xl rounded-3xl bg-white'>
          <div className='flex items-center gap-3 mb-5'>
            <LuUser className='text-2xl text-gray-700'></LuUser>
            <h2 className='font-semibold'>Tech Stack</h2>
          </div>
          
          <div className='flex gap-5 flex-wrap justify-between'>
              <div className='bg-gray-100 rounded-2xl flex justify-center items-center h-[80px] w-[80px]'>
                <FaReact className='text-5xl ' />
              </div>
              <div className='bg-gray-100 rounded-2xl flex justify-center items-center h-[80px] w-[80px]'>
                <TbBrandNextjs className='text-5xl ' />
              </div>
              <div className='bg-gray-100 rounded-2xl flex justify-center items-center h-[80px] w-[80px]'>
                <FaNodeJs  className='text-5xl ' />
              </div>
              <div className='bg-gray-100 rounded-2xl flex justify-center items-center h-[80px] w-[80px]'>
                <BsTypescript  className='text-5xl ' />
              </div>
          </div>

          <button  className='mt-8 rounded-xl text-gray-500 cursor-pointer hover:underline'>+ more technologies</button>
        </div>

        {/* Current Focus  ///////////////////////*/}
        <div className='p-5 shadow-2xl rounded-3xl bg-white'>
          <div className='flex items-center gap-3 mb-5'>
            <RiFocus3Fill className='text-2xl text-gray-700'></RiFocus3Fill>
            <h2 className='font-semibold'>Current Focus</h2>
          </div>
          <p className='text-gray-600 mt-6'>
            Alex Morgan is a curious designer and runner who builds clean digital experiences, mentors new creators, and spends weekends...
          </p>

          <Button variant='filled' size='sm' className='mt-8 rounded-xl px-6 flex items-center gap-0'>View Full Bio <FaChevronRight className='text-xs'></FaChevronRight> </Button>
        </div>
      </section>
    </div>
  )
}
