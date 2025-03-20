import React from 'react';
import { Link } from 'react-router-dom';
import GradientIcon from '../icons/GradientIcons';
import { FaDice } from 'react-icons/fa';

const AuthTop = () => {
    return (
    <>
        <div className='flex justify-center'>
            <Link href="/" className="flex items-center mt-4 mb-6 text-2xl font-semibold">
                <img className="w-52 h-52 justify-center flex shadow shadow-gray-800 rounded-lg bg-card" src="/images/thumb.png" alt="" />
            </Link>
        </div>
        <div>
        {/* <marquee direction="left" scrolldelay="0">
                <p className='capitalize text-yellow-500'>
                    You can deposit using JazzCash 💸, EasyPaisa 💳, USDT (BEP20) 💵, and TRX (TRC20) 💰. Get a bonus of 5% extra on your first deposit! Also, earn by voting 🗳️ and through our referral system 🔄. Get 5% of your referral's deposit. Play and earn! Vote and earn! 🎮📈
                </p>
            </marquee> */}
        </div>
        </>
    );
}

export default AuthTop;
