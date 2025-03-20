import React, { useState } from 'react';

const Levels = ({setLevel}) => {
    const [selectedLevel, setSelectedLevel] = useState(1)
    return (
        <div className='flex justify-center '>
            {[1, 2, 3].map((level) => {
                return (
                    <div key={level} className='mx-3 border-2  border-yellow-500 rounded'>
                        <button onClick={()=>{
                        setSelectedLevel(level)
                        setLevel(level)
                        }} className={level===selectedLevel?'bg-gold p-2 text-black  text-sm sm:text-lg rounded' :'text-gold p-2 text-sm sm:text-lg'}>LEVEL {level}</button>
                    </div>
                )
            }
            )}
        </div>
    );
}

export default Levels;
