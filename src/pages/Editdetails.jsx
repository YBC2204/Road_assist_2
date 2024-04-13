import React, { useState, useEffect } from 'react'; // Import useEffect
import supabase from '../helper/SupaClient';
import { useModalContext } from '../Context/Modalcon';
import { useLocation, useNavigate } from 'react-router-dom';

const EditDetails = () => {
    const { showmod, selcar, selcol, plate, setplate, setdet, setcol, showamt, showfuel, setamt, settype, setmode, setmail } = useModalContext();
    const [mailid, setMailId] = setmail;
    const nav = useNavigate();
    const [userData, setUserData] = useState(null); // State to hold user data

    useEffect(() => {
        fetchFromUser(); // Fetch data when component mounts
    }, []); // Empty dependency array to run effect only once

    const fetchFromUser = async () => {
        try {
            const { data, error } = await supabase
                .from('user')
                .select('*')
                .eq('email', mailid)
                .single();

            if (error) {
                console.error('Error fetching data from user:', error.message);
                return null;
            }

            if (!data) {
                console.error('No data found in user for the provided mailid.');
                return null;
            }

            setUserData(data); // Set user data in state
        } catch (error) {
            console.error('Error fetching data from user:', error.message);
            return null;
        }
    };

    // Define variables using optional chaining (?.) to avoid errors if userData is null
    const name = userData?.username;
    const phoneNumber = userData?.mobile_number;
    const email = userData?.email;
    const aadhar = userData?.aadhar_no;

    const handleEdit = async () => {
        try {
            // Delete the corresponding row from the 'user' table
            nav('/profile');
            const { error } = await supabase
                .from('user')
                .delete()
                .eq('email', mailid);
    
            if (error) {
                console.error('Error deleting user data:', error.message);
                // Handle error, maybe show a message to the user
                return;
            }
    
            // Navigate to the '/profile' route
           
        } catch (error) {
            console.error('Error deleting user data:', error.message);
            // Handle error, maybe show a message to the user
        }
    };
    

    return (
        <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-gray-800 ">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleEdit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-slate-300">
                        User Name
                    </label>
                    <p
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {name}
                    </p>
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-bold mb-2 text-slate-300">
                        Mobile Number
                    </label>
                    <p
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {phoneNumber}
                    </p>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-slate-300">
                        Email
                    </label>
                    <p
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {email}
                    </p>
                </div>
                <div className="mb-4">
                    <label htmlFor="aadhar" className="block text-sm font-bold mb-2 text-slate-300">
                        Aadhar No
                    </label>
                    <p
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-300 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {aadhar}
                    </p>
                </div>
                <div className="m-4 flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Edit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDetails;
