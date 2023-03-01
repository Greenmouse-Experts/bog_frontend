import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
// import { RiDeleteBinLine } from "react-icons/ri";
// import { BiEdit } from "react-icons/bi";


// const baseURL = process.env.REACT_APP_IMAGE_URL;


const ProductItem = ({ item, setProductDelete }) => {
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const setDelete = (value) => {
        setProductDelete(value)
    }

    console.log(item)

    return (
        <div className="mt-12 flex border-b pb-4">
            <div className="lg:w-3/12">
                <img src={item.image} alt="productId" className="w-40 h-36" />
            </div>
            <div className="w-9/12 lg:pl-6 pl-3 flex content-between">
                <div className="lg:fs-500 flex flex-grow">
                    <div className='flex flex-col'>
                    <p>{item.name}</p>
                    <p className="mt-1">NGN {formatNumber(item.price)}</p>
                    <p className="mt-1 h-10 fs-300 overflow-hidden">{item.description}</p>
                        <p className="mt-1 text-green-600 fw-500">Approved</p>
                    </div>
                </div>
                <div className="flex ml-5">
                    <span className="text-2xl pr-3 cursor-pointer">
                        <p className="mt-1 h-10 fs-300 overflow-hidden">
                            Quantity : <b>{ item.quantity }</b>
                        </p>
                    </span>
                    <span className="text-2xl pl-3 text-red-600 mt-24 cursor-pointer"><RiDeleteBinLine onClick={() => { setDelete(item) }} /></span>
                </div>
            </div>
        </div>
    )
}

export default ProductItem