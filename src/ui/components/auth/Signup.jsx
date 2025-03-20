import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthTop from './AuthTop';
import { registerUser } from '../../../utils/auth';
import { toast } from 'react-hot-toast';
import { Spinner } from 'flowbite-react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import GradientIcon from '../icons/GradientIcons';


const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [userpassword, setPassword] = useState('');
    const [refferal_code, setReffral] = useState('');

    useEffect(() => {
        const lowercase = username.toLowerCase()
        setUsername(lowercase.trim())
    }, [username])

    const formData = {
        email: email,
        username: username,
        phone_number: phone_number,
        password: userpassword,
        refferal_code: refferal_code
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const onSubmit = async () => {
        setLoading(true)

        let response = await registerUser(formData)
        console.log(formData)
        if (response.data === null) {
            console.log(response.error)
            toast.error(response.error?.message || 'Singup failed')
        }
        else {
            toast.success('signup successful')
        }
        setLoading(false)
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const referralParam = urlParams.get('reffral_code');
        if (referralParam) {
            setReffral(referralParam)
        }  
    }, [])
    return (
        <div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {/* <AuthTop /> */}
                    <div className="w-full bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-gold">
                                Create an account
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 text-gold"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''
                                            }`}
                                        placeholder="name@company.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 text-gold"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={username}
                                        {...register('username', {
                                            required: 'Username is required',
                                        })}
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.username ? 'border-red-500' : ''
                                            }`}
                                        placeholder="Username"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 text-gold"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        id="phone_number"
                                        value={phone_number}
                                        {...register('phone_number', {
                                            required: 'Phone Number is required',
                                        })}
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.username ? 'border-red-500' : ''
                                            }`}
                                        placeholder="Phone Number"
                                        required
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />

                                    {errors.username && (
                                        <p className="text-red-500 text-sm">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 text-gold"
                                    >
                                        Refferal Code(optional)
                                    </label>
                                    <input
                                         type="text"
                                         name="refferal_code"
                                         id="refferal_code"
                                         {...register('refferal_code')} 
                                         className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.username ? 'border-red-500' : ''}`}
                                         placeholder="Refferal Code"
                                         onChange={(e) => setReffral(e.target.value)}
                                         value={refferal_code}
                                    />

                                    {errors.username && (
                                        <p className="text-red-500 text-sm">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>

                                {/* ... Password ... */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 text-gold"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            {...register('password', {
                                                required: 'Password is required',
                                            })}
                                            placeholder="Password"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'border-red-500' : ''
                                                }`}
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={userpassword}
                                        />
                                        <span
                                            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <GradientIcon icon={RiEyeOffLine} size={20} /> : <GradientIcon icon={RiEyeLine} size={20} />}
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 text-gold"
                                    >
                                        Confirm password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword2 ? 'text' : 'password'}
                                            name="confirmPassword"
                                            id="confirm-password"
                                            {...register('confirmPassword', {
                                                required: 'Confirm Password is required',
                                                validate: (value) =>
                                                    value === password || 'Passwords do not match',
                                            })}
                                            placeholder="Confirm Password"
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''
                                                }`}
                                            required
                                        />
                                        {/* You can add your onClick functionality here */}
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={togglePasswordVisibility2}>
                                            {showPassword2 ? <GradientIcon icon={RiEyeOffLine} size={20} /> : <GradientIcon icon={RiEyeLine} size={20} />}
                                        </span>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                                {/* ... Other form fields ... */}
                                <div className="flex items-start">
                                    {/* Checkbox and label code */}
                                </div>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 btn-gold text-black"
                                >
                                    {loading ? <Spinner className="text-black" aria-label="loading" /> : "Create an account"}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-gold">
                                    Already have an account?{' '}
                                    <Link
                                        to="/auth/login"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gold"
                                    >
                                        Login Here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Signup;
