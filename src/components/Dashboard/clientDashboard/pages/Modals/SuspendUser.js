import { Button } from '@material-tailwind/react'
import React, { useRef } from 'react'

export const SuspendUser = ({setSuspend, suspendUser,  reload}) => {

    const reason = useRef(null);
    const Suspend = () => {
        setSuspend(false)
        suspendUser(reason.current.value)
    }
  return (
    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={() => setSuspend(false)}>
        <div className="bg-white lg:w-4/12 rounded-md  overscroll-none  w-11/12 pt-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
            <div className="flex w-full lg:px-6 px-5">
                <form className='w-full'>
                    <p className='fs-700'>Please state the reason for suspending this user.</p>
                    <p className='text-secondary fs-300 mt-4'>Note: This user gets alerted of the suspension with the reason stated.</p>
                    <div className='mt-5'>
                        <textarea ref={reason} className='w-full p-2 h-24 border border-gray-400 rounded'/>
                    </div>
                </form>
            </div>
            <div className="bg-light rounded-b-md  py-4 mt-5 text-end px-5">
                <Button variant="outlined" ripple={true} onClick={() => setSuspend(false)}>Cancel</Button>
                <Button className='bg-primary ml-4' onClick={Suspend}>Suspend</Button>
            </div>
        </div>
    </div>
  )
}
