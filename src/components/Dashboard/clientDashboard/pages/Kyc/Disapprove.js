import { Button } from '@material-tailwind/react'
import React, {useState} from 'react'
import { FaTimes } from 'react-icons/fa'
import Axios from '../../../../../config/config'
import toast from 'react-hot-toast'

const DisapproveKyc = ({id, userid, close}) => {
    const [reason, setReason] = useState('')
    const disapproveKyc = async () => {
        const authToken = localStorage.getItem("auth_token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        };
        let url = `/kyc/document/approval/${id}/${userid}`;
        const payload = {
          approved: false,
          reason: reason,
        };
        try {
          const res = await Axios.post(url, payload, config);
          if(res.data){
            toast.success('Disapproved successfully', {
                duration: 6000,
                position: "top-center",
              });
          }
        } catch (error) {
          toast.error(error.message, {
            duration: 6000,
            position: "top-center",
            style: { background: "#BD362F", color: "white" },
          });
        }
      };
  return (
    <>
        <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={close}>
        <div className="bg-white lg:w-4/12 rounded-md  overscroll-none  w-11/12 pt-5 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
            <p className='px-2 lg:px-4 text-xl border-b'>Disapprove Partner's KYC</p>
            <div className="lg:px-4 px-2 mt-4">
                <form>
                    <p className='fs-700 mb-1'>Reason for disapproval <span className='text-red-500'>*</span></p>
                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} className='h-36 mt-3 rounded border border-gray-500 outline-none p-2 w-full'/>
                </form>
            </div>
            <div className="bg-light rounded-b-md  py-4 mt-5 text-end px-5">
                <Button className='bg-primary' onClick={disapproveKyc}>Disapprove</Button>
            </div>
            <FaTimes className='absolute top-3 right-4 text-xl text-gray-500' onClick={close}/>
        </div>
    </div>
    </>
  )
}

export default DisapproveKyc