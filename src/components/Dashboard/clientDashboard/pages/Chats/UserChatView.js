import React from 'react'
import ChatSendInput from './SendInput'
import { useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { BsCheck2All, BsCheckAll } from 'react-icons/bs'
import io from "socket.io-client";
import { useEffect } from 'react'

// const socket = io.connect('/');
const dummyMsg = [
    {
        chat: "Hello, What is the issue with my product",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "Hello, We are working on resolving the issue",
        status: "delivered",
        from: "admin",
        time: "2 hours ago"
    },
    {
        chat: "How long will this take",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "I need to complete this project on time",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "We're on it, you will get it before the day is over",
        status: "delivered",
        from: "admin",
        time: "2 hours ago"
    },
    {
        chat: "Hello, We are working on resolving the issue",
        status: "delivered",
        from: "admin",
        time: "2 hours ago"
    },
    {
        chat: "How long will this take",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "I need to complete this project on time",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "We're on it, you will get it before the day is over",
        status: "delivered",
        from: "admin",
        time: "2 hours ago"
    }
]
const UserChatView = ({item}) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);

  // Runs whenever a socket event is recieved from the server
//   useEffect(() => {
//     socket.on('receive_message', (data) => {
//       console.log(data);
//       setMessagesReceived((state) => [
//         ...state,
//         {
//           message: data.message,
//           username: data.username,
//           __createdtime__: data.__createdtime__,
//         },
//       ]);
//     });

// 	// Remove event listener on component unmount
//     return () => socket.off('receive_message');
//   }, [socket]);
  return (
    <>
        <div className='h-full py-5'>
            <div className='border-b px-5 pb-2'>
                <p className='fw-600 text-gray-600'>{item.name}</p>
            </div>
            <div className='h-[500px] bg-gray-100 grid content-end'>
            <div className='bg-gray-100 py-5 px-5 grid-container chat'>
                {
                    dummyMsg && dummyMsg.map((item, index) => (
                        <div key={index} className={`flex h-auto ${item.from === "user" && 'justify-end'}`}>
                            <div className={`mt-2 p-4 rounded-lg ${item.from === "user"? 'bg-primary text-white' : 'bg-light'}`}>
                            <p className='fs-500'>{item.chat}</p>
                            <div className='flex justify-between items-center mt-2'>
                            <div className='flex items-center gap-x-1'>
                                <BiTime className={`text-sm ${item.from === "user"? '' : 'text-gray-500'}`}/>
                            <p className='italic text-xs'>{item.time}</p>
                            </div>
                            <div>
                                {
                                    item.status === "delivered"?  <BsCheck2All className={`text-xl ${item.from === "user"? '' : 'text-gray-500'}`}/> : <BsCheckAll className={`text-xl ${item.from === "user"? '' : 'text-gray-500'}`}/>
                                }
                            </div>
                            </div>
                        </div>
                        </div>
                    ))
                }
            </div>
            </div>
            <div>
                <div className='p-2'>
                    <ChatSendInput/>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserChatView