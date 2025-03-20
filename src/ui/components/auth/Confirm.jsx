import React, { useEffect, useState } from 'react';
import GradientIcon from '../icons/GradientIcons';
import { FaDice } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthTop from './AuthTop';

const Confirm = () => {
    const initialTime = 60; // 1 minute in seconds
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return { minutes, seconds: remainingSeconds };
    };
    return (
        <div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <AuthTop/>
                    <div className="w-full h-full bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-gold">
                                Confirm Code
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-gold">Your Email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <p className='text-gold text-center'>
                                        {formatTime(time).minutes}{' '}
                                        :{formatTime(time).seconds}
                                    </p>
                                </div>
                                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 btn-gold text-black">Submit</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-gold">
                                    Don't have an account? <Link to="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gold">Register here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Confirm;
