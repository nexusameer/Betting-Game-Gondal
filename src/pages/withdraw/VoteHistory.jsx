import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { usePeriousVotes } from '../../utils/useUserData';

const VoteHistory = () => {

    const { periousVotes, loading, error } = usePeriousVotes();
    const [reversedPeriousVotes, setReversedPeriousVotes] = useState([])

    // make a copy of the array and reverse it of periousVotes
    useEffect(() => {
        if (!loading) {
            setReversedPeriousVotes([...periousVotes].reverse())
        }
    }, [loading])
    
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
                        {reversedPeriousVotes && reversedPeriousVotes.map((bet, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{bet?.amount}</span>
                                </th>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{bet?.currency}</span>
                                </td>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{bet?.date}</span>
                                </td>
                            </tr>
                        ))}
                        {reversedPeriousVotes.length > 7 && (
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

export default VoteHistory;
