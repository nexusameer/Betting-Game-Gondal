import React, { useEffect, useState } from 'react';
import Levels from '../../ui/components/levels/Levels';
import useAxios from '../../utils/useAxios';

const Team = () => {
    const [data, setData] = useState([])
    const [level, setLeve] = useState(1)
    const [levelTeam, setLeveTeam] = useState([])
   
    const api = useAxios()
    const getTeam = async () => {
        try {
            let resp = await api.get(`api/get_team_members/`)
            setData(resp.data)
            setLeveTeam(resp.data.level_1)
            console.log(resp.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (data.length === 0) {
            getTeam()
        }
        else {
            setLeveTeam(data[`level_${level}`])
        }
    }, [level])

    return (
        <div className='pt-24'>
            <div className="relative overflow-x-auto">
                <Levels setLevel={setLeve} />
                <table className="w-full text-sm text-left rtl:text-right text-gold bg-modal">
                    <thead className="text-xs text-gold uppercase bg-card ">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-gradiant-gold">
                                Username
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
                        {levelTeam.map((i, j) => {
                           return (
                                <tr key={j} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">

                                        <span className='text-gold'>{i.user.username}</span>
                                    </th>
                                    <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                        <span className='text-gold'>{i.date_joined?.slice(0, 10)}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                        <span className='text-gold'>Active</span>
                                    </td>
                                </tr>
                            )
                        })}
                        {levelTeam.length > 7 && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>None</span>
                                </th>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>None</span>
                                </td>
                                <td className="px-6 py-4 font-medium whitespace-nowrap bg-card text-gradiant-gold">
                                    <span className='text-gold'>None</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default Team;
