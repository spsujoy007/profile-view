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

            fetch(`http://localhost:5000/feedback?username=${findUser.username}`, {
                method: "POST",
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(postbody)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    setLoading(false)
                    refetch()
                    setTyping(false)
                }
            })
            .catch(e => {
                console.log(e)
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
        fetch(`http://localhost:5000/getfeedbacks`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setFeedbackDatas(data)
        })
    }

    return (
        <div className='min-h-[100vh] max-w-[100vw] relative'>
            <div className='mx-auto md:w-[1040px] '>
                <div className='flex justify-end w-[800px] mx-auto'>
                    <p onClick={() => navigate('/')} className='mr-5 py-2 flex items-end gap-3 hover:underline cursor-pointer duration-200 text-slate-200 fixed z-10 bg-black px-5'>back to home page<IoReturnDownBack /></p>
                </div>
                <div className='flex justify-center mt-14'>
                    <input onFocus={() => setTyping(true)} placeholder='Type your feedback' type="text" className='btn-bg border-[1px] w-[800px] sticky top-3 px-2 py-2 rounded-lg outline-none border-[#242424] placeholder:text-gray-500' />
                </div>
            </div>

            <div className='mx-auto md:w-[800px] mt-20 pb-10'>
                {
                    feedbackDatas.length > 0 && <p className='ml-2 pb-1 text-gray-300'>Public feedbacks</p>
                }
                {
                    feedbackDatas.length < 1 &&
                    <div className='flex items-center justify-center'>
                        <p className='text-gray-300'>There are no feedback to show!</p>
                    </div>
                }
                <div className='space-y-3'>
                    {
                        feedbackDatas.map(feedback => <FeedbackCard
                            key={feedback.username}
                            feedbackData={feedback}
                        ></FeedbackCard>)
                    }
                </div>
            </div>

            {/* textarea button post  */}
            {
                typing &&
                <div className={`absolute textBox top-0 w-full h-full bg-[#131313cb] p-5`}>
                <div className='flex justify-center items-center h-full '>
                    <div className='min-w-[500px] max-w-[500px] min-h-[290px] shadow-2xl shadow-[#464646b6] max-h-[290px] bg-[#050505] p-5 rounded-xl'>
                        
                        <textarea 
                            name="feedbacktext" 
                            id="feedbacktext" 
                            placeholder='Type your feedback...' 
                            autoFocus
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className='w-full min-h-[200px] max-h-[200px] rounded-xl btn-bg border-[1px] border-[#242424] placeholder:text-gray-500 outline-none p-2 font-mono text-lg'>
                        </textarea>

                        <div className='flex items-center mt-3'>
                            <button onClick={() => setTyping(false)} className='rounded-l-xl hover:bg-slate-200 hover:text-black text-white duration-300 h-fit py-2 w-1/2'><code>Cancel</code></button>
                            <p>|</p>
                            <button onClick={handlePostFeedback} className='rounded-r-xl hover:bg-slate-200 hover:text-black text-white duration-300 h-fit py-2 w-1/2'><code>Send</code></button>
                        </div>
                    </div>
                </div>
            </div>
            }

            
        </div>
    );
};

export default FeedbackField;