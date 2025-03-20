import React, { useState } from 'react';
import AuthTop from './AuthTop';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import { API_BASE_URL } from '../../../utils/constants';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import GradientIcon from '../icons/GradientIcons';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const queryParams = new URLSearchParams(location.search);
    const uuidTempCode = queryParams.get('uuid-temp-code');

    const resetPassword = async () => {
        setLoading(true);
        try {

            await axios.post('/auth/reset-password/',{ unique_code: uuidTempCode, new_password: password });
            toast.success('Password changed successfully');
            navigate('/auth/login'); // Redirect to login page after successful password change

        } catch (error) {
        
            console.log(error)
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = () => {
        if (password !== password2) {
            toast.error('Passwords do not match');
        } else if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
        }
    };

    return (
        <div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <AuthTop />
                    <div className="w-full bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-gold">
                                Set New Password
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-gold">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                        <span
                                            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <GradientIcon icon={RiEyeOffLine} size={20} /> : <GradientIcon icon={RiEyeLine} size={20} />}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 text-gold">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password2"
                                            id="password2"
                                            placeholder="Confirm Password"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                                            required
                                            onChange={(e) => setPassword2(e.target.value)}
                                            value={password2}
                                        />
                                        <span
                                            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <GradientIcon icon={RiEyeOffLine} size={20} /> : <GradientIcon icon={RiEyeLine} size={20} />}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        validatePassword();
                                        resetPassword();
                                    }}
                                    disabled={loading}
                                    className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 btn-gold text-black"
                                >
                                    {loading ? <Spinner className='text-gold' /> : 'Change'}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-gold">
                                    Don't have an account?{' '}
                                    <Link to="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gold">
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewPassword;
