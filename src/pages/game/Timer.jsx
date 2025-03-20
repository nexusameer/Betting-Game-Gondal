import React, { useState, useEffect, useRef } from 'react';
import tick from "/audio/3.mp3";

import './game.css'

const Timer = ({ setTimerStop, setIsBet, messages, seBets, ws, setVoteOn }) => {
  const [seconds, setSeconds] = useState();
  const tickRef = useRef(new Audio(tick));

  useEffect(() => {
    if (messages.length === 0) {
      setSeconds(20);
    } else {
      if(messages.message === 'betting' ) {
        seBets([]);
        setVoteOn([false, false, false]); 
        setIsBet(true);
        setTimerStop(false);
        setSeconds(messages.time);
        ws.send(JSON.stringify({ message: 'user', data: localStorage.getItem('user') }));
      } else if (messages.message === 'voting') {
        seBets([]);
        setIsBet(false);
        setTimerStop(false);
        setSeconds(messages.time);
      } else if (messages.message === 'result') {
        setIsBet(false);
        setTimerStop(true);
        setSeconds(null);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (seconds) {
      if (seconds > 0) {
        setTimeout(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
      }

      if (seconds <= 5) {
        tickRef.current.play();
      }
    }
  }, [seconds]);

  return (
    <div className='h-8  border-white border w-8 items-center justify-center flex bg-black rounded-full'
      style={{
        animation: `${seconds <= 5 ? 'blink 1s infinite' : ''}`
      }}
    >
      <p className='text-white text-xl text-center '>{seconds}</p>
    </div>
  );
};

export default Timer;
