import React from 'react'

const UserMessageList = ({select, selected}) => {
  return (
    <>
        <ul className='mt-6'>
            {
                dummyUser && dummyUser.map((item, index) => (
                    <li className={`flex mt-1 gap-x-2 cursor-pointer hover:bg-light p-2 ${selected.name === item.name && 'bg-light'}`} onClick={() => select(item)}>
                        <img src={item.img} alt='profile' className='w-12 h-12 circle border-2'/>
                        <div>
                            <p className='fs-400'>{item.name}</p>
                            <p className='fs-300 text-gray-600'>{item.usertype}</p>
                        </div>
                    </li>
                ))
            }
        </ul>
    </>
  )
}

export default UserMessageList

const dummyUser = [
    {
        name: "Wike Sodic",
        usertype: "Private Client",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1675628632/BOG/civil_wxpcph.png",
        lastTime: "5 mins ago"
    },
    {
        name: "Sadim Musa",
        usertype: "Private Client",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1675628632/BOG/civil_wxpcph.png",
        lastTime: "5 mins ago"
    },
    {
        name: "Priyan Mousa",
        usertype: "Product Partner",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1675628632/BOG/prof_q4puqv.png",
        lastTime: "5 mins ago"
    },
    {
        name: "Kilam Nammam",
        usertype: "Corporate Client",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1675628632/BOG/civil_wxpcph.png",
        lastTime: "5 mins ago"
    },
    {
        name: "Judah Nimpac",
        usertype: "Private Client",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1675628632/BOG/civil_wxpcph.png",
        lastTime: "5 mins ago"
    },
    {
        name: "Billie Nimom",
        usertype: "Service Partner",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1675628632/BOG/prof_q4puqv.png",
        lastTime: "5 mins ago"
    },
]