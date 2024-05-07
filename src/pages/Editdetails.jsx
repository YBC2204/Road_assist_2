/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import supabase from '../helper/SupaClient';
import { useModalContext } from '../Context/Modalcon';
import { useNavigate } from 'react-router-dom';
import { useStatusContext } from '../Context/StatusContext';

const EditDetails = () => {
    const { setmail} = useModalContext();
    const{stat,logid,user}=useStatusContext();
    const [mailid, setMailId] = setmail;
    const nav = useNavigate();
    const [userData, setUserData] = useState(null); // State to hold user data
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const[name1,setname]=user;
    const [submitStatus, setSubmitStatus] = useState(null); // State to hold submit status

    useEffect(() => {
        fetchFromUser(); // Fetch data when component mounts
    }, []); // Empty dependency array to run effect only once

   useEffect(() => {
    console.log(submitStatus)
    if (submitStatus === null) {
        setname(name);
    }
    if (submitStatus === false) {
        fetchFromUser();
        
        setname(name);
        setSubmitStatus(null);
    }
}, [submitStatus, name]);
// Update name1 whenever the name state changes

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
            setName(data.username);
            setPhoneNumber(data.mobile_number);
            setEmail(data.email);
            setAadhar(data.aadhar_no);
        } catch (error) {
            console.error('Error fetching data from user:', error.message);
            return null;
        }
      
       
    };

    const isAadharValid = (aadharNumber) => {
        // Regular expression to match Aadhar number format
        const aadharRegex = /^\d{12}$/;
        return aadharRegex.test(aadharNumber);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            // Validate Aadhar number
            const isValidAadhar = isAadharValid(aadhar);
            if (!isValidAadhar) {
                console.error('Invalid Aadhar number');
                alert("Aadhar is not valid");
                setSubmitStatus(false);
                return;
            }

            // Update user details in the 'user' table
            const { error } = await supabase
                .from('user')
                .update({
                    username: name,
                    mobile_number: phoneNumber,
                    email: email,
                    aadhar_no: aadhar
                })
                .eq('email', mailid);

            if (error) {
                console.error('Error updating user data:', error.message);
                // Handle error, maybe show a message to the user
                setSubmitStatus(false); // Set submit status to false (error)
                return;
            }

            console.log('User details updated successfully');
            // Navigate to the '/home' route after successful update
            nav('/home');
            setSubmitStatus(true); 
            console.log(submitStatus)// Set submit status to true (success)
            
        } catch (error) {
            console.error('Error updating user data:', error.message);
            // Handle error, maybe show a message to the user
            setSubmitStatus(false); // Set submit status to false (error)
        }
        console.log(name);
    };

    useEffect(() => {
        if (submitStatus !== null) {
            if (submitStatus) {
                alert('Form submitted successfully!');
            } else {
                alert('Error submitting form. Please try again.');
            }
        }
    }, [submitStatus]);

    return (
        <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-gray-800 h-[85vh]">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleEdit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-slate-300">
                        User Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"/>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={aadhar}
                        onChange={(e) => setAadhar(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="m-4 flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Edit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDetails;
