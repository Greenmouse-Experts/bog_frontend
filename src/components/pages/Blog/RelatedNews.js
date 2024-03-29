import React from 'react'
import { Link } from 'react-router-dom'
import { cutText, stripHtml } from '../../../services/helper'

const RelatedNews = ({ item }) => {
    return (
        <div className="mt-10 px-4 ">
            <Link to={`/blognews/${item?.id}`}>
                <p className="fs-400 fw-600">{item.title}</p>
                <p className="my-3 fs-300">{cutText(stripHtml(item.body), 100, '...')}</p>
            </Link>
        </div>
    )
}

export default RelatedNews