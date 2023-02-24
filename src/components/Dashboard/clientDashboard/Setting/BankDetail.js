/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { SuccessAlert } from '../../../../services/endpoint';
import toast from 'react-hot-toast';
import SelectableItem from '../../../widgets/SelectableItem';
import Spinner from '../../../layouts/Spinner';
import Axios from '../../../../config/config';
import { useSelector } from 'react-redux';

const BankDetail = () => {
    const user = useSelector((state) => state.auth.user);
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState();
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(true);
    const [bankData, setBankData] = useState({
        account_name: user?.bank_detail?.account_name ? user?.bank_detail?.account_name : "",
        account_number: user?.bank_detail?.account_number ? user?.bank_detail?.account_number : "",
    });
    const [show, setShow] = useState(false);

    const { account_name, account_number } = bankData;

    useEffect(() => {
        if (banks.length === 0) {
            fetchBanks();
        }
    }, []);

    const fetchBanks = async () => {
        try {
            setLoading(true);
            const url = "/bank/allbanks";
            const res = await Axios.get(url);
            const results = res.data;
            const data = results.map(result => {
                return {
                    id: result.id,
                    code: result.code,
                    name: result.name,
                }
            });
            setBanks(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(
                error.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: '#BD362F', color: 'white' },
                }
            );
        }
    }

    const handleBankChange = (val) => {
        const value = val.value;
        const item = banks.find(where => where.id === value);
        setSelectedBank(item);
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setBankData({ ...bankData, [name]: value });
    }

    const submitHandler = async () => {
        try {
            setLoading(true)
            if (!account_name || !account_number) {
                setLoading(false)
                toast.error(
                    "Please fill all field",
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
                return;
            } else if (!selectedBank) {
                setLoading(false)
                toast.error(
                    "Please select your bank",
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
                return;
            }
            const payload = {
                ...bankData,
                bank_code: selectedBank.code,
                bank_name: selectedBank.name
            }
            console.log(payload);
            await Axios.post("/bank/save-bank", payload);
            setLoading(false);
            setShow(true);  //"1381417409"
            setEdit(false);
            SuccessAlert("Bank Account data updated successfully!");
        } catch (error) {
            setLoading(false);
            if (error.response.data.message) {
                toast.error(
                    error.response.data.message,
                    {
                        duration: 6000,
                        position: "top-center",
                        style: { background: '#BD362F', color: 'white' },
                    }
                );
                return;
            }
            toast.error(
                error.response.data.message,
                {
                    duration: 6000,
                    position: "top-center",
                    style: { background: '#BD362F', color: 'white' },
                }
            );
        }
    }
    
    const editBankDetails = () => setEdit(false);

    const options = banks.length > 0 ? banks.map(bank => {
        return {
            label: bank.name,
            value: bank.id
        };
    }) : [];

    if (loading) {
        return <center><Spinner /></center>
    }

    return (
        <div className="lg:w-11/12 lg:mt-6 mx-auto">
            {
                edit && user?.bank_detail != null ? <div className="mt-3">
                    <label className="block mb-1 fw-500">Bank Name</label>
                    <input
                        type="text"
                        className="w-10/12 py-2 px-3 rounded-lg bg-light border border-gray-400"
                        value={user?.bank_detail?.bank_name}
                        readOnly
                    />
                </div> : <div className="mt-3 w-10/12">
                    <label className="block mb-1 fw-500">Select Bank</label>
                    <SelectableItem
                        placeholder="Select Bank Name"
                        options={options}
                        handleChange={handleBankChange}
                        className="w-10/12 py-2 px-3 rounded-lg bg-light border border-gray-400"
                    />
                </div>
            }

            {
                edit && user?.bank_detail != null ? <div className="mt-3">
                    <label className="block mb-1 fw-500">Bank Account Name</label>
                    <input
                        type="text"
                        className="w-10/12 py-2 px-3 rounded-lg bg-light border border-gray-400"
                        name='account_name'
                        value={user?.bank_detail?.account_name}
                        readOnly
                    />
                </div> : <div className="mt-3">
                    <label className="block mb-1 fw-500">Bank Account Name</label>
                    <input
                        type="text"
                        className="w-10/12 py-2 px-3 rounded-lg bg-light border border-gray-400"
                        name='account_name'
                        value={account_name}
                        onChange={changeHandler}
                    />
                </div>
            }

            {
                edit ? <div className="mt-3">
                    <label className="block mb-1 fw-500">Bank Account Number</label>
                    <input
                        type="number"
                        className="w-10/12 py-2 px-3 rounded-lg bg-light border border-gray-400"
                        value={user?.bank_detail?.account_number}
                    />
                </div> : <div className="mt-3">
                    <label className="block mb-1 fw-500">Bank Account Number</label>
                    <input
                        type="number"
                        className="w-10/12 py-2 px-3 rounded-lg bg-light border border-gray-400"
                        name='account_number'
                        value={account_number}
                        onChange={changeHandler}
                    />
                </div>
            }



            <div className="mt-10 lg:w-11/12 lg:flex justify-between items-center">
                {
                    edit && user?.bank_detail != null ? <button
                        type='button'
                        className="btn-primary"
                        onClick={editBankDetails}
                    >Edit Bank Details</button> : <>
                        {
                            loading ? <Spinner /> :
                                <button
                                    type='button'
                                    className="btn-primary"
                                    onClick={submitHandler}
                                >Update Bank Details</button>
                        }
                    </>
                }
                {
                    show ? <p className="flex items-center fw-500 text-primary mt-4 lg:mt-0"><BiCheckCircle /><span className="pl-1">All Changes are saved</span></p> : null
                }

            </div>
        </div>
    )
}

export default BankDetail