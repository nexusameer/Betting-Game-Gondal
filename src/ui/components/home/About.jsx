import React from 'react';
import { Link } from 'react-router-dom';
import Details from '../../components/home/Details';

const About = () => {
    return (
        <>
        <section className="section section-2 pt-12  active-lg hero" aria-label="hero" data-section>
            <div className="bg-black pt-16" style={{ backgroundColor: '#000000f7' }}>
                <div className="container-lg">
                    <div className="hero-content">
                        <h1 className="h1 hero-title text-gold">About vetoGaming</h1>
                        <p className="hero-text text-gold ">
                            What Is vetoGaming
                            Dive into the thrilling world of online gaming at our casino and unlock endless opportunities to earn real money. Our platform offers a diverse range of exciting games designed to provide you with an unparalleled gaming experience.

                            Game Variety
                            Experience the excitement of various gaming options, including classic favorites and innovative new releases. Whether you prefer the luck-driven spins of slot games, strategic challenges at the card tables, or the adrenaline-pumping thrill of live dealer games, we've got it all.

                            Interactive-lg Betting
                            Participate active-lgly in the games by placing real-time bets. Whether you're predicting the next roulette number or placing strategic wagers, your decisions impact the unfolding gameplay. The more active-lgly you engage, the more you stand to earn.

                            Innovative Voting System
                            Be a part of our revolutionary voting system that lets you shape the course of the game. Vote on game features, events, or even the direction of live sessions. Your participation matters, and we reward you for your involvement – every vote adds to your potential earnings.

                            Explore More
                            Start Earning Now
                            You can Play USDT CRYPTO PKR any Currency

                            Play Invite Vote & Earn
                            Manage Your Holdings From Your Mobile Decive

                            Invite Friend and Get 5% of Extra Bonus
                            On First Deposit you and Your refferal will get 5% of extra bonus.
                        </p>
                    </div>
                    <figure className="hero-banner">
                        <img src="/images/app2.png" width={570} height={448} alt="hero banner" className="w-100" />
                    </figure>
                </div>
            </div>
        </section>
        <Details />
        </>
    );
}

export default About;
