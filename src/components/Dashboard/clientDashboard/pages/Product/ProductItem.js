import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';


const ProductItem = ({ item, setProductDelete }) => {
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const setDelete = (value) => {
        setProductDelete(value)
    }

    return (
        <div className="mt-12 flex border-b pb-4">
            <div className="lg:w-3/12">
                <img src={item.image} alt="productId" className="w-40 h-36" />
            </div>
            <div className="w-9/12 lg:pl-6 pl-3 flex content-between">
                <div className="lg:fs-500 flex flex-grow w-full">
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col flex-grow'>
                                <p>{item.name}</p>
                                <p className="mt-1">NGN {formatNumber(item.price)}</p>
                            </div>
                            <div className='flex'>
                                <span className="text-2xl pr-3 cursor-pointer">
                                    <p className="fs-300">
                                        Quantity : <b>{item.quantity}</b>
                                    </p>
                                    <p className="mt-1 fs-300">
                                        Remaining : <b>{item.remaining}</b>
                                    </p>
                                </span>
                            </div>
                        </div>
                        <p className="mt-1 h-10 fs-300 overflow-hidden w-4/5">{item.description}</p>
                        <p className="mt-1 text-green-600 fw-500">Approved</p>
                    </div>
                </div>
                <div className="flex flex-grow">
                    <span className="text-2xl pl-3 text-red-600 mt-24 cursor-pointer"><RiDeleteBinLine onClick={() => { setDelete(item) }} /></span>
                </div>
            </div>
        </div>
    )
}

export default ProductItem