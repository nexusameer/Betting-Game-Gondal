import React, {useState, useEffect} from 'react';
import Levels from '../../ui/components/levels/Levels';
import { useUserBonus } from '../../utils/useUserData';

const Bonus = () => {
    const { userBonu, loading, error } = useUserBonus();
    const [level, setLevel] = useState(1)
    const [levelTeam, setLevelTeam] = useState([])

    useEffect(() => {
        if (userBonu !== null) {
            setLevelTeam(userBonu.filter((i) => i.level === `level_${level}`))
        }
    }, [level, userBonu])

    return (
        <div className='pt-24'>
            <div className="relative overflow-x-auto">
                <Levels setLevel={setLevel} />
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
                                User
                            </th>
                            <th scope="col" className="px-6 py-3 text-gradiant-gold">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-card text-gradiant-gold">
                        {levelTeam && levelTeam.map((bonus, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{bonus?.amount}</span>
                                </th>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{bonus?.currency}</span>
                                </td>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{bonus?.giver}</span>
                                </td>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>{bonus?.date}</span>
                                </td>
                            </tr>
                        ))}
                        {levelTeam.length > 7 && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>...</span>
                                </th>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>...</span>
                                </td>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>...</span>
                                </td>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>...</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default Bonus;

