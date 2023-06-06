import React, { useState } from 'react'
import { usePaystackPayment } from 'react-paystack';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Axios from '../../../../../config/config';
import { formatNumber } from '../../../../../services/helper'
import { Spinner2 } from '../../../../layouts/Spinner';

export const InstallPayment = ({item, index, id}) => {

    const user = useSelector(state => state.auth.user)
    const [loading, setLoading] = useState(false);
    console.log(item)
    const config = {
        reference:  "TR-" + Math.floor((Math.random() * 1000000000) + 1),
        email: user.email,
        amount: (item.amount * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_0c79398dba746ce329d163885dd3fe5bc7e1f243',
    };

    const makePayment = async (reference) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const data = {
                amount: item.amount,
                installmentId: item.id,
                reference
            }
            const response = await Axios.post(`${process.env.REACT_APP_URL }/projects/installments/${id}/payment`, data, config);
            // console.log(response);
            // setSubscribed(true);
            setLoading(false);
            return response
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    // you can call this function anything
    const onSuccess = (reference) => {
        try {
            setLoading(true)
            // Implementation for whatever you want to do with reference and after success call.
            console.log(reference);
            makePayment(reference.reference);

            Swal.fire({
                title: "Success",
                imageUrl: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg",
                imageWidth: "75px",
                text: "Payment Successful",
                buttonsStyling: "false",
                confirmButtonText: 'Continue',
                confirmButtonColor: "#3F79AD",
            })

        } catch (error) {
            setLoading(false);
            console.log(error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Unable to Finish Payment. Please contact administrator"
            })
        }


    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);
    if (loading) {
        return <center>
            <Spinner2 />
        </center>
    }
  return (
    <div>
        <div className="lg:flex fw-500 justify-between pt-6" key={index}>
            <div>
                <p>{item?.title}</p>
                <p className="text-gray-600">Via Paystack</p>
            </div>
            <div>
                <p>NGN{formatNumber(item?.amount)}</p>
            </div>
            <div className="mt-6 lg:mt-0 text-center">
                {
                    item.paid? "" : <button className="btn-primary mb-2 px-6  py-1" onClick={() => {
                        initializePayment(onSuccess, onClose)}}>Pay Now</button>
                }
                <p className="text-center">{item?.paid? "Paid" : "Not Paid" }</p>
            </div>
        </div>
    </div>
  )
}
