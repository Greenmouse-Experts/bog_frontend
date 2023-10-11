import React, {useState} from 'react'
import GIForm from './GIForm'
import useFetchHook from '../../../../../../hooks/useFetchHook'
import { formatNgnNumber, formatNumber } from '../../../../../../services/helper'
import Spinner from '../../../../../layouts/Spinner'

const GIDisplay = () => {
    const [showForm, setShowForm] = useState(false)
    const {loading, data, refetch} = useFetchHook('/projects/geotechnical-investigation/metadata/view')
  return (
    <>
    {loading && <Spinner/>}
        {data && <div className='lg:p-5 pt-5'>
            <div className='flex items-center justify-between'>
            <p className='fs-700 lg:text-xl fw-500'>Geotechnical Investigation Pricing</p>
            <button className='btn-primary' onClick={() => setShowForm(true)}>Edit</button>
            </div>
            <div className='mt-6 lg:mt-10'>
                <div className='flex gap-x-4'>
                    <p className='fw-500'>Mobilization:</p>
                    <p>{data?.mobilization && formatNgnNumber(data?.mobilization)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500'>Demobilization:</p>
                    <p>{data?.demobilization && formatNgnNumber(data?.demobilization)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500'>Depth of Borehole:</p>
                    <p>{data?.depth_of_borehole && formatNgnNumber(data?.depth_of_borehole)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500'>Borehole/SPT:</p>
                    <p>{data?.setup_dismantle_rig && formatNgnNumber(data?.setup_dismantle_rig)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500'>Drilling:</p>
                    <p>{data?.tons_machine && formatNgnNumber(data?.tons_machine)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500'>CPT Pentration:</p>
                    <p>{data?.setup_dismantle_cpt && formatNgnNumber(data?.setup_dismantle_cpt)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500'>Chemical Analysis:</p>
                    <p>{data?.chemical_analysis_of_ground_water && formatNgnNumber(data?.chemical_analysis_of_ground_water)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500'>Laboratory Test:</p>
                    <p>{data?.lab_test && formatNgnNumber(data?.lab_test)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500'>Reports:</p>
                    <p>{data?.report && formatNgnNumber(data?.report)}</p>
                </div>
                <div className='flex gap-x-4 mt-4'>
                    <p className='fw-500 whitespace-nowrap'>Types of Test:</p>
                    <p>{data?.report && data.lab_test_types}</p>
                </div>
            </div>
        </div>}
        {
            showForm && <GIForm close={() => setShowForm(false)} data={data} refetch={refetch}/>
        }
    </>
  )
}

export default GIDisplay