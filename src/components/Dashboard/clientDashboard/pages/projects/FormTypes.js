import React from 'react';

export const FormTypes = ({ data }) => {

    return (
        <>
            <div className=" bg-white lg:p-10 px-3 py-5 rounded">
                <div className="flex border-b py-3">
                    <p className="w-3/12 fw-500 border-r">Project Type</p>
                    <p className='lg:pl-4'>{ data.title }</p>
                </div>
                {data.projectData.map((form, index) => (
                    <div className="flex border-b py-3" key={index}>
                        <p className="w-3/12 fw-500">{form.serviceForm.label}</p>
                        {form.serviceForm.inputType === 'file' ? (
                             <img src={form.value} alt="order" className="w-16 h-16 lg:h-20 lg:w-20 rounded-lg" />
                        )
                            :
                            (
                                <>
                                    <p className='lg:pl-4'>{form.value}</p>  
                                    </>
                        )}
                    </div>
                ))}
                </div>
        </>
    )
};