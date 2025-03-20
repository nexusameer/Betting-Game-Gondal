import React, { useEffect, useState } from 'react';

const Menu = ({ currency, setSelectedChip }) => {
    const [menuOpen, setMenu] = useState('');
    const [chipValue, setChipValue] = useState();
    const [pokerChips, setPokerChips] = useState([]);
    const [chipColor, setChipColor] = useState();
    const [isVote, setIsVote] = useState(false);
    const [currencySign, setCurrencySign] = useState();

    function toggleMenu() {
        setMenu(menuOpen === 'menu-close' ? 'menu-open' : 'menu-close');
    }
    const VCoin = [
        { value: 1, text: 'vote', color: "red", currency: 'vote' },
    ]
    const UsdtChips = [
        { value: 50, text: '50', color: "red", currency: 'USDT'},
        { value: 30, text: '30', color: "pink", currency: 'USDT' },
        { value: 15, text: '15', color: "aqua", currency: 'USDT' },
        { value: 5, text: '5', color: "yellow", currency: 'USDT' },
        { value: 2, text: '2', color: "blue", currency: 'USDT' },
        { value: 1, text: '1', color: "green", currency: 'USDT' },
    ];
    const TrxChips = [
        { value: 200, text: '200', color: "red", currency: 'TRX' },
        { value: 100, text: '100', color: "pink", currency: 'TRX' },
        { value: 40, text: '40', color: "aqua", currency: 'TRX' },
        { value: 15, text: '15', color: "yellow", currency: 'TRX' },
        { value: 5, text: '5', color: "blue", currency: 'TRX' },
        { value: 2, text: '2', color: "green", currency: 'TRX' },
    ];
    const pkrChips = [
        { value: 5000, text: '5k', color: "red", currency: 'PKR' },
        { value: 1000, text: '1k', color: "pink", currency: 'PKR' },
        { value: 400, text: '400', color: "aqua", currency: 'PKR' },
        { value: 200, text: '200', color: "yellow", currency: 'PKR' },
        { value: 100, text: '100', color: "blue", currency: 'PKR' },
        { value: 40, text: '40', color: "green", currency: 'PKR'},
    ];
    useEffect(() => {
        setPokerChips(
            currency === 'USDT' ? UsdtChips : currency === 'TRX' ? TrxChips : currency === 'PKR' ? pkrChips : VCoin
        )
        setChipValue(
            currency === 'USDT' ? UsdtChips[5].value : currency === 'TRX' ? TrxChips[5].value : currency === 'PKR' ? pkrChips[5].value : VCoin[0].value
        )
        setSelectedChip(
            currency === 'USDT' ? UsdtChips[5] : currency === 'TRX' ? TrxChips[5] : currency === 'PKR' ? pkrChips[5] : VCoin[0]
        )
        setChipColor(
            currency === 'USDT' ? UsdtChips[5].color : currency === 'TRX' ? TrxChips[5].color : currency === 'PKR' ? pkrChips[5].color : VCoin[0].color
        )
        if (currency === 'VCoin') {
            setIsVote(true)
            setCurrencySign('')
        } else {
            if (currency === 'USDT') {
                setCurrencySign('$')
            } else if (currency === 'TRX') {
                setCurrencySign('T')
            } else if (currency === 'PKR') {
                setCurrencySign('')
            }
        }
    }, [currency])


    return (
        <div className='relative' >

            {pokerChips.map((chip, index) => (
                <div
                    onClick={() => {
                        if(isVote) return;
                        else {
                            toggleMenu()
                            if (menuOpen === 'menu-open') {
                                setChipValue(chipValue)
                            } else {
                                setSelectedChip(chip)
                                setChipValue(chip.text)
                                setChipColor(chip.color)
                            }
                        }
                    }}
                    key={index}
                    className={`circle-div ${menuOpen} border-2 ${chipValue === chip.value ? ' border-white ' : '  '} rounded-full  z-50`}
                >

                    <div className={`poker-chip border-4 border-dashed`} style={{ height: '30px', width: '30px', borderColor : index === 5 ? chipColor : chip.color }}>
                        <div className={`inner-circle`}>
                            <span className="text-gold">{index === 5 ? chipValue : chip.text}{currencySign}</span>
                        </div>
                    </div>
                </div>
            ))}

            {menuOpen === 'menu-close' &&   (
                <div
                    className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-50"
                    onClick={() => setMenu('menu-open')}
                ></div>
            )}
        </div>
    );
};

export default Menu;
