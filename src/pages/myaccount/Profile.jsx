import React, { useEffect, useState } from 'react';
import GradientIcon from '../../ui/components/icons/GradientIcons';
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import { FaCamera, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import copyToClipboard from 'elastic-copy-paste';
import Modaal from './Modal';
import { GiCarWheel, GiCrownCoin, GiVote } from "react-icons/gi";
import { Button, Dropdown, Label, ListGroup } from 'flowbite-react';
import { SiTether } from "react-icons/si";
import { PiWalletLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { PiCoinsThin } from "react-icons/pi";
import { GiTeamIdea } from "react-icons/gi";
import { MdSupportAgent } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";
import { MdAccountBalance } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { HiCubeTransparent } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa6";
import { AddAccount } from '../withdraw/Withdraw';
import { logout } from '../../utils/auth';
import ChangePassword from './ChangePassword';





const Profile = () => {
    const [data, setData] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [openModel2, setOpenModel2] = useState(false)
    const [amount, setAmount] = useState(0)
    const [votes, SetVotes] = useState(0)
    const [rate, setRate] = useState({ pkr: 0, usdt: 0, trx: 0 })
    const [cost, setCost] = useState({ pkr: 0, usdt: 0, trx: 0 })
    const api = useAxios()
    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [openPasses, setOpenPasses] = useState(false)
    const [swapCurrency, setSwapCurrency] = useState('USDT')
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const user_profile = async () => {
        try {
            const data = await api.get('/api/profile/')
            setData(data.data.profile)
            setRate({ pkr: data.data.config.conversion_pkr, usdt: data.data.config.conversion_usdt, trx: data.data.config.conversion_trx })
            SetVotes(data.data.votes)
            setSelectedImage(data.data.profile.image)
        } catch (error) {
            console.log(error)
        }
    }
    const swap = async () => {
        try {
            await api.post('api/swap/', { amount: amount, currency: swapCurrency })
            toast.success('Swap Successful!')
            await user_profile()
            setOpenModel2(false)
        } catch (error) {
            console.log(error)
            toast.error('Swap Failed!')
        }
    }


    function copy(textToCopy) {
        copyToClipboard(textToCopy)
            .then((success) => {
                if (success) {
                    toast.success('Account copied successfully!');
                } else {
                    toast.error('Failed to copy text.');
                }
            })
            .catch((error) => {
                toast.error('Error during copy:');
            });
    }


    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('image', file);

            try {
                setUploading(true);

                const response = await api.post('/auth/upload_image/', formData, {
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setUploadProgress(progress);
                    },
                });
                toast.success('Image uploaded successfully');
            } catch (error) {
                console.error('Error uploading image:', error);
                toast.error('Error uploading image. Please try again.');
            } finally {
                // Reset upload progress and flag
                setUploadProgress(0);
                setUploading(false);
            }

            // Set the selected image for preview

        }
    };

    useEffect(() => {
        user_profile()

    }, []);

    const handlegamebtn = () => {
        window.location.href = '/game';
    }

    return (
        <div className='pt-20 p-3'>
            <div className='flex justify-center pt-5'>
                <div className="w-full pt-2 max-w-sm bg-card border border-yellow-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-10">
                        <div>
                            <label htmlFor="imageInput" className="relative w-24 h-24 mb-3">
                                <img
                                    className="w-28 h-28 rounded-full shadow-lg border-2 border-yellow-500"
                                    src={selectedImage || '/profile.png'}
                                    alt="Bonnie image"
                                />
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                    <div className='ml-20 mt-20'>
                                        <GradientIcon icon={FaCamera} size={20} className=' opacity-5' />
                                    </div>
                                </div>
                            </label>
                        </div>
                        <h5 className="mb-1 text-xl font-medium text-gold">{data?.user?.username}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gold">{data?.user?.email}</h5>
                        <p className='text-gold'> {data?.gameId?.slice(0, 4)}....{data?.gameId?.slice(-4)}</p>
                        <a href="#" onClick={(e) => {
                            e.preventDefault()
                            copy(data?.gameId)
                        }} className="text-sm text-gold text-opacity-90"><GradientIcon icon={FaCopy} size={20} /></a>
                        <div className="flex mt-4 md:mt-6">
                            <Link to="/bets" className="inline-flex rounded  items-center px-4 py-2 text-sm font-medium text-center bg-gold text-black">Bets</Link>
                            <Link to="/team" className="py-2 px-4 ms-2 text-sm font-mediumbg rounded bg-gold text-black">Team</Link>
                            <Link to="#" onClick={(e) => {
                                e.preventDefault();
                                setOpenModal(true)
                            }} className="py-2 rounded  px-4 ms-2 text-sm font-medium bg-gold text-black">Invite</Link>
                        </div>
                        <div className='grid mt-2 grid-cols-2 gap-4'>
                            <div className=' border-1 border-yellow-500 rounded p-2 shadow-slate-500 shadow-sm'>
                                <div className='flex justify-start  p-2'>
                                    <div className=' flex items-center'>
                                        <GradientIcon icon={SiTether} size={30} />
                                    </div>
                                    <div className=' mx-2'>
                                        <p className='text-lg text-center text-gold'>USDT</p>
                                        <p className='text-lg text-center text-gold'>${data?.balance?.USDT.balance.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' border-1 border-yellow-500 rounded p-2 shadow-slate-500 shadow-sm'>
                                <div className='flex justify-start  p-2'>
                                    <div className=' flex items-center'>
                                        <img className='h-10  w-10' src="/images/trx2.png" alt="" />
                                    </div>
                                    <div className=' mx-2'>
                                        <p className='text-lg text-center text-gold'>TRX</p>
                                        <p className='text-lg text-center text-gold'>{data?.balance?.TRX.balance.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' border-1 border-yellow-500 rounded p-2 shadow-slate-500 shadow-sm'>
                                <a className='my-4 border-1 flex justify-start  '>
                                    <div className=' flex items-center'>
                                        <p className='h-8 p-1 w-8 text-center text-black bg-gold items-center text-xs flex  font-bold border-2 rounded-full border-yellow-500 '>Rs.</p>
                                    </div>
                                    <div className=' mx-2'>
                                        <p className='text-lg text-center text-gold'>PKR</p>
                                        <p className='text-lg text-center text-gold'>{data?.balance?.PKR.balance.toFixed(2)}</p>
                                    </div>
                                </a>
                            </div>
                            <div className='border-1 border-yellow-500 rounded p-2 shadow-slate-500 shadow-sm'>
                                <a onClick={(e) => {
                                    e.preventDefault();
                                    setOpenModel2(true)
                                }} className='my-4 border-1 flex justify-start  '>
                                    <div className=' flex items-center'>
                                        <p className=''>
                                            <GradientIcon icon={GiCrownCoin} size={30} />
                                        </p>
                                    </div>
                                    <div className=' mx-2'>
                                        <p className='text-lg text-center text-gold'>vCoin</p>
                                        <p className='text-lg text-center text-gold'>{votes}</p>
                                    </div>
                                </a>
                            </div>

                        </div>
                        <div className='grid grid-cols-3  '>
                            <div className="flex mt-4 md:mt-6">
                                <Link to="/deposit" className="inline-flex rounded  items-center px-1 py-2 text-sm font-medium text-center bg-transparent border border-yellow-500 text-gold">
                                    <div className="flex justify-center">
                                        <div>
                                            <GradientIcon icon={PiWalletLight} size={25} />
                                        </div>
                                        <div className='pt-1'>
                                            Recharge
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex mt-4 md:mt-6">
                                <Link to="/withdraw" className="inline-flex rounded  items-center px-1 py-2 text-sm font-medium text-center bg-transparent border border-yellow-500 text-gold">
                                    <div className="flex justify-center">
                                        <div>
                                            <GradientIcon icon={GiMoneyStack} size={25} />
                                        </div>
                                        <div className='pt-1'>
                                            Withdraw
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex mt-4 md:mt-6" style={{
                                border: '1px solid #fbbf24',
                                borderRadius: '0.375rem',
                            }} >
                                <button className="inline-flex rounded  items-center px-1 py-2 text-sm font-medium text-center bg-transparent border border-yellow-500 text-gold"
                                   onClick={() => {handlegamebtn()}}
                                >
                                    <div className="flex justify-center">
                                        <div>
                                            <GradientIcon icon={GiCarWheel} size={20} />
                                        </div>
                                        <div className=''>
                                           <p className=' text-xs'> Play VetoGaming</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <Modaal title={'Reffer & Earn'} setOpenModal={setOpenModal} openModal={openModal} >
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
                        </Modaal>
                        {/*
                        <Modaal title={'Buy VoteCoin'} setOpenModal={setOpenModel2} openModal={openModel2} >
                            <div>
                                {Object.entries(cost).map(([currency, value]) => (
                                    <div key={currency} className='flex justify-between'>
                                        <div>
                                            <p className='text-gold'>Cost in {currency.toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className='text-gold'>{value.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="votes" value="Votes Amount" className='text-gold' />
                                </div>
                                <input type="number" onChange={(e) => {
                                    let cost_pkr = e.target.value / rate.pkr
                                    let cost_usdt = e.target.value / rate.usdt
                                    let cost_trx = e.target.value / rate.trx
                                    setAmount(e.target.value)
                                    setCost({ pkr: cost_pkr, usdt: cost_usdt, trx: cost_trx })
                                }} id="votes" className="border border-yellow-500  text-sm rounded-lg block w-full p-2.5 text-gold" placeholder="Amount You wanna Buy" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="ssss" value="Currency" className='text-gold' />
                                </div>
                                <select id='ssss' onChange={(e) => {
                                    setSwapCurrency(e.target.value)
                                }} className="border border-yellow-500  text-sm rounded-lg block w-full p-2.5 text-yellwo-500 bg-card text-yellow-500">
                                    <option className='text-gold bg-card text-yellow-500 hover:bg-black' value="USDT" defaultValue={true}>USDT</option>
                                    <option className='text-gold bg-card text-yellow-500 hover:bg-black' value="PKR" defaultValue={true}>PKR</option>
                                    <option className='text-gold bg-card text-yellow-500 hover:bg-black' value="TRX" defaultValue={true}>TRX</option>
                                </select>

                            </div>
                            <Button
                                className="bg-gold text-black"
                                type="submit"
                                onClick={(e) => {
                                    swap()

                                }}>
                                Next
                            </Button>
                            </Modaal> */}
                        <Modaal title={'Change Password'} setOpenModal={setOpenPasses} openModal={openPasses}>
                            <ChangePassword />
                        </Modaal>
                        <AccountSetup data={data} open={open} setOpen={setOpen} />
                    </div>
                </div>
            </div>
            <Links setOpen={setOpen} setOpenPasses={setOpenPasses} setOpenModel2={setOpenModel2} />

        </div>

    );
}


const SidebarItem = ({ link, label, icon, isEven, setOpen, setOpenPasses, setOpenModel2 }) => (
    <Link to={link} onClick={(e) => {
        if (label === 'Accounts') {
            e.preventDefault();
            setOpen(true);
        }
        if (label === 'Change Password') {
            e.preventDefault();
            setOpenPasses(true)
        }
        if (label === 'Logout') {
            e.preventDefault();
            logout();
        }
        // if (label === 'Buy VotCoin') {
        //     e.preventDefault();
        //     setOpenModel2(true)
        // }
    }} className={`py-2 px-2 ${isEven ? 'bg-[#1b1818]' : 'bg-modal'} hover:bg-black `}>
        {icon && (
            <div className='flex justify-start items-center'>
                <div className='mr-4'>
                    <GradientIcon icon={icon} size={20} />
                </div>
                <div className='text-gold'>{label}</div>
            </div>
        )}
        <p className='hover:bg-black dark:hover:bg-black'></p>
    </Link>
);

const Links = ({ setOpen, setOpenPasses, setOpenModel2 }) => {
    const menuItems = [
        { link: '/bonus', label: 'Bonus', icon: PiCoinsThin },
        { link: '/invite', label: 'Referral', icon: GiTeamIdea },
        { link: '/contact', label: 'Contact', icon: MdSupportAgent },
        { link: '#', label: 'Change Password', icon: FaUserLock },
        { link: '#', label: 'Accounts', icon: MdAccountBalance },
        { link: '/deposit?type=history', label: 'Deposit History', icon: GiWallet },
        // { link: '#', label: 'Buy VotCoin', icon: GiCrownCoin },
        { link: '/withdraw?type=history', label: 'Withdraw History', icon: BiMoneyWithdraw },
        { link: '/bets', label: 'Bets History', icon: HiCubeTransparent },
        { link: '/votehistory', icon: GiVote, label: 'Vote History' },
        { link: '#', label: 'Logout', icon: FaPowerOff },
    ];

    return (
        <div className='flex justify-center'>
            <div className="w-full mt-5 max-w-sm   mb-20 border-2 border-[#1b1818]">
                <div className="w-full bg-modal border-none text-gold text-md">
                    {menuItems.map((item, index) => (
                        <SidebarItem setOpenModel2={setOpenModel2} setOpenPasses={setOpenPasses} setOpen={setOpen} key={index} {...item} isEven={index % 2 === 0} />
                    ))}
                </div>
            </div>
        </div>
    );
};




const AccountSetup = ({ open, setOpen, data }) => {

    const [type, setType] = useState('crypto')
    return (
        <div>
            <Modaal openModal={open} title={'Account Setup'} setOpenModal={setOpen} >
                <div className="grid grid-cols-3 border rounded border-yellow-500">
                    <div className={`border border-yellow-500 rounded p-1 ${type == 'view' ? 'bg-gold text-black' : "text-gold"}`} onClick={() => {
                        setType('view')
                    }}>
                        View
                    </div>
                    <div className={`border border-yellow-500 rounded p-1 ${type == 'crypto' ? 'bg-gold text-black' : "text-gold"}`} onClick={() => {
                        setType('crypto')
                    }}>
                        Crypto Setup
                    </div>
                    <div className={`border border-yellow-500 rounded p-1 ${type == 'bank' ? 'bg-gold text-black' : "text-gold"}`} onClick={() => {
                        setType('bank')
                    }}>
                        Bank Setup
                    </div>

                </div>
                {type == 'view' ?
                    <div>
                        <div>
                            <h2 className='text-gold text-center mt-2 '>Bank Details</h2>
                            <div className='flex justify-between'>
                                <div className='text-gold'>
                                    Bank Name
                                </div>
                                <div className='text-gold'>
                                    {data?.bank_name ?? ''}
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-gold'>
                                    Owner Name
                                </div>
                                <div className='text-gold'>
                                    {data?.owner_name ?? ''}
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-gold'>
                                    Bank Account
                                </div>
                                <div className='text-gold'>
                                    {data?.bank_account ?? ''}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-gold text-center mt-2 '>Crypto Details</h2>
                            <div className='flex justify-between'>
                                <div className='text-gold'>
                                    Address
                                </div>
                                <div className='text-gold'>
                                    {data?.crypto_address?.slice(0, 5) ?? ''}...{data?.crypto_address?.slice(-5) ?? ''}
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-gold'>
                                    Network
                                </div>
                                <div className='text-gold'>
                                    {data?.network ?? ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <AddAccount type={type} />
                }
            </Modaal>
        </div>
    );
}




export default Profile;
