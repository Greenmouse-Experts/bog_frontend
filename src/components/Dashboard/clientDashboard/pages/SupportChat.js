import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { ClientChatOption, ProductChatOption, ProjectChatOption } from './Chats/constants';
import UserChatView from './Chats/UserChatView';
import EmptySelected from './Chats/emptySelected';

const ClientSupportChat = () => {
    const user = useSelector((state) => state.auth.user.profile.userType);
    const [selected, setSelected] = useState('')
   const renderAdmins = (user) => {
    switch (user) {
        case "private_client":
          return ClientChatOption;
        case "corporate_client":
            return ClientChatOption;
        case "professional":
          return ProjectChatOption;
        case "vendor":
          return ProductChatOption;
        default:
          return "";
      }
   }
  return (
    <>
        <div className='p-5 min-h-screen'>
            <div className='p-5 bg-white items-center flex justify-between'>
                <div className='w-7/12'>
                    <p className='text-2xl fw-600'>Welcome to BOG Chat Support</p>
                    <p className='fs-500 mt-2 text-gray-600'>BOG Chat Support extends a warm welcome, committed to delivering exceptional assistance and prompt resolution of all your inquiries.</p>
                </div>
                <div className='w-5/12 h-36 bg-support bg-center bg-cover'>
                </div>
            </div>
            <div className='mt-12'>
                <div className='bg-white shadow-lg p-5 lg:min-h-[600px] flex'>
                    <div className='w-[300px]'>
                        <p className='border-b-2 pb-2 text-primary fw-600'>BOG ADMIN(S)</p>
                        <div className='mt-10'>
                            <ul>
                            {
                                renderAdmins(user).map((item, index) => (
                                    <li key={index} className={`flex items-center p-2 rounded-lg cursor-pointer mt-4 gap-x-2 ${selected.name === item.name && 'bg-light'}`} onClick={() => setSelected(item)}>
                                        <img src={item.img} alt='profile' className='w-12 h-12 circle border-2'/>
                                        {item.name}
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='border rounded-lg h-full'>
                            {selected && <UserChatView item={selected}/>}
                            {!selected && <EmptySelected/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ClientSupportChat