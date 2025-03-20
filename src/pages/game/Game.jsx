import confetti from 'canvas-confetti';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser } from "react-icons/fa";

import Roulette from './Roulete';
import Table from './table';

import './game.css';

const Game = () => {
  const [bets, seBets] = useState([])
  const [selectedChip, setSelectedChip] = useState({})
  const [betsapply, ifbetsapply] = useState(false)
  const [timeStop, setTimerStop] = useState(false);
  const [minAmountNumber, setMinAmountNumber] = useState(Math.floor(Math.random() * 37));
  const [isBet, setIsBet] = useState(true);
  const [voteOn, setVoteOn] = useState([false, false, false]);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [user, setUser] = useState();
  const [perivousNumber, setPerivousNumber] = useState([]);
  const [allperivousNumber, setallperivousNumber] = useState([]);
  const [balance, setBalance] = useState({});
  const [userVotes, setUserVotes] = useState([]);
  const [userbets, setUserbets] = useState([]);
  const [activeUsers, setActiveUsers] = useState(Math.floor(Math.random() * 500) + 2700);
  const [direction, setDirection] = useState('up');
  const [session_number, setSessionNumber] = useState(0);

  useEffect(() => {
    const updateUsers = () => {
      // Randomly adjust the number of users by 0 to 100
      const randomAdjustment = Math.floor(Math.random() * 5);

      // Determine the new user count based on the current direction
      setActiveUsers((prev) => {
        let newCount = direction === 'up' ? prev + randomAdjustment : prev - randomAdjustment;
        
        // Ensure the user count doesn't go below 0
        newCount = Math.max(0, newCount);

        // Toggle direction if limits are reached (optional adjustment)
        if (newCount >= 3200) setDirection('down');
        if (newCount <= 2700) setDirection('up');

        return newCount;
      });
    };

    // Set an interval to update the users every 5 seconds
    const interval = setInterval(updateUsers, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    // Create WebSocket connection.

    if (localStorage.getItem('user') === null) {
      window.location.href = '/auth/login';
    } 

    const loc = window.location;

    setUser(localStorage.getItem('user'));

    const wsProtocol = loc.protocol === 'https:' ? 'wss' : 'ws';

    const socket = new WebSocket(`${wsProtocol}://api.vetogaming.com/ws/game/`); // Replace 'wss://example.com/socket' with your server URL
    // Connection opened

    // send the user id to the server on connection
    socket.addEventListener('open', () => {
      console.log('Connected to server');
      socket.send(JSON.stringify({ message: 'user', data: localStorage.getItem('user') }));
      setWs(socket);
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.message ==  "previous_bets" ){
        // setPerivousNumber(data.data);
        // last 12 number
        setPerivousNumber(data.data.slice(-12));
        setallperivousNumber(data.data);
      } else if (data.message == "balance") {
        setBalance(data.data);
      } else if (data.message == 'userprevious_votes') {
        setUserVotes(data.data);
      } else if (data.message == 'userprevious_bets') {
        setUserbets(data.data);
      } else if (data.message == 'session_number') {
        setSessionNumber(data.data);
      }
      else {
        setMessages(data);
      }
    });

    socket.addEventListener('close', () => {
      // navigate to the / page
      window.location.href = '/';
    });
      
  }, []); // Empty array ensures this effect runs only once on mount

  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 360,
      origin: {
        x: 0.5, // Center of the button horizontally
        y: 0.5, // Center of the button vertically
      },
    });
  };
  const isRedNumber = (number) => {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(number);
  };

  const divRef = useRef(null);

  const takeScreenshot = () => {
    // Get the reference to the div element
    const divElement = divRef.current;

    // Create a new canvas element
    const canvas = document.createElement("canvas");

    // Set canvas dimensions to match the div
    canvas.width = divElement.offsetWidth;
    canvas.height = divElement.offsetHeight;

    // Get the canvas 2D context
    const ctx = canvas.getContext("2d");

    // Draw the content of the div onto the canvas
    ctx.drawWindow(window, divElement.offsetLeft, divElement.offsetTop, divElement.offsetWidth, divElement.offsetHeight, "rgb(255,255,255)");

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL();

    // Create an image element
    const img = new Image();

    // Set the src attribute to the data URL
    img.src = dataURL;

    // Append the image to the body or any other container
    document.body.appendChild(img);

    // Remove the image after a certain period of time (e.g., 5 seconds)
    setTimeout(() => {
      document.body.removeChild(img);
    }, 5000);
  };


  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };


  const putBet = (e, numberToAdd) => {
    e.preventDefault();
    const updatedBets = [...bets]; // Create a shallow copy of the array
    const existingBetIndex = updatedBets.findIndex(obj => obj.number === numberToAdd);
    if (!isBet && !timeStop) {
      if (balance?.vcoin > 0) {
        if (voteOn[0] === false && (numberToAdd === 'even' || numberToAdd === 'odd')) {
          setVoteOn([true, voteOn[1], voteOn[2]]);
          balance.vcoin = balance.vcoin -1;
          updatedBets.push({ amount: selectedChip?.text, number: numberToAdd, betColor : selectedChip?.color, currency : selectedChip?.currency, user: user});
        } else if (voteOn[1] === false && (numberToAdd === 'red' || numberToAdd === 'black')) {
          setVoteOn([voteOn[0], true, voteOn[2]]);
          balance.vcoin = balance.vcoin -1;
          updatedBets.push({ amount: selectedChip?.text, number: numberToAdd, betColor : selectedChip?.color, currency : selectedChip?.currency, user: user});
        } else if (voteOn[2] === false && (numberToAdd >= 0 && numberToAdd <= 36)) {
          setVoteOn([voteOn[0], voteOn[1], true]);
          balance.vcoin = balance.vcoin -1;
          updatedBets.push({ amount: selectedChip?.text, number: numberToAdd, betColor : selectedChip?.color, currency : selectedChip?.currency, user: user});
        }
      } else {
        alert('You do not have enough balance');
      }
    } else {
      if (existingBetIndex !== -1) {
        if (selectedChip?.value < balance[selectedChip?.currency == "USDT" ?  "usdt" : selectedChip?.currency == "TRX" ? "trx" : selectedChip?.currency == "PKR" ? "pkr" : "vcoin"]) {
          // If the number is already present, update the amount 
          // convert into interger
          if(balance[selectedChip?.currency == "USDT" ?  "usdt" : selectedChip?.currency == "TRX" ? "trx" : selectedChip?.currency == "PKR" ? "pkr" : "vcoin"] > 0) {
            if (selectedChip?.currency == "TRX") {
              balance.trx = balance.trx - parseInt(selectedChip?.value);
            } else if (selectedChip?.currency == "PKR") {
              balance.pkr = balance.pkr - parseInt(selectedChip?.value);
            } else if (selectedChip?.currency == "USDT") {
              balance.usdt = balance.usdt - parseInt(selectedChip?.value);
            }
            updatedBets[existingBetIndex].amount = parseInt(updatedBets[existingBetIndex].amount) + parseInt(selectedChip?.value);  
            ifbetsapply(true);
          } else {
            alert('You do not have enough balance');
          }
        } else {
          alert('You do not have enough balance');
        }
      } else {
        if (selectedChip?.value < balance[selectedChip?.currency == "USDT" ?  "usdt" : selectedChip?.currency == "TRX" ? "trx" : selectedChip?.currency == "PKR" ? "pkr" : "vcoin"]) {
          if (balance[selectedChip?.currency == "USDT" ?  "usdt" : selectedChip?.currency == "TRX" ? "trx" : selectedChip?.currency == "PKR" ? "pkr" : "vcoin"] > 0) {
            // If the number is not present, add a new entry
            if (selectedChip?.currency == "TRX") {
              balance.trx = balance.trx - parseInt(selectedChip?.value);
            } else if (selectedChip?.currency == "PKR") {
              balance.pkr = balance.pkr - parseInt(selectedChip?.value);
            } else if (selectedChip?.currency == "USDT") {
              balance.usdt = balance.usdt - parseInt(selectedChip?.value);
            }
            updatedBets.push({ amount: selectedChip?.value, number: numberToAdd, betColor : selectedChip?.color, currency : selectedChip?.currency, user: user});
            ifbetsapply(true);
          } else {
            alert('You do not have enough balance');
          }
        } else {
          alert('You do not have enough balance');
        }
      }
    }

    if(isBet && !timeStop) { 
      localStorage.setItem("currentBets", selectedChip.currency);
    }

    if(ws && updatedBets.length > 0) {
      ws.send(JSON.stringify({ message: 'bet', data: updatedBets }));
    }
    
    seBets(updatedBets);
  };

  const undoBet = () => {
    if (bets.length > 0) {
      const updatedBets = [...bets];
      const lastElement = bets[bets.length - 1];
      if (lastElement.currency == "TRX") {
        balance.trx = balance.trx + parseInt(lastElement.amount);
      } else if (lastElement.currency == "PKR") {
        balance.pkr = balance.pkr + parseInt(lastElement.amount);
      } else if (lastElement.currency == "USDT") {
        balance.usdt = balance.usdt + parseInt(lastElement.amount);
      } else if (lastElement.currency == "vote") {
        balance.vcoin = balance.vcoin + 1
      }
      if (lastElement.amount == 'vote') {
        if (lastElement.number === 'even' || lastElement.number === 'odd') {
          setVoteOn([false, voteOn[1], voteOn[2]]);
        } else if (lastElement.number === 'red' || lastElement.number === 'black') {
          setVoteOn([voteOn[0], false, voteOn[2]]);
        } else if (lastElement.number >= 0 && lastElement.number <= 36) {
          setVoteOn([voteOn[0], voteOn[1], false]);
        }
      }
      updatedBets.pop(); // Remove the last element
      seBets(updatedBets);
      if(ws) {
        ws.send(JSON.stringify({ message: 'bet', data: updatedBets }));
      }
    } else if (bets.length == 0) {
      ifbetsapply(false);
    }
  };

  const numberDisplay = () => {
    const reversedNumbers = [...perivousNumber].reverse();
    if (reversedNumbers.length == 0) return (<div className='grid-item border border-solid p-1 text-sm text-white text-center'>0</div>);
    return reversedNumbers.map((number, index) => (
      <div key={index} className={`grid-item border border-solid p-1 text-sm text-white text-center`}
        style={{
          backgroundColor: number == 0 ? '#0EA0D3' : isRedNumber(number) ? 'red' : 'black'
        }}
      >
        {number}
      </div>
    ));
  }


  return (
    <AnimatePresence>
      <div className='game1-bg'>
        <div className="grid bg-black grid-cols-12">
          {/* { isBet ? perivousNumber.map((index) => (
            <div key={index} className={`grid-item border border-solid p-1 text-sm text-white text-center`}
              style={{
                backgroundColor: numbers.color
              }}
            >
              {perivousNumber[index]}
            </div>
          )) : null} */}
          { isBet && numberDisplay() }
        </div>
        {isBet ? 
          (<h2 className='mainHeading'>Time to Bet</h2>) 
          : timeStop ? (<h2 className='mainHeading'>Display Result</h2>) 
          : (<h2 className='mainHeading'>Time to vote</h2>)
        }
        <motion.div
          className="relative w-[100%] "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {timeStop && (
            <Roulette 
            setTimerStop={setTimerStop} 
            number={minAmountNumber} 
            messages={messages}
            seBets={seBets} 
            setIsBet={setIsBet} 
            setMinAmountNumber={setMinAmountNumber} 
            ifbetsapply={ifbetsapply} 
          />
          )}
          {isBet && !timeStop && (
            <Table
              putBet={putBet}
              undoBet={undoBet}
              bets={bets}
              Chip={Chip}
              ws={ws}
              seBets={seBets}
              messages={messages}
              setVoteOn={setVoteOn}
              userVotes={userVotes}
              userbets={userbets}
              perivousNumber={allperivousNumber}
              setTimerStop={setTimerStop}
              isBet={isBet}
              selectedChip={selectedChip}
              isRedNumber={isRedNumber}
              setIsBet={setIsBet}
              setSelectedChip={setSelectedChip}
              handleClick={handleClick}
              divRef={divRef}
              betsapply={betsapply}
              takeScreenshot={takeScreenshot}
              handleOpenOverlay={handleOpenOverlay}
              handleCloseOverlay={handleCloseOverlay}
              isOverlayOpen={isOverlayOpen}
            />
          )}
          {!isBet && !timeStop && (
            <Table
              putBet={putBet}
              undoBet={undoBet}
              bets={bets}
              Chip={Chip}
              ws={ws}
              setVoteOn={setVoteOn}
              userVotes={userVotes}
              userbets={userbets}
              seBets={seBets}
              messages={messages}
              perivousNumber={allperivousNumber}
              setTimerStop={setTimerStop}
              isBet={isBet}
              selectedChip={selectedChip}
              isRedNumber={isRedNumber}
              setIsBet={setIsBet}
              setSelectedChip={setSelectedChip}
              handleClick={handleClick}
              divRef={divRef}
              betsapply={betsapply}
              takeScreenshot={takeScreenshot}
              handleOpenOverlay={handleOpenOverlay}
              handleCloseOverlay={handleCloseOverlay}
              isOverlayOpen={isOverlayOpen}
            />
          )}
        </motion.div>
              {/* bottom nav */}
        <div className='px-3 bottom-0 fixed'>
          {/* First Section */}
            <p className='text-white' >{session_number}</p>
            <div className='flex justify-between item-center w-full'>
              {/* total amount of bet */}
              {isBet && !timeStop && (
                <p className='text-white' >Total Bet : {bets.reduce((acc, curr) => acc + parseInt(curr.amount), 0)} {selectedChip?.currency}</p>
              )}
              {!isBet && !timeStop && (
                <p className='text-white' >Total Vote : {bets.length}</p>
              )}
              {/* total number of bet */}
              {isBet && !timeStop && (
                <div className='text-white flex flex-row items-center justify-center' ><FaUser/> <p>{activeUsers}</p></div>
              )}
            </div>
            <div className='flex justify-between item-center w-full gap-1'>
              <p className='text-white' >{user}</p>
              {isBet && !timeStop && (
                <div className='flex justify-between item-center w-full gap-1'>
                  <p className='text-center text-white text-sm' >TRX : {balance?.trx?.toFixed(2)}</p>
                  <p className='text-center text-white text-sm' >PKR : {balance?.pkr?.toFixed(2)}</p>
                  <p className='text-center text-white text-sm' >USDT : {balance?.usdt?.toFixed(2)}</p>
                </div>
              )}
              {!isBet && !timeStop && (
                <p className='text-center text-white text-sm'>Vcoin : {balance?.vcoin?.toFixed(2)} </p>
              )}
            </div>
        </div>
      </div>
    </AnimatePresence>
  );
};


const Chip = ({ numberToAdd, bets }) => {  
  const chip = bets.find(obj => obj.number === numberToAdd);
  return (
    <div className={`poker-chip w-1 h-1 relative z-50 border-4 border-dashed`} style={{ borderColor : chip?.betColor }} >
      <div className="inner-circle">
        <span className="text-white text-sm">{chip?.amount}</span>
      </div>
    </div>
  );
}

export default Game;







