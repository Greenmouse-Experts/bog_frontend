/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { io } from "socket.io-client";
import { fetchAllUserNotifications } from '../redux/actions/notifications';

const FetchUserNotification = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.user); // eslint-disable-next-line 
    const [loading, setLoading] = useState(false);
    const stopLoading = () => setLoading(false);


    useEffect(() => {
        if(auth && auth.userType !== "admin"){
            const user = {
                id: auth.profile.id,
                type: auth.profile.userType
            }
            // const socket = io(`${process.env.REACT_APP_API_URL}`, {
            //     query: {
            //         userId: auth.profile.id
            //     }
            // });
            // socket.on("getUserNotifications", (payload) => {
            //     const result = [...payload]
                dispatch(fetchAllUserNotifications(user,stopLoading))
            // })
        }
    }, [dispatch, auth])
  return null
}

export default FetchUserNotification
