import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth';
import Menu from '../menu/Menu';

const Header = () => {
    const isLogedIn = useAuthStore((state) => state.isLoggedIn)();
    return (
        <>
            {isLogedIn ?
                <div className='flex justify-center my-12 sm:my-20 md:my-20 '>
                    <Link to="/deposit" className='w-full border-2 rounded border-yellow-500 p-1 bg-gold'>
                        <p className='text-black text-center'>Deposit</p>
                    </Link>
                    <Link to="/withdraw" className='w-full border-2 rounded border-yellow-500 p-1 '>
                        <p className='text-gold text-center'> Withdraw</p>
                    </Link>
                </div>:
                <div className='flex justify-center my-12 sm:my-20 md:my-20 '>
                <Link to="/auth/login" className='w-full border-2 rounded border-yellow-500 p-1 bg-gold'>
                    <p className='text-black text-center'>Login</p>
                </Link>
                <Link to="/auth/register" className='w-full border-2 rounded border-yellow-500 p-1 '>
                    <p className='text-gold text-center'> Register</p>
                </Link>
            </div>
    }
    <Menu/>
        </>

    );
}

export default Header;
