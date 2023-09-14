import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'

const DispatchProjectModal = ({closeModal, getProjectPartner}) => {
    const [score, setScore] = useState(0);
    const [errorAlert, setError] = useState(true);

    const setData = (number) => {
        setScore(number);
        if ((number === 0) || (isNaN(number) || (number > 5))) {
            setError(true)
        }
        else {
            setError(false)
        }
    }

    const submitProjectToPartners = () => {
            getProjectPartner(score);
            closeModal();
    }

    return (
        <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={closeModal}>
            <div className="bg-white lg:w-5/12 rounded-md  overscroll-none  w-11/12 pt-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
                <div className="lg:px-6 px-5">
                    <form>
                        <p className='fs-700 border-b border-gray-600 pb-1'>Dispatch Project to Service Partners with score.</p>
                        <div className=' mt-5'>
                            <p>Enter rating score for selecting service partner</p>
                            <div className='flex items-center border rounded mt-3 w-8/12 p-2'>
                            <p className='p-1 fw-600 w-3/12'>(0-5)</p>
                                <input type='number' placeholder='Enter Rating Score' value={score} onChange={(e) => setData(e.target.valueAsNumber)} className='w-9/12 border-l pl-4 p-1 ml-1 outline-none'/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="bg-light rounded-b-md  py-4 mt-5 text-end px-5">
                    <Button variant="outlined" ripple={true} onClick={closeModal}>Close</Button>
                    <Button className='bg-primary ml-4' disabled={errorAlert} onClick={submitProjectToPartners}>Get Service Partners</Button>
    
                </div>
            </div>
        </div>
      )
}

export default DispatchProjectModal