import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';

const Updates = () => {
    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        const generateRandomData = () => {
            const newData = Array.from({ length: 5 }, (_, index) => {
                const isPakistaniName = Math.random() < 0.5;
                const username = isPakistaniName
                    ? pakistaniNames[Math.floor(Math.random() * pakistaniNames.length)]
                    : faker.internet.userName();

                const currency = isPakistaniName ? 'PKR' : Math.random() < 0.5 ? 'USDT' : 'TRX';
                const played = currency === 'PKR'
                    ? Math.floor(Math.random() * (200000 - 40 + 1)) + 40
                    : currency === 'TRX'
                        ? Math.floor(Math.random() * (200 - 2 + 1)) + 2
                        : Math.floor(Math.random() * (90 - 1 + 1)) + 1;

                return {
                    id: index + 1,
                    avatar: faker.image.avatar(),
                    username,
                    played,
                    won: played * 2,
                    currency,
                };
            });
            setGameData(newData);
        };

        const interval = setInterval(generateRandomData, 10000); 

        return () => clearInterval(interval);
      
    }, []);

    return (
        <motion.section
            className="section bg-card active-lg market pt-16"
            aria-label="market update"
            data-section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container-lg">
                <div>
                    <motion.h2
                        className="h2 section-title text-center text-gold"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Games Updates
                    </motion.h2>
                </div>
                <div className="market-tab">
                    <motion.table
                        className="market-table"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <thead className="table-head">
                            <tr className="table-row table-title">
                                <th className="table-heading" />
                                <th className="table-heading text-gold" scope="col">#</th>
                                <th className="text-gold table-heading" scope="col">Avatar</th>
                                <th className="text-gold table-heading" scope="col">Won</th>
                                <th className="text-gold table-heading" scope="col">Played</th>
                                <th className="text-gold table-heading" />
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {gameData.map((data) => (
                                <motion.tr
                                    key={data.id}
                                    className="table-row"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <th className="table-data rank text-gold" scope="row">{data.id}</th>
                                    <motion.td
                                        className="table-data"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <div className="wrapper">
                                            <img src={data.avatar} width={30} height={30} alt="Avatar" className="img border border-yellow-500 rounded-full" />
                                        </div>
                                    </motion.td>
                                    <motion.td
                                        className="table-data last-price text-gold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        {data.username}
                                    </motion.td>
                                    <motion.td
                                        className={`table-data last-update ${data.currency === 'PKR' ? 'green' : ''}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        +{data.won} {data.currency}
                                    </motion.td>
                                    <motion.td
                                        className="table-data market-cap text-gold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        {data.played} {data.currency}
                                    </motion.td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </motion.table>
                </div>
            </div>
        </motion.section>
    );
};

export default Updates;
const pakistaniNames = [
    "Abdul",
    "Ahmed",
    "Ali",
    "Aamir",
    "Bilal",
    "Faisal",
    "Farhan",
    "Hassan",
    "Imran",
    "Kamran",
    "Majid",
    "Nadeem",
    "Rashid",
    "Saad",
    "Saeed",
    "Tariq",
    "Waqar",
    "Yasin",
    "Zubair",
    "Adnan",
    "Asim",
    "Asad",
    "Arif",
    "Akram",
    "Bashir",
    "Ejaz",
    "Fahad",
    "Hamza",
    "Irfan",
    "Javed",
    "Kashif",
    "Khurram",
    "Nasir",
    "Qasim",
    "Rizwan",
    "Sajid",
    "Sohail",
    "Taimur",
    "Umar",
    "Usman",
    "Yousaf",
    "Zafar",
    "Zahid",
    "Adeel",
    "Ahsan",
    "Amjad",
    "Arshad",
    "Ayub",
    "Azhar",
    "Babar",
    "Basit",
    "Danish",
    "Ehsan",
    "Ghulam",
    "Haris",
    "Ismail",
    "Jahanzaib",
    "Junaid",
    "Khalid",
    "Mubashir",
    "Mudassir",
    "Noman",
    "Rauf",
    "Sarfaraz",
    "Shahbaz",
    "Shahid",
    "Tahir",
    "Talha",
    "Tanveer",
    "Umair",
    "Waheed",
    "Yaseen",
    "Zain",
    "Abrar",
    "Akhtar",
    "Arslan",
    "Atif",
    "Azeem",
    "Baqir",
    "Bilawal",
    "Ehtesham",
    "Gulzar",
    "Khalil",
    "Mubarak",
    "Mushtaq",
    "Najeeb",
    "Obaid",
    "Rafique",
    "Riaz",
    "Sami",
    "Shoaib",
    "Sultan",
    "Tauseef",
    "Yunus",
    "Zainul",
    "Zaman",
    "Aamir",
    "Aariz",
    "Abdullah",
    "Abrar",
    "Adil",
    "Aftab",
    "Ahmad",
    "Akbar",
    "Arman",
    "Ayaan",
    "Baqir",
    "Bilawal",
    "Danish",
    "Faizan",
    "Furqan",
    "Hammad",
    "Hussain",
    "Ismail",
    "Jibran",
    "Kashan",
    "Luqman",
    "Musa",
    "Nabeel",
    "Owais",
    "Qamar",
    "Rauf",
    "Salman",
    "Talha",
    "Uzair",
    "Vasim",
    "Wasiq",
    "Xavier",
    "Yaseen",
    "Zain",
    "Zayan"
];
