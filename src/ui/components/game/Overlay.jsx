// Overlay.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = ({ isOpen, onClose, overLayData, userbets, userVotes, iswiningNumber }) => {

    const isRedNumber = (number) => {
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        return redNumbers.includes(number);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key={0}
                    className="fixed inset-0 h-[100vh] bg-black bg-opacity-50  z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => console.log("clked")}
                >
                    <motion.div
                        key={1}
                        className="overlya-bg w-full   fixed bottom-0 p-4 z-50 "
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}

                    >
                        <div className=' h-[70vh] grid grid-cols-12 overflow-y-auto'>
                            <a href="" className='to-0 right-1 text-white' onClick={(e) => {
                                e.preventDefault();
                                onClose();
                            }}>x</a>
                            {iswiningNumber ?
                                overLayData != [] ? (
                                    overLayData.map((number, index) => (
                                        <div key={index} className={`grid-item border border-solid text-sm text-white text-center`}
                                            style={{
                                            backgroundColor: number === 0 ? '#0EA0D3' : isRedNumber(number) ? 'red' : 'black',
                                            }}
                                        >
                                            {number}
                                        </div>
                                    ))
                                ) : null
                                : 
                                    userbets != [] || userVotes != [] ? (
                                        // make a table of userbets and userVotes
                                        <div className='grid-item border border-solid text-sm text-white text-center col-span-12 '>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Display bets and votes in the same row */}
                                                    {userbets.map((bets, index) => (
                                                        <tr key={`row-${index}`}>
                                                            {/* Bets */}
                                                            <td className='flex flex-row' >
                                                                <p>bet</p>
                                                                {/* Display individual bet chips */}
                                                                <Chip key={`bet-${index}`} chip={bets} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {userVotes.map((votes, index) => (
                                                        <tr key={`row-${index}`}>
                                                            {/* Votes */}
                                                            <td className='flex flex-row' >
                                                                <p>vote</p>
                                                                {/* Display individual vote chips */}
                                                                <Chip key={`vote-${index}`} chip={votes} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>


                                        </div>
                                    )
                                    : null
                                }
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Chip = ({ chip }) => {  
    return (
      <div className={`poker-chip w-1 h-1 relative z-50 border-4 border-dashed`} style={{ borderColor : chip.betColor ? chip.betColor : "red" }} >
        <div className="inner-circle">
          <span className="text-white text-sm">  {chip.amount ? chip.amount : 'vote' }</span>
        </div>
      </div>
    );
  }

export default Overlay;
