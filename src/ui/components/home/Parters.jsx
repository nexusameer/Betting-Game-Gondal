import React from 'react';

const Parters = () => {
    return (
        <div>
            <section className="section section-2  active-lg hero" aria-label="hero" data-section>
                <div className=" pt-16" style={{ backgroundColor: '#000000f7' }}>
                    <div className="">
                        <div className="hero-content">
                            <h1 className="h1 hero-title text-gold text-center">Live VetoGaming Partners</h1>

                            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 py-12">
                                {sportsPartners.map((i, j) => {
                                    return (
                                        <div key={j} className="flex justify-center">
                                            <div>
                                                <div className="bg-card flex justify-center  h-full  rounded-lg  ">
                                                    <div>
                                                        <a target='_-blank' href={i.url} className="p-1">
                                                            <img className="rounded-t-lg border p-1 rounded border-gray-800 h-full w-full" style={{ height: 40 }} src={i.logo} alt="img" />
                                                        </a>
                                                    </div>
                                                    <div className=" pr-4  pt-4">
                                                        <a target='_-blank' href={i.url} >
                                                            <h1 className="text-center text-gold text-3l pt-font">{i.name}</h1>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section section-2  active-lg hero" aria-label="hero" data-section>
                <div className=" pt-16" style={{ backgroundColor: '#00040f7' }}>
                    <div>
                        <div className="hero-content">
                            <h1 className="h1 hero-title text-gold text-center">Crypto Partners</h1>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
                                {cryptoPartners.map((i, j) => {
                                    return (
                                        <div key={j} className="flex justify-center">
                                            <div>
                                                <div className="bg-card flex justify-center rounded-lg  ">
                                                    <div>
                                                        <a target='_-blank' href={i.url} className="p-1">
                                                            <img className="rounded-t-lg  border p-1 rounded border-gray-800  w-full" style={{ height: 40 }} src={i.logo} alt="img" />
                                                        </a>
                                                    </div>
                                                    <div className=" pr-4  pt-4">
                                                        <a target='_-blank' href={i.url} >
                                                            <h1 className="text-center text-gold text-3l pt-font">{i.name}</h1>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Parters;


const cryptoPartners = [
    { name: 'Binance', url: 'https://binance.com', logo: '/images/logos/bnb.png' },
    { name: 'Coinbase', url: 'https://coinbase.com', logo: '/images/logos/coibase.svg' },
    { name: 'Kraken', url: 'https://kraken.com', logo: '/images/logos/kraken.png' },
    { name: 'Bitstamp', url: 'https://bitstamp.net', logo: '/images/logos/bitstamp.png' },
    { name: 'Huobi', url: 'https://huobi.com', logo: '/images/logos/huobi.png' },
    { name: 'Gemini', url: 'https://gemini.com', logo: '/images/logos/gmini.svg' },
    { name: 'OKEx', url: 'https://okex.com', logo: '/images/logos/okex.png' },
    { name: 'KuCoin', url: 'https://kucoin.com', logo: '/images/logos/kucoin.png' },
];

const sportsPartners = [
    { name: 'Bet365', url: 'https://bet365.com', logo: '/images/logos2/365.png' },
    { name: 'Ladbrokes', url: 'https://ladbrokes.com', logo: '/images/logos2/lad.png' },
    { name: '888sport', url: 'https://888sport.com', logo: '/images/logos2/888.png' },
    { name: 'Unibet', url: 'https://unibet.com', logo: '/images/logos2/uni.png' },
    { name: 'Betway', url: 'https://betway.com', logo: '/images/logos2/way.webp' },
    { name: 'Bwin', url: 'https://bwin.com', logo: '/images/logos2/bw.png' },
];