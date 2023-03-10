import { RiDeleteBin5Line } from 'react-icons/ri';
import ReactTimeAgo from 'react-time-ago';
import { markNotificationAsRead } from '../../../../../services/endpoint';
import "toasted-notes/src/styles.css";
import { useDispatch } from 'react-redux';
import { deleteAdminNotification, deleteUserNotification } from '../../../../../redux/actions/notifications';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { Button } from '@material-tailwind/react';
import Spinner from '../../../../layouts/Spinner';
import { useState } from 'react';


const NotificationItem = ({ item, reload, isAdmin }) => {
    const dispatch = useDispatch();
    const [modal, setModalDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    const stopLoading = () => setLoading(false);

    const [deleteItem, setDeleteItem] = useState('');

    const readNotification = async () => {
        await markNotificationAsRead(item.id)
    }

    const deleteModal = (id) => {
        setModalDelete(true);
        setDeleteItem(id);
    }

    const deleteNotification = async () => {
        setLoading(true);
        if (isAdmin) {
            dispatch(deleteAdminNotification(deleteItem, stopLoading))
            if (!loading) {
                reload();
            }
        }else{
            dispatch(deleteUserNotification(deleteItem, stopLoading))
            if (!loading) {
                reload();
            }
        }
    }

    const CloseDelete = () => {
        setModalDelete(false)
    }

    return (
        <>
        <div className="flex items-center relative mt-7 lg:mt-12" onClick={readNotification}>
            <div className="w-3/12 lg:w-auto">
                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1667909634/BOG/logobog_rmsxxc.png" alt="avatar" className="w-12 h-12 circle " />
            </div>
            <div className="lg:pl-6">
                <p className="text-gray-600 pr-5"><span className="text-black">BOG Admin</span> {item.message} </p>
                <p className="fs-400 text-gray-500"><ReactTimeAgo date={Date.parse(item.createdAt)} locale="en-US" /></p>
            </div>
            <p className='top-0 right-4 absolute w-6 h-6 bg-gray-200 circle grid place-content-center'><RiDeleteBin5Line onClick={() => deleteModal(item.id)} className='text-red-500 cursor-pointer hover:scale-105 ' /></p>
            </div>
            {
                modal && (
                    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseDelete}>
                        <div className="bg-white lg:w-5/12 rounded-md  overscroll-none  w-11/12 pt-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
                            <div className="flex lg:px-6 px-5">
                                <div className="text-2xl pr-3 text-red-600">
                                    <BsExclamationCircleFill />
                                </div>
                                <div>
                                    <p className="fs-700 fw-600 mb-4">Delete Notification</p>
                                    <p>Are you sure you want to delete this notification?</p>
                                </div>
                            </div>
                            <div className="bg-light rounded-b-md  py-4 mt-5 text-end px-5">
                                <Button color="black" variant="outlined" ripple={true} onClick={CloseDelete}>Cancel</Button>
                                {
                                    loading ? <Spinner /> :
                                        <Button color="red" onClick={deleteNotification} className="ml-4" ripple={true}>Delete</Button>
                                }

                            </div>
                        </div>
                    </div>
            )    
        }
        </>
    )
}

export default NotificationItem