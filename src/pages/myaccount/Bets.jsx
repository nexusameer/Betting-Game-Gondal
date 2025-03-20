import React,{useEffect, useState} from 'react';
import Levels from '../../ui/components/levels/Levels';
import { usePeriousBets, usebet_loss } from '../../utils/useUserData';

const Bets = () => {
    const { bet_loss, loading, error } = usebet_loss();
    const { periousBets, onLoad, onerror } = usePeriousBets();
    const [finialData, setFinialData] = useState([]); // this will hold the final data to be displayed

    useEffect(() => {
        if (!loading && !onLoad) {
            const mergedData = [...periousBets, ...bet_loss];

            // sort the data by date
            mergedData.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })

            setFinialData(mergedData)
        }
    }
    , [loading, onLoad])

    return (
        <div className='pt-24'>
            <div className="relative overflow-x-auto">
                {/* <Levels/> */}
                <table className="w-full text-sm text-left rtl:text-right text-gold bg-modal">
                    <thead className="text-xs text-gold uppercase bg-card ">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-gradiant-gold">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-gradiant-gold">
                                Currency
                            </th>
                            <th scope="col" className="px-6 py-3 text-gradiant-gold">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-card text-gradiant-gold">
                        {finialData && finialData.map((data, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{data?.win ? '+' : '-' }{data?.amount}</span>
                                </th>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{data?.currency}</span>
                                </td>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{data?.date}</span>
                                </td>
                            </tr>
                        ))}
                        {finialData.length > 7 && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>+0000</span>
                                </th>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>None</span>
                                </td>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>0000-00-00</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default Bets;

