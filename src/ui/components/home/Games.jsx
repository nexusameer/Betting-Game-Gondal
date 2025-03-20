import React from 'react';

const Games = () => {
    const games = [
        {
            id: 1,
            imageUrl: 'https://template.viserlab.com/casinous/demo/assets/images/game/item6.png',
            name: 'Lightning Roullete',
            description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
        },
        {
            id: 2,
            imageUrl: 'https://template.viserlab.com/casinous/demo/assets/images/game/item2.png',
            name: 'Live dealer roulette',
            description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
        },
        {
            id: 3,
            imageUrl: 'https://template.viserlab.com/casinous/demo/assets/images/game/item3.png',
            name: 'Poker Roullete',
            description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
        },
        {
            id: 4,
            imageUrl: 'https://template.viserlab.com/casinous/demo/assets/images/game/item5.png',
            name: 'Slot Wnininngs',
            description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
        }
    ];

    return (
        <section className="section active-lg trend" aria-label="crypto trend" data-section>
            <div className="container-lg">
                <div className="trend-tab">
                    <div className="py-3">
                        <h1 className="text-center text-gold" style={{ fontSize: 16, fontWeight: 2 }}>PLAY EXCLUSIVE GAMES</h1>
                    </div>
                    <div className="grid grid-cols-2  gap-2 md:grid-cols-4 md:gap-8  py-2 md:py-12">
                        {games.map(game => (
                            <div className=" mx-2  flex justify-center" key={game.id}>
                                <div className="bg-game-card  rounded-lg">
                                    <a href="#" className="p-1 md:p-4">
                                        <img className="rounded-t-lg border p-4 rounded border-gray-800  w-full  h-32 md:h-[280px]" src={game.imageUrl} alt="img" />
                                    </a>
                                    <div className="pl-4 pr-4 pb-4 md:pl-10 md:pr-10 md:pb-10">
                                        <a href="#">
                                            <h1 className="text-center text-gold  text-xs md:text-3xl">{game.name}</h1>
                                        </a>
                                        <div className="flex justify-center">
                                            <a href="#" className=" bg-gold rounded-full p-1 border-2 text-xs md:text-lg border-yellow-500">
                                                Coming Soon
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Games;
