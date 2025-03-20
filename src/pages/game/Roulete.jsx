import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Roulette.css";
import { FaCircle } from "react-icons/fa";
import Roulet from "/routtle.webp";
import audio from "/audio/1.mp3";
import win from "/audio/2.mp3";

const Roulette = ({ setTimerStop, seBets, setIsBet, messages, ifbetsapply }) => {
  const [seconds, setSeconds] = useState();
  const [display, setDisplay] = useState(false);
  const [previousNumber, setPreviousNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  const [winningNumber, setWinningNumber] = useState(0);
  const [number, setNumber] = useState(null);
  const [wait, setWait] = useState(false);
  const [voteResult, setVoteResult] = useState([]);
  const [voteWinUser, setVoteWinUser] = useState([]);
  const [betWin, setBetWin] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [degrees, setDegrees] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audio));
  const winRef = useRef(new Audio(win));

  const numberLocation = [
    40, 264, 98, 20, 79, 225, 137, 342, 196, 303, 215, 176, 1, 157, 284, 59,
    245, 118, 322, 69, 274, 88, 313, 206, 235, 108, 30, 147, 351, 332, 186,
    293, 49, 254, 127, 11, 166,
  ];
  const numbers = {
    0: [12, "red"],
    1: [35, "black"],
    2: [3, "red"],
    3: [26, "black"],
    4: [0, "#0EA0D3"],
    5: [32, "red"],
    6: [15, "black"],
    7: [19, "red"],
    8: [4, "black"],
    9: [21, "red"],
    10: [2, "black"],
    11: [25, "red"],
    12: [17, "black"],
    13: [34, "red"],
    14: [6, "black"],
    15: [27, "red"],
    16: [13, "black"],
    17: [36, "red"],
    18: [11, "black"],
    19: [30, "red"],
    20: [8, "black"],
    21: [23, "red"],
    22: [10, "black"],
    23: [5, "red"],
    24: [24, "black"],
    25: [16, "red"],
    26: [33, "black"],
    27: [1, "red"],
    28: [20, "black"],
    29: [14, "red"],
    30: [31, "black"],
    31: [9, "red"],
    32: [22, "black"],
    33: [18, "red"],
    34: [29, "black"],
    35: [7, "red"],
    36: [28, "black"],
  };

  useEffect(() => {
    // Play audio when the roulette animation starts
    if (isPlaying && wait === false) {
      audioRef.current.play();
      const timer = setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }, 10000);  // Stop the audio after 10 seconds

      return () => {
        clearTimeout(timer);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      };
    }
  }, [isPlaying]);

  useEffect(() => {
    if (messages.length === 0) {
      setSeconds(20);
    } else {
      if (messages.message === "result") {
        if (messages.time < 19) {
          setWait(true);
        }
        setSeconds(messages.time);
        setNumber(messages?.winning_number);
        setVoteResult(messages?.total_votes);

        const votewin = messages?.voting_winners?.filter(
          (item) => item.user === localStorage.getItem("user")
        );
        const betwin = messages?.betting_winners?.filter(
          (item) => item.user === localStorage.getItem("user")
        );
        setVoteWinUser(votewin);
        setBetWin(betwin);

        let totalprofit = 0;
        betwin?.forEach((item) => {
          totalprofit += item.profit;
        });
        setTotalProfit(totalprofit);
        setIsBet(false);
        setTimerStop(true);
      } else if (messages.message === "betting") {
        setSeconds(null);
        setIsBet(true);
        setTimerStop(false);
      } else if (messages.message === "voting") {
        setSeconds(null);
        setIsBet(false);
        setTimerStop(false);
      }
    }
  }, [messages]);

  useEffect(() => {
    console.clear();
    if (number !== null) {
      setDegrees(numberLocation[number]);
      setIsPlaying(true);
    }
  }, [number]);

  useEffect(() => {
    if (seconds !== null && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
        if (seconds <= 9 && wait === false) {
          setDisplay(true);
        } else {
          seBets([]);
          ifbetsapply(false);
        }
      }, 1000);

      const winningNumberKey = Object.keys(numbers).find(
        (key) => numbers[key][0] === number
      );
      if (winningNumberKey == "0") {
        setPreviousNumber(numbers[36]);
        setNextNumber(numbers[1]);
        setWinningNumber(numbers[0]);
      } else if (winningNumberKey == "36") {
        setPreviousNumber(numbers[35]);
        setNextNumber(numbers[0]);
        setWinningNumber(numbers[36]);
      } else {
        setPreviousNumber(numbers[parseInt(winningNumberKey) - 1]);
        setNextNumber(numbers[parseInt(winningNumberKey) + 1]);
        setWinningNumber(numbers[winningNumberKey]);
      }

      return () => clearInterval(interval);
    }
  }, [seconds, number]);

  useEffect(() => {
    if (display) {
      if (betWin.length > 0 || voteWinUser.length > 0) {
        winRef.current.play();
      }

      const timer = setTimeout(() => {
        winRef.current.pause();
        winRef.current.currentTime = 0;
      }, 5000);  // Stop the audio after 10 seconds

      return () => {
        clearTimeout(timer);
        winRef.current.pause();
        winRef.current.currentTime = 0;
      };
    }
    }, [display]);

  return (
    <AnimatePresence>
      <motion.div
        key={0}
        className="relative top-0 flex justify-center"
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1 }}
      >
        {wait ? (
            <h2 className="mainHeading">Waiting for {seconds} seconds</h2>
        ) : (
          <div
            className="flex items-center box justify-center"
            style={{
              backgroundImage: "url(/main-roulet.webp)",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          >
            <motion.div
              className={`rounded-full w-[12rem] h-[12rem]`}
              initial={{ rotate: 0 }}
              animate={{ rotate: 1440 + degrees }}
              transition={{ duration: 10 }}
              exit={{ rotate: 0 }}
            >
              <div
                style={{
                  backgroundImage: `url(${Roulet})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              >
                <FaCircle className="text-white" />
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
      {display && (
        <motion.div
          key={1}
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {betWin?.length > 0 ? (
            <motion.div
              className="fixed top-20 w-full h-full bg-black bg-opacity-50 flex items-center justify-evenly flex-col"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
            >
              <div
                className="flex justify-center items-center flex-col"
                style={{
                  backgroundImage: "url(/images/win.jpg)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  width: "50%",
                  height: "50%",
                  top: 0,
                  position: 'absolute',
                }}>
                <h1 className="text-white text-sm mt-[33px] font-bold ">You Win</h1>
                <p className="text-white text-sm font-bold ">{totalProfit} {betWin[0]?.currency}</p>
              </div>
              <div className="z-10">
                {betWin.map((item, index) => (
                  <div key={index} className="flex flex-col items-center" style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '10px' }}>
                    <p>{item.profit} {item.currency}</p>
                    <h3>{item.number}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center flex-col"
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
            >
              <div className="mainContainer">
                <div className="flex-container">
                  <div className="flex-item previous" style={{
                    backgroundColor: previousNumber[1]
                  }}>{previousNumber[0]}</div>
                  <div className="flex-item winning" style={{
                    backgroundColor: winningNumber[1],
                    boxShadow: `0 0 10px 5px ${winningNumber[1]}`
                  }}>{winningNumber[0]}</div>
                  <div className="flex-item next" style={{
                    backgroundColor: nextNumber[1]
                  }}>{nextNumber[0]}</div>
                </div>
              </div>
              {voteWinUser?.length > 0 && (
                <div className="flex flex-col items-center">
                  <h1 className="text-white text-lg">You win</h1>
                  <div className="flex flex-col items-center">
                    <h1 className="text-white text-lg">{voteWinUser.length} Votes</h1>
                  </div>
                </div>
              )}
              <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Vote Results</h3>
                <ul>
                  {Object.entries(voteResult).map(([key, value]) => (
                    <li key={key} style={{ listStyleType: 'none', padding: '2px', borderBottom: '1px solid #ccc' }}>
                      <strong>{key.replace('_', ' ')} --</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Roulette;

