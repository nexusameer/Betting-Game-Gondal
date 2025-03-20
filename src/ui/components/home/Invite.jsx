import React from 'react';
import { Link } from 'react-router-dom';

const Invite = () => {
    return (
        <div>
            <section className="section active-lg app" aria-label="app" data-section>
                <div className="container-lg">
                    <div className="app-content">
                        <h2 className="h2 section-title text-gold">Start Earning Now</h2>
                        <p className="section active-lg-text  text-gold">
                            You can Play USDT CRYPTO PKR any Currency
                        </p>
                        <ul className="section active-lg-list">
                            <li className="section active-lg-item">
                                <div className="title-wrapper">
                                    <ion-icon name="checkmark-circle" aria-hidden="true" />
                                    <h3 className="h3 item-title text-gold">Play Invite Vote &amp; Earn</h3>
                                </div>
                                <p className="item-text text-gold">
                                    Manage Your Holdings From Your Mobile Decive
                                </p>
                            </li>
                            <li className="section active-lg-item">
                                <div className="title-wrapper">
                                    <ion-icon name="checkmark-circle" aria-hidden="true" />
                                    <h3 className="h3 item-title text-gold">Invite Friend and Get 5% of Extra Bonus</h3>
                                </div>
                                <p className="item-text text-gold">
                                    On First Deposit you and Your refferal will get 5% of extra bonus.
                                </p>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="app-banner">
                   <div className='py-8'> 
                   <Link to="/invite" className="text-gold border rounded-full text-center w-40 border-yellow-500">Invite Now</Link>
                   </div>
                        <img src="./images/app.png" width={526} height={526} loading="lazy" alt="app banner" className="w-100" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Invite;
