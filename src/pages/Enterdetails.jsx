import React, { useState } from 'react';
import supabase from '../helper/SupaClient';

const EnterDetails = () => {
    const [ownerDetails, setOwnerDetails] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        aadhaarNumber: '',
        usertype: '',
        id:''
    });
    const [showModal, setShowModal] = useState(false);

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
            // Fetch the ID from the logintrial table based on the email_id
            const { data: loginTrialData, error: loginTrialError } = await supabase
                .from('logintrial')
                .select('id')
                .eq('email_id', ownerDetails.email)
                .single();
    
            if (loginTrialError) {
                console.error('Error fetching login trial data:', loginTrialError.message);
                return;
            }
    
            if (!loginTrialData) {
                console.error('No login trial data found for the provided email.');
                return;
            }
    
            const loginTrialId = loginTrialData.id;
    
            // Insert data into the user1 table along with the retrieved logintrial_id
            const { data: userData, error: userError } = await supabase
                .from('user')
                .insert([
                    {
                        username: ownerDetails.name,
                        email: ownerDetails.email,
                        user_type: ownerDetails.usertype,
                        mobile_number: ownerDetails.phoneNumber,
                        logintrial_id: loginTrialId,
                    },
                ]);
    
            if (userError) {
                console.error('Error adding ownerDetails to Supabase:', userError.message);
            } else {
                console.log('OwnerDetails added to Supabase:', userData);

            }
        } else {
            setShowModal(true);
        }
    };
    
    return (

        <div className="w-full max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
            <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-200">
                        User Name<span className="text-red-600">*</span>

                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={ownerDetails.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your user name"

                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-bold mb-2 text-gray-200">
                        Mobile Number<span className="text-red-600">*</span>

                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        required
                        name="phoneNumber"
                        value={ownerDetails.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your mobile number"

                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-200">
                        Email<span className="text-red-600">*</span>

                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={ownerDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"

                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="aadhaarNumber" className="block text-sm font-bold mb-2 text-gray-200">
                        Aadhaar Number<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="aadhaarNumber"
                        name="aadhaarNumber"
                        required
                        value={ownerDetails.aadhaarNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your Aadhaar number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="usertype" className="block text-sm font-bold mb-2 text-gray-200">
                        User Type<span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="usertype"
                            name="usertype"
                            required
                            value={ownerDetails.usertype}
                            onChange={handleInputChange}
                            placeholder="Enter User Type"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="" disabled hidden>
                                Select User Type
                            </option>
                            <option value="client">Client</option>
                            <option value="pumpOwner">Pump Owner</option>
                            <option value="workshopOwner">Workshop Owner</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
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
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white p-8 rounded shadow-md">
                            <p className="text-lg font-semibold mb-4">Please fill in all mandatory fields.</p>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => setShowModal(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnterDetails;
