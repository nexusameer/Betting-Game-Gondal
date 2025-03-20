import React from 'react';
import { FaHome, FaWallet, FaMoneyBill, FaUserCog, FaAlipay } from 'react-icons/fa';
import GradientIcon from '../icons/GradientIcons';
import { SiAboutdotme } from 'react-icons/si';
import { BiLogIn,} from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../../utils/auth';
import { useAuthStore } from '../../../store/auth';

const BottomNav = () => {
    const location = useLocation();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)();

    const navItems = [
        { link: '/deposit', icon: FaWallet, label: 'Deposit' },
        { link: '/withdraw', icon: FaMoneyBill, label: 'Withdraw' },
        { link: '/', icon: FaHome, label: 'Home' },
        { link: `/about`, icon: FaAlipay, label: 'About' },
        { link: '/profile', icon: isLoggedIn ? FaUserCog:BiLogIn , label: isLoggedIn?'Me':'Login' },
    ];

    const handleLogout = (e) => {
        if (isLoggedIn) {
            e.preventDefault();
            logout();
        }
    };

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 pt-3 bg-card border-t-2 border-yellow-500 shadow-lg shadow-gray-200 ">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        onClick={item.label === 'Logout' ? handleLogout : null}

                    >

                        <div className={`inline-flex flex-col  items-center justify-center px-5 relative transition-transform  duration-500 ease-in-out transform ${location.pathname === item.link ? '  -translate-y-14 rounded-full bg-card  border-yellow-500 border-2  h-20 w-20 ' : ''
                            }`}>

                            <GradientIcon icon={item.icon} size={location.pathname === item.link ? 25 : 17} />
                            <span className="text-sm text-gold">{item.label}</span>
                            {/* frint changes */}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
