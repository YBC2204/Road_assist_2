import React, { useState } from 'react';
import supabase from '../helper/SupaClient';
import { useModalContext } from '../Context/Modalcon';
const isAadharValid = (aadharNumber) => {
    // Regular expression to match Aadhar number format
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadharNumber);
};

const EnterDetails = () => {
    const { showmod, selcar, selcol, plate, setplate, setdet , setcol, showamt, showfuel, setamt, settype,setmode,setmail} = useModalContext();
  
    const [ownerDetails, setOwnerDetails] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        usertype: '',
        id: '',
        aadhar: ''
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
            const isValidAadhar = isAadharValid(ownerDetails.aadhar);
            if (!isValidAadhar) {
                console.error('Invalid Aadhar number');
                alert("Aadhar is not valid");
                return;
            }

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
                        aadhar_no:ownerDetails.aadhar,
                        mobile_number: ownerDetails.phoneNumber,
                        logintrial_id: loginTrialId,
                    },
                ]);

            if (userError) {
                console.error('Error adding ownerDetails to Supabase:', userError.message);
            } else {
                console.log('OwnerDetails added to Supabase:', userData);
                // Show popup saying "Form submitted"
                alert('Form submitted');
                // Reset all fields to blank
                setOwnerDetails({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                   
                    id: '',
                    aadhar: ''
                });
            }
        } catch (error) {
            console.error('Error adding ownerDetails to Supabase:', error.message);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-gray-800 ">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="aadhar" className="block text-sm font-bold mb-2 text-slate-300">
                       Aadhar No
                    </label>
                    <input
                        type="text"
                        id="aadhar"
                        name="aadhar"
                        required
                        value={ownerDetails.aadhar}
                        onChange={handleInputChange}
                        placeholder="Enter your aadhar no:"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
   
    
</div>
                <div className="m-4flex items-center justify-between">
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
