import React, { useState } from 'react';
import supabase from '../helper/SupaClient';

const EnterDetails = () => {
    const [ownerDetails, setOwnerDetails] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        usertype: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOwnerDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.from('user1').insert([
                {
                    username: ownerDetails.name,
                    email: ownerDetails.email,
                    user_type: ownerDetails.usertype,
                    mobile_number: ownerDetails.phoneNumber,
                },
            ]);
            if (error) {
                console.error('Error adding ownerDetails to Supabase:', error.message);
            } else {
                console.log('OwnerDetails added to Supabase:', data);
            }
        } catch (error) {
            console.error('Error adding ownerDetails to Supabase:', error.message);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-slate-300">
                        User Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={ownerDetails.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your user name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-bold mb-2 text-slate-300">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        required
                        name="phoneNumber"
                        value={ownerDetails.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your mobile number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-slate-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={ownerDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
    <label htmlFor="usertype" className="block text-sm font-bold mb-2 text-slate-300">
        User Type
    </label>
    <div className="relative">
        <select
            id="usertype"
            name="usertype"
            required
            value={ownerDetails.usertype}
            onChange={handleInputChange}
            placeholder="Enter User Type"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
        >
            <option value="" disabled hidden>
                Enter User Type
            </option>
            <option value="client">Client</option>
            <option value="pumpOwner">Pump Owner</option>
            <option value="workshopOwner">Workshop Owner</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-300">
            <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                />
            </svg>
        </div>
    </div>
</div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EnterDetails;
