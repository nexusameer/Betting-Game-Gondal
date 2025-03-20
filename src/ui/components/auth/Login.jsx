import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import GradientIcon from '../icons/GradientIcons';
import { FaDice } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthTop from './AuthTop';
import { login } from '../../../utils/auth';
import toast from 'react-hot-toast';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Spinner } from 'flowbite-react';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.username, data.password)
      toast.success('Login successful')
      navigate('/')
    } catch (error) {
      toast.error(error?.message || 'Login failed')
    }
    finally{
      setLoading(false);
    }
    
  };

  return (
    <div>
      <section className="pb-20">
        <div className="flex flex-col items-center justify-center px-6 pb-8 mx-auto md:h-screen lg:py-0">
          <AuthTop />
          <div className="w-full h-full bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-2 md:space-y-2 sm:p-2">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-gold">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 text-gold">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    {...register('username', { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Username"
                    required
                  />
                </div>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gold dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      required
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
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 btn-gold text-black"
                >
                  {loading? <Spinner color={"black"}/> : "Login"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-gold">
                  Don't have an account?{' '}
                  <Link to="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gold">
                    Register here
                  </Link>
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-gold">
                  Forgot Password?{' '}
                  <Link to="/auth/forget" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-gold">
                    Click Here
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

export default Login;
