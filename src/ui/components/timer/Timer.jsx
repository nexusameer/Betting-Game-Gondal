import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes, initialSeconds }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let interval;

        if (minutes > 0 || seconds > 0) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes > 0) {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }

            }

                , 1000);
        }
        else {
            localStorage.removeItem('deposit')
        }

        return () => clearInterval(interval);
    }, [minutes, seconds]);

    return (
        <div>
            <p className='text-gold'> {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
        </div>
    );
};

export default Timer;
