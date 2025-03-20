import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Timer from './Timer';
import SideNav from './SideNav';


const Table = ({ 
    putBet, 
    bets, 
    Chip, 
    isRedNumber, 
    setSelectedChip, 
    undoBet, 
    perivousNumber,
    betsapply,
    setTimerStop,
    messages, 
    setIsBet, 
    userbets,
    setVoteOn,
    userVotes,
    ws,
    seBets,
    isBet}) => {
    return (
        <AnimatePresence>
            <motion.div 
                className="relative top-0 flex justify-evenly"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ duration: 1 }}
            >
            <div className='' >
                <div className='grid grid-cols-5 sm:grid-cols-5'>
                    <div className=' justify-center flex col-span-2'>
                        <Timer  
                            setTimerStop={setTimerStop} 
                            setIsBet={setIsBet} 
                            isBet={isBet}
                            messages={messages} 
                            seBets={seBets}
                            ws={ws}
                            setVoteOn={setVoteOn}
                        />
                    </div>
                    <div className=' col-span-3'>
                        <div className=' pentagon-2 bg-white '>
                            <div className="pentagon-1 col-span-3 text-white bg-[#0EA0D3]  bg-opacity-100 flex items-center justify-center cursor-pointer"
                                onClick={(e) => {
                                    putBet(e, '0')
                                }}
                            >
                                {bets.some(obj => obj.number == 0) ? (
                                    <Chip numberToAdd={'0'} bets={bets}/>
                                ) : (
                                    0
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-5 sm:grid-cols-5 w-[15.5rem]'>
                {/* odd-even */}
                    <div className="flex flex-col justify-between">
                        <div className=" h-9 text-sm flex-grow text-white border border-white  bg-black flex items-center justify-center cursor-pointer"
                            onClick={(e) => {
                                putBet(e, "1-18")
                            }}
                        >
                            {bets.some(obj => obj.number === "1-18") ? (
                                <Chip numberToAdd={"1-18"} bets={bets}/>
                            ) : (
                                <div className='flex flex-col justify-evenly'>
                                    <p className='rotate-90 font-bold'>1</p>
                                    <p className='rotate-90 font-bold'>to</p>
                                    <p className='rotate-90 font-bold'>18</p>
                                </div>
                            )}
                        </div>
                        <div className=" h-9 text-sm flex-grow text-white border border-white bg-black flex items-center justify-center cursor-pointer" 
                            onClick={(e) => {
                                putBet(e, "even")
                            }}
                        >
                            {bets.some(obj => obj.number === "even") ? (
                                <Chip numberToAdd={"even"} bets={bets}/>
                            ) : (
                                <span className='rotate-90 font-bold'>EVEN</span>
                            )}
                        </div>
                        {/* Red */}
                        <div className="h-9 w-full text-sm flex-grow text-white border border-white bg-black">
                            <div className='color-clip w-full h-full bg-white'>
                                <div className='color-clip w-full h-full  bg-red-700 flex items-center justify-center cursor-pointer'
                                    onClick={(e) => {
                                        putBet(e, "red")
                                    }}
                                >
                                    {bets.some(obj => obj.number === "red") ? (
                                        <Chip numberToAdd={"red"} bets={bets}/>
                                    ) : (
                                        <span className='rotate-90'>RED</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* black */}
                        <div className="h-9 w-full text-sm flex-grow text-white border border-white bg-cyan-400 ">
                            <div className='color-clip w-full h-full bg-white'>
                                <div className='color-clip w-full h-full   bg-black flex items-center justify-center cursor-pointer'
                                    onClick={(e) => {
                                        putBet(e, "black")
                                    }}
                                >
                                    {bets.some(obj => obj.number === "black") ? (
                                        <Chip numberToAdd={"black"} bets={bets}/>
                                    ) : (
                                        <span className='rotate-90'>BLACK</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="h-9 text-sm flex-grow text-white border border-white  bg-black flex items-center justify-center cursor-pointer"
                            onClick={(e) => {
                                putBet(e, "odd")
                            }}
                        >
                            {bets.some(obj => obj.number === "odd") ? (
                                <Chip numberToAdd={"odd"} bets={bets}/>
                            ) : (
                                <span className='rotate-90 font-bold'>ODD</span>
                            )}
                        </div>
                        <div className=" h-9 text-sm flex-grow text-white border border-white bg-black flex items-center justify-center cursor-pointer"
                            onClick={(e) => {
                                putBet(e, "19-36")
                            }}
                        >
                            {bets.some(obj => obj.number === "19-36") ? (
                                <Chip numberToAdd={"19-36"} bets={bets} />
                            ) : (
                                <div className='flex flex-col justify-evenly'>
                                    <p className='rotate-90 font-bold'>19</p>
                                    <p className='rotate-90 font-bold'>to</p>
                                    <p className='rotate-90 font-bold'>36</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* halfes */}
                    <div className="flex flex-col justify-between">
                        <div className="  text-sm flex-grow text-white border border-white  bg-black flex items-center justify-center cursor-pointer"
                            onClick={(e) => {
                                putBet(e, "1-12")
                            }}
                        >
                            {bets.some(obj => obj.number === "1-12") ? (
                                <Chip numberToAdd={"1-12"} bets={bets}/>
                            ) : (
                                <div className='flex flex-col justify-evenly h-[100%] '>
                                    <p className='rotate-90 font-bold'>1st</p>
                                    <p className='rotate-90 font-bold'>12</p>
                                </div>
                            )}
                        </div>
                    <div className="  text-sm flex-grow text-white border border-white bg-black flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                            putBet(e, "13-24")
                        }}
                    >
                        {bets.some(obj => obj.number === "13-24") ? (
                            <Chip numberToAdd={"13-24"} bets={bets} />
                        ) : (
                            <div className='flex flex-col justify-evenly h-[100%] '>
                                <p className='rotate-90 font-bold'>2nd</p>
                                <p className='rotate-90 font-bold'>12</p>
                            </div>
                        )}
                    </div>
                    <div className=" text-sm flex-grow text-white border border-white bg-black flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                            putBet(e, "25-36")
                        }}
                    >
                        {bets.some(obj => obj.number === "25-36") ? (
                            <Chip numberToAdd={"25-36"} bets={bets} />
                        ) : (
                            <div className='flex flex-col justify-evenly h-[100%] '>
                            <p className='rotate-90 font-bold'>3rd</p>
                            <p className='rotate-90 font-bold'>12</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* number */}
                    <div className=" col-span-3 grid grid-cols-3 sm:grid-cols-3">
                        {Array.from({ length: 36 }, (_, index) => (
                        <div
                            key={index}
                            className={`flex  border border-white h-[2rem] items-center justify-center ${!isRedNumber(index + 1) ? 'bg-black text-white' : '  bg-[red] bg-opacity-100 text-white'} cursor-pointer `}
                            onClick={(e) => {
                                let a = index + 1
                                putBet(e, a)
                            }}
                        >
                            {bets.some(obj => obj.number === index + 1) ? (
                                <Chip numberToAdd={index + 1} bets={bets} />
                            ) : (
                                <p className='' >{index + 1}</p>
                            )}
                        </div>
                        ))}
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div
                        className='col-span-3 grid grid-cols-3 sm:grid-cols-3'
                    >
                        <div className='h-[2rem] items-center border  border-white justify-center flex text-white bg-[black] cursor-pointer'
                            onClick={(e) => {
                                putBet(e, "Row-1")
                            }}
                        >
                            {bets.some(obj => obj.number === "Row-1") ? (
                            <Chip numberToAdd={"Row-1"} bets={bets}/>
                            ) : (
                            <p className='text-xs'>Row 1</p>
                            )}
                        </div>
                        <div className=' h-[2rem] items-center border border-white justify-center flex text-white bg-[red] cursor-pointer'
                            onClick={(e) => {
                                putBet(e, "Row-2")
                            }}
                        >
                            {bets.some(obj => obj.number === "Row-2") ? (
                                <Chip numberToAdd={"Row-2"} bets={bets} />
                            ) : (
                                <p className='text-xs'>Row 2</p>
                            )}
                        </div>
                        <div className=' h-[2rem] items-center border border-white justify-center flex text-white bg-[black] cursor-pointer'
                            onClick={(e) => {
                                putBet(e, "Row-3")
                            }} 
                        >
                            {bets.some(obj => obj.number === "Row-3") ? (
                            <Chip numberToAdd={"Row-3"} bets={bets} />
                            ) : (
                            <p className='text-xs'>Row 3</p>
                            )}
                        </div>
                    </div>
                </div>
                </div>
                <div className=''>
                    <SideNav 
                        setSelectedChip={setSelectedChip} 
                        perivousNumber={perivousNumber} 
                        undoBet={undoBet} 
                        betsapply={betsapply} 
                        isBet={isBet} 
                        userVotes={userVotes}
                        userbets={userbets} 
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Table
