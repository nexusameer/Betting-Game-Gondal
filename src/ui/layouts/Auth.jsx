import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const Auth = () => {
    return (
        <div>
            <Navbar/>
            <div className='pt-20'>
            <Outlet/>
            </div>
        </div>
    );
}

export default Auth;
