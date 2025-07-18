import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiSerice } from '../utils/Axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repassword: '',
        email: '',
        phone: '',
        pin: '',
        state: '',
        district: ''
    });

    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let res = apiSerice.post("/public/signup", {
                username: formData.username,
                password: formData.password,
                repassword: formData.repassword,
                email: formData.email,
                phone: formData.password,
                address: {
                    pin: formData.pin,
                    state: formData.state,
                    district: formData.district
                }
            })
            

        } catch(e) { 

        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center" style={{
            backgroundImage:"url('/background.webp')"
          }}>
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onInput={(e) => {
                                handleChange('username', (e.target as any).value)
                            }}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onInput={(e) => {
                                handleChange('password', (e.target as any).value)
                            }}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Re-enter Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Re-enter Password</label>
                        <input
                            type="password"
                            name="repassword"
                            value={formData.repassword}
                            onInput={(e) => {
                                handleChange('repassword', (e.target as any).value)
                            }}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onInput={(e) => {
                                handleChange('email', (e.target as any).value)
                            }}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onInput={(e) => {
                                handleChange('phone', (e.target as any).value)
                            }}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Pin */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pin</label>
                        <input
                            type="text"
                            name="pin"
                            value={formData.pin}
                            onInput={(e) => {
                                handleChange('pin', (e.target as any).value)
                            }}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onInput={(e) => {
                                handleChange('state', (e.target as any).value)
                            }}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">District</label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onInput={(e) => {
                                handleChange('district', (e.target as any).value)
                            }}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    );
}

export default SignUp;
