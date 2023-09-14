import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { useDispatch } from 'react-redux';
import { DispatchProject } from '../../../../../redux/actions/ProjectAction';
import { Loader } from '../../../../layouts/Spinner';

const SuggestedPartners = ({ data, closeModal, prjId, loading }) => {

    const [selected, setSelected] = useState([]);

    const dispatch = useDispatch();

    const submitProjectToPartners = () => {
        const payload = {
            partners : selected
        }
        dispatch(DispatchProject(prjId, payload))
        closeModal();
    }

    const handleInputChange = (e) => {
        if (e.target.checked) {
            setSelected(
                [
                    ...selected,
                    e.target.value
                ]
            );
        }
        else {
            setSelected(
                selected.filter(a => a !== e.target.value)
            );
        }
    }

    return (
        <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={closeModal}>
            <div className="bg-white lg:w-5/12 rounded-md w-11/12 pt-12 mt-10 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
                {loading ? (
                    <>
                        <div className='flex w-full justify-center'>
                            <Loader size />
                        </div>
                        <div className="bg-light rounded-b-md py-4 mt-5 text-end px-5">
                            <Button variant="outlined" ripple={true} onClick={closeModal}>Close</Button>

                        </div>
                    </>
                )
                    :
                    (
                        <>
                            <div className="flex lg:px-6 px-5 overflow-auto" style={{ maxHeight: '450px' }}>
                                <form>
                                    <p className='fs-700'>Suggested Service Partners</p>
                                    {
                                        !data.length && <p className='py-6'>There are Service Providers Currently</p>
                                    }
                                    {data.length > 0 ? data.map((item, index) => (
                                        <>
                                            <div className="flex my-6" key={index}>
                                                <div className='my-2 mr-6'>
                                                    <input type='checkbox' value={item.id} onChange={(e) => handleInputChange(e)} />
                                                </div>
                                                <div>
                                                    <Avatar src={item?.service_user.photo ? item?.service_user.photo :
                                                        `https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png`}
                                                        round={true} alt="order" size='30' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className="grid fs-400 content-between pl-2 fw-500">
                                                        <p>{item?.service_user.name}</p>
                                                        <p className="text-gray-600">Service Partner</p>
                                                        <div className="flex">
                                                            <p className="text-gray-600">Rating Points:</p>
                                                            <p className="pl-3">{item?.rating}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                        :
                                        <></>
                                    }
                                </form>
                            </div>
                            <div className="bg-light rounded-b-md py-4 mt-5 text-end px-5">
                                <Button variant="outlined" ripple={true} onClick={closeModal}>Close</Button>
                                <Button className='bg-primary ml-4' onClick={submitProjectToPartners}>Dispatch Project</Button>

                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default SuggestedPartners