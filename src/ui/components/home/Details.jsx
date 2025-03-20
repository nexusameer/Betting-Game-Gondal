import React from 'react';

const Details = () => {
    return (
        <section className="section active-lg about py-16" aria-label="about" data-section>
            <div className="container-lg">
                <figure className="about-banner">
                    <img src="/images/app3.png" width={748} height={436} loading="lazy" alt="about banner" className="w-100" />
                </figure>
                <div className="about-content">
                    <h2 className="h2 section-title text-gold">What Is vetoGaming</h2>
                    <p className="section active-lg-text text-gold">
                        Dive into the thrilling world of online gaming at our casino and unlock endless opportunities to earn real
                        money. Our platform offers a diverse range of exciting games designed to provide you with an unparalleled
                        gaming experience.
                    </p>
                    <ul className="section active-lg-list ">
                        <li className="section active-lg-item text-gold">
                            <div className="title-wrapper">
                                <ion-icon name="checkmark-circle" aria-hidden="true" />
                                <h3 className="h3 list-title"> Game Variety</h3>
                            </div>
                            <p className="item-text text-gold">
                                Experience the excitement of various gaming options, including classic favorites and innovative new
                                releases. Whether you prefer the luck-driven spins of slot games, strategic challenges at the card
                                tables, or the adrenaline-pumping thrill of live dealer games, we've got it all.
                            </p>
                        </li>
                        <li className="section active-lg-item">
                            <div className="title-wrapper">
                                <ion-icon name="checkmark-circle" aria-hidden="true" />
                                <h3 className="h3 list-title text-gold">Interactive-lg Betting</h3>
                            </div>
                            <p className="item-text text-gold text-gold">
                                Participate active-lgly in the games by placing real-time bets. Whether you're predicting the next
                                roulette number or placing strategic wagers, your decisions impact the unfolding gameplay. The more
                                active-lgly you engage, the more you stand to earn.
                            </p>
                        </li>
                        <li className="section active-lg-item text-gold">
                            <div className="title-wrapper">
                                <ion-icon name="checkmark-circle" aria-hidden="true" />
                                <h3 className="h3 list-title text-gold">Innovative Voting System</h3>
                            </div>
                            <p className="item-text text-gold ">
                                Be a part of our revolutionary voting system that lets you shape the course of the game. Vote on game
                                features, events, or even the direction of live sessions. Your participation matters, and we reward
                                you for your involvement – every vote adds to your potential earnings.
                            </p>
                        </li>
                    </ul>
                    <a href="#" className="btn btn-primary border-2 border-yellow-500 mt-12">Explore More</a>
                </div>
            </div>
        </section>
    );
}

export default Details;
