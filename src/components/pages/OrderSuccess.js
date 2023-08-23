import React from 'react'
import Footer from './home-comp/Footer'
import Header from './home-comp/Header';
import { useNavigate, useLocation } from "react-router-dom";
import useFetchHook from '../../hooks/useFetchHook';
import Spinner from '../layouts/Spinner';
import { capitalizeFirstLetter, formatNumber, getSubTotal } from '../../services/helper';
import dayjs from 'dayjs';


export const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const url = `orders/order-detail/${location.state.orderId}`
    const { loading, data: order } = useFetchHook(url);

    const gotoLink = (url) => {
        navigate(url)
    }

    const printInvoice = (orderId) => {
        const splitSlug = orderId.split('/');
        const url = `${process.env.REACT_APP_IMAGE_URL}/uploads/${splitSlug[2]}.pdf`
        window.open(url, "_blank")
    }



    if (loading || !order) {
        return <center>
            <Spinner />
        </center>
    }

    return (
        <div>
            <div className='font-primary'>
                <Header />
                <div className='section'>
                    <div className='box'>
                        <div className='flex justify-center items-center'>
                            <div className='text-center lg:w-8/12'>
                                <img src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1686055425/BOG/success_afvfig.jpg' alt='success' className='w-28 mx-auto circle' />
                                <p className='text-2xl fw-600 mt-5'>Thank you for your order</p>
                                <p className='mt-3 fs-500'>The order confimation email with details of your order and a link to track the progress has been sent to your email address.</p>
                                <p className='mt-3 fw-500'>Your {order?.orderSlug} - {capitalizeFirstLetter(order?.status)}</p>
                                <p className='mt-3 fs-500'>Order Date - {dayjs(order?.createdAt).format("DD/MM/YYYY")}</p>
                            </div>
                        </div>
                        <div className='lg:grid-2 lg:w-11/12 mx-auto justify-between lg:mt-10'>
                            <div>
                                <p className='bg-primary fw-600 py-2 pl-3 text-white w-full'>Shipping Address</p>
                                <div className='px-3 bg-light py-4'>
                                    <p className='fw-500'>{`${order?.contact.city? `${order?.contact.city},` : ""} ${order?.contact.state}`} </p>
                                    <p className='my-3 capitalize'>{order?.order_items[0]?.shippingAddress?.home_address}</p>
                                    <p>{order?.contact.contact_phone || "No Phone"}</p>
                                </div>
                            </div>
                            <div className='bg-light text-end pb-3'>
                                <p className='bg-primary fw-600 px-3 py-2 text-white w-full'>Payment</p>
                                <div className='px-3 bg-light py-4'>
                                    <p className=''>Subtotal - <span className='fw-500'>&#8358; {formatNumber(getSubTotal(order.order_items))}</span></p>
                                    <p className='my-2'>Shipping & Handling - <span className='fw-500'>&#8358; {formatNumber(order.deliveryFee)}</span></p>
                                    {
                                       order?.insurancefee && (
                                            <p className='my-2'>Insurance Charge - <span className='fw-500'>&#8358; {formatNumber(order?.order_items[0]?.shippingAddress?.deliveryaddress?.insurancecharge)}</span></p>
                                        )
                                    }
                                    <p className='fw-600'>Total - <span className='fw-500'>&#8358; {formatNumber(order?.totalAmount)}</span></p>
                                </div>
                                <button onClick={() => printInvoice(order.orderSlug)} className='bg-primary px-5 py-1 text-white'>Print Receipt</button>
                            </div>
                        </div>
                        <div className='text-end lg:mt-10 mx-auto lg:w-11/12'>
                            <div>
                                <button className='btn-primary' onClick={() => gotoLink("/shop")}>Continue Shopping</button>
                                <button className='border-pri text-primary fw-500 px-4 py-2 rounded-lg ml-6' onClick={() => gotoLink("/dashboard/orders")}>View Orders</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
