import React, { useEffect, useState } from 'react';
import Overlay from '../../ui/components/game/Overlay';
import { Link } from 'react-router-dom';
import { FaGamepad, FaStar } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { RxCaretDown } from "react-icons/rx";
import { BiUndo } from "react-icons/bi";
import { TfiLoop } from "react-icons/tfi";
import { IoMenu } from "react-icons/io5";
import Menu from '../../ui/components/menu/Menu';

const SideNav = ({ undoBet, setSelectedChip, betsapply, isBet, perivousNumber, userVotes, userbets }) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const chipsOptions = ['USDT', 'TRX', 'PKR'];
    const [chip, setChip] = useState('');
    const [overLayData, setOverLayData] = useState([]);
    const [overLayType, setOverLayType] = useState('');
    const [iswiningNumber, setIswiningNumber] = useState(false);


    useEffect(() => {
        if (isBet) {
            setChip(localStorage.getItem('currentBets') ? localStorage.getItem('currentBets') : chipsOptions[0]);
        } else {
            setChip('VCoin');
        }
        if (overLayType === "periouswinignumber") {
            const reversedNumbers = [...perivousNumber].reverse()
            setIswiningNumber(true)
            setOverLayData(reversedNumbers)
            setIsOverlayOpen(true)
        } else if (overLayType === "userbetsdata") {
            setIswiningNumber(false)
            setIsOverlayOpen(true)
        }

        
    }, [isBet, overLayType]);

    const handleOpenOverlay = () => {
        setIsOverlayOpen(true)
    };

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
    };

    const handleChip = () => {
        if(isBet && !betsapply) {
            const index = chipsOptions.indexOf(chip);
            setChip(chipsOptions[(index + 1) % chipsOptions.length]);
        } else if (!isBet) {
            setChip('VCoin');
        }
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col justify-around h-2/3">
                <div className="flex-col">
                    { isBet && [FaStar, IoStatsChart, RxCaretDown].map((Icon, index) => (
                        <div key={index} className="mt-1 h-9 w-9 bg-transparent border border-white rounded-full flex items-center justify-center"
                          onClick={() => { if (index === 1) setOverLayType("periouswinignumber"); else if (index === 2) setOverLayType("userbetsdata") }}
                        >
                            <Icon color='white' size={20} />
                        </div>
                    ))}
                </div>
                <div className="flex-col">
                    <div className="mt-1 h-9 w-9 bg-transparent border border-white rounded-full flex items-center justify-center" onClick={undoBet}>
                        <BiUndo color='white' size={20} />
                    </div>
                    <div className="mt-1 h-9 w-9 bg-transparent border border-white rounded-full">
                        <Menu currency={chip} setSelectedChip={setSelectedChip} />
                    </div>
                    <div className="mt-1 h-9 w-9 p-1 bg-transparent border border-white rounded-full flex justify-center items-center ">
                        <button className="text-white text-xs"  onClick={() => handleChip()} >{chip}</button>
                    </div>
                    <div className="mt-1 h-9 w-9 bg-transparent border border-white rounded-full flex items-center justify-center">
                        <p className="text-center text-white font-bold">x2</p>
                    </div>
                </div>
                <div className=" flex-col">
                    { isBet ?  [TfiLoop].map((Icon, index) => (
                        <div key={index} className="mt-1 h-9 w-9 bg-transparent border border-white rounded-full flex items-center justify-center">
                            {index === 1 ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); handleOpenOverlay() }}>
                                    <Icon color='white' size={20} />
                                </a>
                            ) : (
                                <Icon color='white' size={20} />
                            )}
                        </div>
                    )) : null }
                </div>
            </div>
            <Overlay 
                isOpen={isOverlayOpen} 
                onClose={handleCloseOverlay} 
                overLayData={overLayData} 
                iswiningNumber={iswiningNumber}
                userVotes={userVotes}
                userbets={userbets} 
            />
        </div>
    );
}

export default SideNav;
