import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FeedbackCard from './FeedbackCard';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBack } from 'react-icons/io5';

const FeedbackField = () => {
    const findUser = JSON.parse(localStorage.getItem('userinfo'))
    const [typing, setTyping] = useState(false)
    const [feedbackText, setFeedbackText] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [feedbackDatas, setFeedbackDatas] = useState([])

    // console.log(feedbackText)
    const handlePostFeedback = () => {
        setLoading(true)
        const postbody = {
            username: findUser.username,
            postdate: moment(new Date()).format(),
            feedback: feedbackText
        }
        if(feedbackText.length > 1){

            fetch(`https://profile-view-be.vercel.app/feedback?username=${findUser.username}`, {
                method: "POST",
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(postbody)
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    setLoading(false)
                    refetch()
                    setTyping(false)
                }
            })
            .catch(e => {
                console.error(e)
                setLoading(false)
                setTyping(false)
            })
        }
        else{
            toast.error('Please type something before send')
        }
    }

    useEffect(() => {
        refetch()
    }, [])

    const refetch = () => {
        fetch(`https://profile-view-be.vercel.app/getfeedbacks`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setFeedbackDatas(data)
            // console.log(data);
        })
    }

    return (
        <div className='min-h-full bg-black pt-[100px]'>
            <div className=''>
                {/* <div className='flex justify-end w-full mx-auto bg-[#2e2e2e] top-0 fixed z-10 px-5' >
                    <p onClick={() => navigate('/')} className='py-2 flex items-end gap-3 hover:underline cursor-pointer duration-200 text-slate-200 text-right'>back to home page<IoReturnDownBack /></p>
                </div> */}
            <div className='mx-auto md:w-[1040px] '>
                <div className='flex justify-center '>
                    <input onFocus={() => setTyping(true)} placeholder='type your feedback' type="text" className='btn-bg border-[1px] w-[800px] sticky top-3 px-2 py-2 rounded-lg outline-none border-[#242424] placeholder:text-gray-500' />
                </div>
            </div>

            <div className='mx-auto md:w-[800px] mt-20 pb-10 min-h-screen'>
                {
                    feedbackDatas.length > 0 && <p className='ml-2 pb-1 text-gray-300'>Public feedbacks & comments</p>
                }
                {
                    feedbackDatas.length < 1 &&
                    <div className='flex items-center justify-center'>
                        <p className='text-gray-300'>There are no feedback to show!</p>
                    </div>
                }
                <div className='space-y-5'>
                    {
                        feedbackDatas.map(feedback => <FeedbackCard
                            key={feedback._id}
                            feedbackData={feedback}
                        ></FeedbackCard>)
                    }
                </div>
            </div>

            {/* textarea button post  */}
            {
                typing &&
                <div className=' top-0 fixed textBox bg-[#0a0a0aca] w-full h-full'>
                     <div className='flex justify-center items-center h-full '>
                    <div className='min-w-[500px] max-w-[500px] min-h-[290px] shadow-2xl shadow-[#a6a6a61a] max-h-[290px] bg-[#050505] p-5 rounded-xl'>
                        
                        <textarea 
                            name="feedbacktext" 
                            id="feedbacktext" 
                            placeholder='type your feedback...' 
                            autoFocus
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className='w-full min-h-[200px] max-h-[200px] rounded-xl btn-bg border-[1px] border-[#242424] placeholder:text-gray-500 outline-none p-2 font-mono text-lg'>
                        </textarea>

                        <div className='flex items-center mt-3'>
                            <button onClick={() => setTyping(false)} className='rounded-xl hover:bg-slate-200 hover:text-black text-white duration-300 h-full py-2 w-1/2'><code>Cancel</code></button>
                            <p>|</p>
                            <button onClick={handlePostFeedback} className='rounded-xl hover:bg-slate-200 hover:text-black text-white duration-300 h-full py-2 w-1/2'><code>Send</code></button>
                        </div>
                    </div>
                </div>
                </div>
            }

            
        </div>
        </div>
    );
};

export default FeedbackField;