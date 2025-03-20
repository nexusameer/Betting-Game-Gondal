import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';

const History = () => {
    const [data, setData] = useState([])
    const api = useAxios()
    const getHistory = async () => {
        try {
            const history = await api.get('api/withdrawal-history/')
            setData(history.data)
            console.log(history)
        } catch (error) {

        }
    }
    useEffect(() => {
        getHistory()
    }, []);
    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gold bg-modal">
                    <thead className="text-xs text-gold uppercase bg-card ">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-gradiant-gold">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-gradiant-gold">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-gradiant-gold">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-card text-gradiant-gold">
                        {data.map((i, j) => {
                            return (
                                <tr key={j} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">

                                        <span className='text-gold'>{i.amount} {i.withdrawal_currency}</span>
                                    </th>
                                    <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                        <span className='text-gold'>{i.date?.slice(0, 10)}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                        <span className='text-gold'>{i.confirmed ? 'Confirmed' : 'Pending'}</span>
                                    </td>
                                </tr>
                            )
                        })}
                        {data.length > 7 && (
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

export default History;
