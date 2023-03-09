import { Button } from '@material-tailwind/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { commitmentFee } from '../../../../../redux/actions/ProjectAction';


export const CommencementModal = ({ setCommencement }) => {

    const CloseModal = () => {
        setCommencement(false)
    }
    const [point, setPoint] = useState();
    const dispatch = useDispatch();

    const changePoint = (e) => {
        setPoint(e.target.value)
    }

    const setFee = () => {
        const payload = {
            amount : point
        }
        dispatch(commitmentFee(payload));
        CloseModal();
    }

    return (
        <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
            <div className="bg-white lg:w-5/12 rounded-md  overscroll-none  w-11/12 pt-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
                <div className="flex lg:px-6 px-5">
                    <form>
                        <p className='fs-700'>Set Commencement Fee to be Paid by Client For Every Requested Project</p>
                        <div className='flex w-full justify-center mt-5'>
                            <p>&#8358;</p>
                                <div className='flex items-center border rounded ml-4 w-48'>
                                    <input type='number' value={point} onChange={changePoint} className='w-full p-1' />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="bg-light rounded-b-md  py-4 mt-5 text-end px-5">
                    <Button variant="outlined" ripple={true} onClick={CloseModal}>Cancel</Button>
                    <Button className='bg-primary ml-4' onClick={setFee}>Submit</Button>

                </div>
            </div>
        </div>
    )
}
