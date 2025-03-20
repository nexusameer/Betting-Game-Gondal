import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth';
import Sliders from '../slider/Sliders';

const Header = () => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn)();

    const handleGamebtn = () => {
        window.location.href = '/game';
    }

    return (
        <div className=''>
            <main>
                <article>
                    <section className="section section-1 active-lg hero" aria-label="hero" data-section>
                        <div className="bg-black" style={{ backgroundColor: '#1e1d1df7' }}>

                            <Sliders />
                            <marquee direction="left" scrolldelay="0">
                                <p className='capitalize mt-[5rem] text-yellow-500'>
                                    You can deposit using JazzCash 💸, EasyPaisa 💳, USDT (BEP20) 💵, and TRX (TRC20) 💰. Get a bonus of 5% extra on your first deposit! Also, earn by voting 🗳️ and through our referral system 🔄. Get 5% of your referral's deposit. Play and earn! Vote and earn! 🎮📈
                                </p>
                            </marquee>
                            <div className="container-lg  pt-2 pb-4">
                                <div className="hero-content">
                                    {loggedIn ?
                                        <>
                                            <div className="flex justify-between">
                                                <div className="">
                                                    <Link onClick={() => handleGamebtn()} className="btn border-yellow-500 btn-primary border-2">Play</Link>
                                                </div>
                                                <div className="">
                                                    <Link to="/profile" className="btn border-yellow-500 btn-primary border-2">Dashboard</Link>
                                                </div>
                                            </div>
                                        </> :
                                        <div className="flex justify-between">
                                            <div className="">
                                                <Link to="/auth/register" className="btn border-yellow-500 btn-primary border-2">REGISTER</Link>
                                            </div>
                                            <div className="">
                                                <Link to="/auth/login" className="btn border-yellow-500 btn-primary border-2">Login</Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        </div>
    );
}

export default Header;
