import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import toast from 'react-hot-toast';
import Axios from '../../../../../config/config';
import { SuccessAlert } from '../../../../../services/endpoint';
import Spinner from '../../../../layouts/Spinner';

export const ClientReview = ({ review, projectId }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [reviewData, setReview] = useState(review);
    const [star, setStar] = useState(0);


    const ratingChanged = (newRating) => {
        setStar(newRating)
    }
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (message === "" || star === 0) {
                setLoading(false);
                toast.error(
                    "Please fill all field",
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
                return;
            }
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            const payload = {
                projectId,
                star,
                review: message,
            }
            const res = await Axios.post('/review/project/create-review', payload, config);
            setLoading(false);
            if (res.success === true) {
                SuccessAlert("Review Done succssfully")
                setReview('done');
            }

        } catch (error) {
            setLoading(false);
            toast.error(
                error?.response?.data?.message || error.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: '#BD362F', color: 'white' },
                }
            );
        }
    }

    return (
        <div>
            <form>
                <div>
                    <textarea
                        className='h-24 p-2 w-full rounded mt-2 border border-gray-400 '
                        onChange={(e) => setMessage(e.target.value)}
                        name={message}
                        readOnly={review !== null ? true : false}
                    >
                        {review?.review || message}
                    </textarea>
                </div>
                <div className='mt-6'>
                    <p>Leave a rating</p>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={45}
                        color2={'#ffd700'}
                        value={review?.star || star}
                    />
                </div>
                <div className='mt-6'>
                    {
                        reviewData !== null ?
                            null :
                            <>
                                {
                                    loading ? <Spinner /> :
                                        <div className='mt-6'>
                                            <button
                                                type='button'
                                                className='btn-primary w-full'
                                                onClick={handleSubmit}
                                            >Submit</button>
                                        </div>
                                }

                            </>
                    }
                </div>
            </form>
        </div>
    )
}
