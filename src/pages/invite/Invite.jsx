import React, { useEffect, useState } from 'react';
import GradientIcon from '../../ui/components/icons/GradientIcons';
import useAxios from '../../utils/useAxios';
import { FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import copyToClipboard from 'elastic-copy-paste';
const Invite = () => {
    const [data, setData] = useState({})
    const api = useAxios()
    const user_profile = async () => {
        try {
            const data = await api.get('/api/profile/')
            setData(data.data.profile)

        } catch (error) {
            console.log(error)
        }
    }

    function copy(textToCopy) {
        copyToClipboard(textToCopy)
            .then((success) => {
                if (success) {
                    toast.success('Reffral link copy successfully!');
                } else {
                    toast.error('Failed to copy text.');
                }
            })
            .catch((error) => {
                toast.error('Error during copy:');
            });
    }

    useEffect(() => {
        user_profile()

    }, []);
    return (
        <div className='pt-32 p-3'>
            <div className='flex justify-center pt-5'>
                <div className="w-full max-w-sm bg-card border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-10">
                        <div>
                            <p className='text-center text-gold'>Copy Link</p>
                            <p className='text-center text-gold'>{window.location.origin}/register/?reffral_code={data?.gameId}</p>
                            <div className='flex justify-center'>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault()
                                    const currentOrigin = window.location.origin;
                                    copy(`${currentOrigin}/auth/register?reffral_code=${data?.gameId}`)
                                }} className="text-sm text-gold text-opacity-90 text-center"><GradientIcon icon={FaCopy} size={20} /></a>
                            </div>
                        </div>
                        <div>
                            <p className='text-center text-gold'>Copy Code</p>
                            <p className='text-center text-gold'>{data?.gameId}</p>
                            <div className='flex justify-center'>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault()
                                    const currentOrigin = window.location.origin;
                                    copy(`${data?.gameId}`)
                                }} className="text-sm text-gold text-opacity-90 text-center"><GradientIcon icon={FaCopy} size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-gold mt-10 text-2xl text-center font-bold'>Invite Friends and Earn Rewards!</h1>
            <div className="flex mb-24 mt-10 justify-center">
                <div className="text-gold bg-card p-4 w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <p>
                            Share the excitement with your friends and earn fantastic rewards! When your friends join and make their first deposit, you'll earn a generous 5% commission. But that's not all – you'll also receive up to 0.3% of every  bet made by your referrals as a bonus! We believe in rewarding loyalty, so get ready for some extra bonuses too.
                        </p>
                        <h2 className="text-gold mt-4 mb-2">How it works:</h2>
                        <ul className="list-disc pl-6">
                            <li>Earn 5% commission on your referrals' first deposit.</li>
                            <li>Receive up to 0.3% of every bet made by your referrals as a bonus.</li>
                            <li>Receive up to 0.3% level 1 refferral and 0.2% of level 2 and 0.1 for level 3 referral's bets.</li>
                            <li>Enjoy additional bonuses as a token of appreciation.</li>
                        </ul>
                        <p className="mt-4">Invite your friends now and start earning together!</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Invite;
