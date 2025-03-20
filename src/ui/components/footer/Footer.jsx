import React from 'react';
import GradientIcon from '../icons/GradientIcons';
import { FaDice } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="footer-top active-lg" data-section>
                    <div className="container-lg">
                        <div className="footer-brand -mt-20">
                            <GradientIcon icon={FaDice} size={80} />
                            <a href="#" className="logo text-gold pt-font">
                                vetoGaming
                            </a>
                            <h2 className="footer-title text-gold">Let's talk! 🤙</h2>
                            <a href="tel:+123456789101" className="footer-contact-link text-gold">+12 345 678 9101</a>
                            <a href="mailto:hello.cryptex@gmail.com" className="footer-contact-link text-gold">hello.cryptex@gmail.com</a>
                            <address className="footer-contact-link text-gold">
                                Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522
                            </address>
                        </div>
                        {Array.from({ length: 4 }, (_, i) => (
                            <ul key={i} className="footer-list">
                                <li>
                                    <p className="footer-list-title text-gold">{i === 0 ? 'Products' : i === 1 ? 'Services' : i === 2 ? 'Support' : 'About Us'}</p>
                                </li>
                                {Array.from({ length: 6 }, (_, j) => (
                                    <li key={j}>
                                        <a href="#" className="footer-link text-gold">
                                            {i === 0
                                                ? j === 0 ? 'Spot' : j === 1 ? 'Inverse Perpetual' : j === 2 ? 'USDT Perpetual' : j === 3 ? 'Exchange' : j === 4 ? 'Launchpad' : 'Binance Pay'
                                                : i === 1
                                                    ? j === 0 ? 'Deposit Crypto' : j === 1 ? 'Markets' : j === 2 ? 'Tranding Fee' : j === 3 ? 'Affiliate Program' : j === 4 ? 'Referral Program' : 'API'
                                                    : i === 2
                                                        ? j === 0 ? 'Veto Learn' : j === 1 ? 'Help Center' : j === 2 ? 'User Feedback' : j === 3 ? 'Submit a request' : j === 4 ? 'API Documentation' : 'Trading Rules'
                                                        : j === 0 ? 'About Us' : j === 1 ? 'Careers' : j === 2 ? 'Press' : j === 3 ? 'Blog' : j === 4 ? 'Security' : 'Privacy Policy'
                                            }
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container-lg">
                        <p className="copyright text-gold">
                            © 2022 Cryptex All Rights Reserved by <a href="#" className="text-gold">vetoGaming</a>
                        </p>
                        <ul className="social-list">
                            {['logo-facebook', 'logo-twitter', 'logo-instagram', 'logo-linkedin'].map((icon, index) => (
                                <li key={index}>
                                    <a href="#" className="social-link">
                                        <ion-icon name={icon} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
