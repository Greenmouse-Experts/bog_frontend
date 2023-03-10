import React from 'react'

const NewsCategory = ({ item, categorySelected }) => {
    
    const selectCategory = (name) => {
        categorySelected(name)
    }

    return (
        <div className="mt-4 flex justify-between">
            <p className='cursor-pointer' onClick={() => selectCategory(item.name)}>{item.name}</p>
            {/* <p>(5)</p> */}
        </div>
    )
}

export default NewsCategory