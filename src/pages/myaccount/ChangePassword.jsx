import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import GradientIcon from '../../ui/components/icons/GradientIcons';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import useAxios from '../../utils/useAxios';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const api = useAxios();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetPassword = async () => {
        setLoading(true);
        try {
            await api.post('/auth/change-password/', { old_password: oldPassword, new_password: newPassword });
            toast.success('Password changed successfully');
            // Redirect to login page after successful password change
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = () => {
        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    return (
        <div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-gold">
                                Change Password
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 text-gold">
                                        Old Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="oldPassword"
                                            id="oldPassword"
                                            placeholder="Old Password"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                                            required
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            value={oldPassword}
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
                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 text-gold">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="newPassword"
                                            id="newPassword"
                                            placeholder="New Password"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                                            required
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            value={newPassword}
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
                                    <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-gray-900 text-gold">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmNewPassword"
                                            id="confirmNewPassword"
                                            placeholder="Confirm New Password"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                                            required
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            value={confirmNewPassword}
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
                                        if (validatePassword()) {
                                            resetPassword();
                                        }
                                    }}
                                    disabled={loading}
                                    className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 btn-gold text-black"
                                >
                                    {loading ? <Spinner className="text-gold" /> : 'Change'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChangePassword;
