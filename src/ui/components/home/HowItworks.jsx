import React from 'react';

const HowItworks = () => {
    return (
        <section className="section active-lg py-16 instruction" aria-label="instruction" data-section>
            <div className="container-lg">
                <h2 className="h2 section-title text-gold">How It Work</h2>
                <p className="section active-lg-text">
                </p>
                <ul className="instruction-list">
                    <li>
                        <div className="instruction-card">
                            <figure className="card-banner">
                                <img src="./images/instruction-1.png" width={96} height={96} loading="lazy" alt="Step 1" className="img" />
                            </figure>
                            <p className=" card-subtitle text-gold">Step 1</p>
                            <h3 className="h3 card-title text-gold">Register</h3>
                            <p className="card-text">
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="instruction-card">
                            <figure className="card-banner">
                                <img src="./images/instruction-2.png" width={96} height={96} loading="lazy" alt="Step 2" className="img" />
                            </figure>
                            <p className=" card-subtitle text-gold">Step 2</p>
                            <h3 className="h3 card-title text-gold">Deposit</h3>
                            <p className="card-text">
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="instruction-card">
                            <figure className="card-banner">
                                <img src="./images/instruction-3.png" width={96} height={96} loading="lazy" alt="Step 3" className="img" />
                            </figure>
                            <p className=" card-subtitle text-gold">Step 3</p>
                            <h3 className="h3 card-title text-gold">Start Playing</h3>
                            <p className="card-text">
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="instruction-card">
                            <figure className="card-banner">
                                <img src="./images/instruction-4.png" width={96} height={96} loading="lazy" alt="Step 4" className="img" />
                            </figure>
                            <p className=" card-subtitle text-gold">Step 4</p>
                            <h3 className="h3 card-title text-gold">Earn Money</h3>
                            <p className="card-text">
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default HowItworks;
