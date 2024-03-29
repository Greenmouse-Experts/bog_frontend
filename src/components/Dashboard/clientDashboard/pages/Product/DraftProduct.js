import React, { useState } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import "toasted-notes/src/styles.css";
import Spinner from '../../../../layouts/Spinner';
import { useDispatch } from 'react-redux';
import { addProductToStore } from '../../../../../redux/actions/ProductAction';
import { BiEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

// const baseURL = process.env.REACT_APP_IMAGE_URL;

const DraftProduct = ({ item, setProductDelete, setProductEdit }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const saveLoading = () => setLoading(false);

    const navigate = useNavigate();

     const addProductToStoreV2 = () => {
        setLoading(true);
        dispatch(addProductToStore(item.id, saveLoading, navigate));
     }

    return (
        <div className="mt-12 flex border-b pb-4 fs-400 lg:fs-500">
            <div className="lg:w-3/12">
                <img src={item.image} alt="productId" className="w-40 h-36" />
            </div>
            <div className="w-9/12 lg:pl-6 pl-3 grid content-between">
                <div className="lg:fs-500">
                    <p>{item.name}</p>
                    <p className="mt-1">NGN {formatNumber(item.price)}</p>
                    <p className="mt-1 h-10 fs-300 overflow-hidden">{item.description}</p>
                </div>
                <div className="flex items-center mt-1">
                    {
                        loading ? <Spinner /> :
                        <>
                           {
                            item.status === "in_review" ? 
                            null :
                            <button onClick={addProductToStoreV2} className="btn-primary py-1 mr-4">Add to Shop</button>
                            
                        }
                        </>
                    }
                    <span className="text-2xl pr-3 cursor-pointer" onClick={() => { setProductEdit(item) }}><BiEdit /></span>
                    <span className="text-2xl pl-3 text-red-600 cursor-pointer">
                        <RiDeleteBinLine onClick={() => { setProductDelete(item) }} />
                    </span>
                    <div className="flex items-center mt-1">
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default DraftProduct
