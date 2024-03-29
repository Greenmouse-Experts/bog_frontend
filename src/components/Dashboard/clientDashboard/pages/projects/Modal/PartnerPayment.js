import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import Axios from '../../../../../../config/config';
import Spinner from '../../../../../layouts/Spinner';

export const PartnerPayment = ({CloseModal, id, project}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [banks, setBanks] = useState([])
    const [kyc, setKyc] = useState([])

    const getBank = async () => {
        fetch(`https://nigerianbanks.xyz`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBanks(data)
    });
    }
    const fetchKycDetails = async () => {
        try {
            const url = `/kyc/user-kyc/${project.serviceProvider.userId}?userType=professional`
            const authToken = localStorage.getItem("auth_token");
            const config = {
                headers:
                {
                    "Content-Type": "application/json",
                    'Authorization': authToken
                }

            }
            const res = await Axios.get(url, config);
            const kycs = res.data
            setKyc(kycs)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (values) => {
        if(values.amount === "" || values.bankName === "" || values.accountName === "" || values.accountNumber === ""){
            toast.error(
                'No complete information to initiate payment',
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: 'red', color: 'white' },
                }
            );
            return;
        }
        try{
            setIsLoading(true)
            const paylaod = {
                ...values,
                bank_code: "044",
                amount: Number(values.amount)
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': localStorage.getItem("auth_token")
                },
            }
            const response = await axios.post(`${process.env.REACT_APP_URL }/projects/transfer/${id}`, paylaod, config )
            setIsLoading(false)
            CloseModal()
            toast.success(
                response.data.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: 'green', color: 'white' },
                }
            );
            return response
        }catch(error){
            setIsLoading(false)
            toast.error(
                error.response.data.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: 'red', color: 'white' },
                }
            );
        }
    }

    useEffect(() => {
        getBank()
        fetchKycDetails()// eslint-disable-next-line 
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          amount: "",
          account_name: kyc?.kycFinancialData?.account_name? kyc?.kycFinancialData?.account_name : "",
          account_number: kyc?.kycFinancialData?.account_number? kyc?.kycFinancialData?.account_number : "",
          bank_name: kyc?.kycFinancialData?.bank_name? kyc?.kycFinancialData?.bank_name : ""
        },
        onSubmit: handleSubmit,
      });
      const { amount, account_name, account_number, bank_name } = formik.values;

  return (
    <div className="fixed font-primary left-0 top-0 w-full h-screen bg-op center-item z-40" onClick={CloseModal}>
        <div className="bg-white max-h-96 lg:max-h-01 overflow-y-auto lg:w-4/12 relative rounded-md  overscroll-none  w-11/12 p-8 shadow fw-500 scale-ani" onClick={e => e.stopPropagation()}>
            <p className="fw-600 text-lg lg:text-xl mb-6">Project Partner Payment</p>
            <div>
                <p>Please select a bank option</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label>Account Name</label>
                    <input
                        type="text"
                        placeholder='Account Name'
                        className="w-full mt-2 rounded border border-gray-400 p-2"
                        id="accountName"
                        name="accountName"
                        value={account_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled
                        />
                </div>
                <div className='mt-3'>
                    <label>Account Number</label>
                    <input
                        type="number"
                        placeholder='Account Number'
                        className="w-full mt-2 rounded border border-gray-400 p-2"
                        id="accountNumber"
                        name="accountNumber"
                        value={account_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled
                        />
                </div>
                <div className='mt-3'>
                    <label>Payment Amount</label>
                    <input
                        type="number"
                        placeholder='please enter payment amount'
                        className="w-full mt-2 rounded border border-gray-400 p-2"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                </div>
                <div className='mt-3'>
                    <label>Select Bank</label>
                    {/* <select 
                        className="w-full mt-2 rounded border border-gray-400 p-2"
                        id="bankName"
                        name="bankName"
                        value={bankName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>
                        {banks.map((bank, index) => (
                            <option value={bank.code} key={index}>
                            {bank.name}
                            </option>
                        ))}
                    </select> */}
                     <input
                        type="text"
                        placeholder='Bank Name'
                        className="w-full mt-2 rounded border border-gray-400 p-2"
                        id="bankName"
                        name="bankName"
                        value={bank_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled
                        />
                </div>
                <div className="text-end mt-6">
                    {isLoading?  <Spinner/> : <button className="btn-primary" onClick={formik.handleSubmit}>
                        Submit
                    </button>}
                </div>
            </form>
            <FaTimes className="absolute top-5 right-5 cursor-pointer" onClick={CloseModal}/>
        </div>
    </div>
  )
}
