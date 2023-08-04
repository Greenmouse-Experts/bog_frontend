import React, { useEffect, useState } from 'react'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux';
import socketIO from 'socket.io-client';


const ChatSendInput = () => {
    const [message, setMessage] = useState('')
    // const [isConnected, setIsConnected] = useState(socket.connected);
    const user = useSelector((state) => state.auth.user.id);
    useEffect(() => {
        const socket = socketIO.connect('https://bog-test-a1d896fbc1d9.herokuapp.com/');
    },[])
    // useEffect(() => {
    //     function onConnect() {
    //       setIsConnected(true);
    //     }
    
    //     function onDisconnect() {
    //       setIsConnected(false);
    //     }
    
    //     socket.on('connect', onConnect);
    //     socket.on('disconnect', onDisconnect);
    //     socket.on('foo', onFooEvent);
    
    //     return () => {
    //       socket.off('connect', onConnect);
    //       socket.off('disconnect', onDisconnect);
    //       socket.off('foo', onFooEvent);
    //     };
    //   }, []);

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
    //   socket.emit('send_message', { user, message, __createdtime__ });
      setMessage('');
    }
  };
  return (
    <>
        <div className='border border-gray-600 flex p-2 items-center rounded-lg'>
            <input onChange={(e) => setMessage(e.target.value)}
        value={message}  placeholder='Enter Your Message...' className='w-full outline-none'/>
            <RiSendPlane2Fill className='text-2xl text-primary' onClick={sendMessage}/>
        </div>
    </>
  )
}

export default ChatSendInput