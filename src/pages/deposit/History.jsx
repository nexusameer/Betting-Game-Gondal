import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
const History = () => {
    const [history,setHistory]=useState([])
    const api=useAxios();
    const getHistory=async()=>{
        try {
            let resposne=await api.get('api/deposit-history/')
            setHistory(resposne.data)
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(() =>{
    getHistory()
    },[])
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
                        {history.map((item,index)=>{
                        return(
                            <tr key={index}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">

                                <span className='text-gold'>{item.amount} {item.deposit_currency}</span>
                            </th>
                            <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                <span className='text-gold'>{item.date.slice(0,11)}</span>
                            </td>
                            <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                <span className='text-gold'>{item.confirmed?'Confirmed':'Pending'}</span>
                            </td>
                        </tr>
                        )
                        })}
                       
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default History;
