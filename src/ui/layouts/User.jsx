import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import BottomNav from '../components/navbar/BottomNav';
import Sliders from '../components/slider/Sliders';
const User = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <BottomNav />
        </div>
    );
}

export default User;
