import React, { useEffect, useState } from 'react';
import { Button, Card, Timeline, Checkbox, Label, TextInput, Spinner } from 'flowbite-react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Modaal from '../myaccount/Modal';
import History from './History';
import useAxios from '../../utils/useAxios';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
const WithDraw = () => {
    const [withdraw, setWithdraw] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [balance, setBalance] = useState(0)
    const [config, setConFIG] = useState({});
    const [bankaccount, setBankAccount] = useState(false)
    const [cryptoAccount, setCryptoAccount] = useState(false)
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const type = queryParams.get('type');
    const [bal, Setbal] = useState({ balance_usdt: 0, balance_trx: 0 })
    const api = useAxios()
    const getBalance = async () => {
        let data = await api.get('/api/balance/')
        let balance = data.data.balance.balance
        let config = data.data.config
        setBalance(balance)
        setConFIG(config)
        Setbal({ balance_usdt: data.data?.balance_usdt?.balance, balance_trx: data.data.balance_trx.balance})
        if (data?.data?.accounts?.bank_account != null) {
            setBankAccount(true)
        }
        if (data?.data?.accounts?.crypto_address != null) {
            setCryptoAccount(true)
        }
    }


    useEffect(() => {
        if (type == 'history') {
            setWithdraw(false)
        }
        getBalance()

    }, [])
    return (
        <div className='p-3'>
            <div className='flex justify-center pt-24 '>
                <a
                    href='#'
                    onClick={(e) => {
                        e.preventDefault();
                        setWithdraw(true);
                    }}
                    className={`w-full border-2 duration-700 ease-in-out rounded border-yellow-500 p-1 ${withdraw ? 'bg-gold text-black' : 'text-gold'}`}
                >
                    <p className={`text-center ${withdraw ? ' text-black' : 'text-gold'} `}>Withdraw</p>
                </a>
                <a
                    href='#'
                    className={`w-full duration-700 ease-in-out border-2 rounded border-yellow-500 p-1 ${!withdraw ? 'bg-gold text-black' : 'text-gold'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setWithdraw(false);
                    }}
                >
                    <p className={`text-center ${!withdraw ? ' text-black' : 'text-gold'} `}>History</p>
                </a>
            </div>

            <div className='pt-3'>
                {!withdraw ? (
                    <>
                        <History />
                    </>
                ) : (
                    <Timeline className='border-yellow-500'>
                        <Timeline.Item>
                            <Timeline.Point />
                            <Timeline.Content>
                                <Timeline.Title className='text-gold'>Bank Transfer</Timeline.Title>
                                <Timeline.Body className='text-gold capitalize'>
                                    Here, you can withdraw money using your Native bank, EasyPaisa, or JazzCash.
                                </Timeline.Body>
                                <Button color="black" onClick={() => setOpenModal2(true)} className='bg-gold'>
                                    View More
                                    <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                                </Button>
                            </Timeline.Content>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Timeline.Point />
                            <Timeline.Content>
                                <Timeline.Title className='text-gold'>Crypto</Timeline.Title>
                                <Timeline.Body className='text-gold capitalize'>
                                    You can withdraw cryptocurrencies. in TRX trc20, & USDT bep20.
                                </Timeline.Body>
                                <Button color="black" className='bg-gold' onClick={() => {
                                    setOpenModal(true);
                                }}>
                                    View More
                                    <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                                </Button>
                            </Timeline.Content>
                        </Timeline.Item>
                    </Timeline>
                )}
            </div>

            <Modaal title={'Withdrawal In Crypto'} setOpenModal={setOpenModal} openModal={openModal}>
                {cryptoAccount ?
                    <CryptoForm bal={bal} config={config} /> :
                    <AddAccount setAccountAdded={setCryptoAccount} type="crypto" />
                }
            </Modaal>
            <Modaal title={'Withdrawal In Bank'} setOpenModal={setOpenModal2} openModal={openModal2}>
                {bankaccount ?
                    <BnakForm balance={balance} config={config} /> :
                    <AddAccount setAccountAdded={setBankAccount} type="bank" />
                }
            </Modaal>
        </div>
    );
};



export default WithDraw;













function CryptoForm({ bal, config }) {
    const [remaining, setRemainig] = useState(0)
    const [amount, setAmount] = useState(0)
    const [Currency, setCurrency] = useState('USDT')

    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const api = useAxios()
    const createWithdraw = async () => {
        try {
            let data = {
                amount: amount,
                account_type: 'crypto',
                currency: Currency
            }
            let resp = await api.post('/api/create-withdrawal/', data)
            toast.success("Successfully created withdraw")
        } catch (error) {
            toast.error(error.response.data.error || "Unablle to withdraw Please Try again")
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    return (
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className='flex justify-between'>
                    <div className="mb-2 block text-gold">
                        BALANCE {Currency}
                    </div>
                    <div className="mb-2 block text-gold">
                    {Currency=='USDT'?'$':'TRX'} {Currency == 'USDT' ? bal.balance_usdt : bal.balance_trx}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="mb-2 block text-gold">
                        REMAININGG BALANCE
                    </div>
                    <div className="mb-2 block text-gold">
                    {Currency=='USDT'?'$':'TRX'} {remaining.toFixed(2)}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="mb-2 block text-gold">
                        FEE
                    </div>
                    <div className="mb-2 block text-gold">
                    {Currency=='USDT'?'$':'TRX'} {(amount * (config.crypto_fee / 100)).toFixed(2)}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="mb-2 block text-gold">
                        MNIMUM WITHDRAW
                    </div>
                    <div className="mb-2 block text-gold">
                        {Currency=='USDT'?'$':'TRX'} {config[`minimum_withdrawal_${Currency.toLowerCase()}`]}
                    </div>
                </div>
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email2" value="Withdraw Amount" className='text-gold' />
                </div>
                <input type="number" onChange={(e) => {
                    setAmount(e.target.value)
                    let rem = bal[`${minimum_withdrawal}${Currency.toLowerCase()}`] - e.target.value
                    if (rem <= 0) {
                        setRemainig(0)
                        setDisabled(true)
                    }
                    else {
                        setRemainig(rem)
                        setDisabled(false)
                    }
                }} id="email" className="border border-yellow-500  text-sm rounded-lg block w-full p-2.5 text-gold" placeholder="Withdraw Amount" required />
            </div>
            <div className=" -">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Select Network" className='text-gold' />
                    </div>
                    <select
                        onChange={(e) => setCurrency(e.target.value)}
                        id="countries"
                        className="border border-yellow-500 bg-card  text-sm rounded-lg block w-full p-2.5 text-yellow-500">
                        <option className='text-yellow-500' defaultValue={true}>Choose a Network</option>
                        <option className='text-yellow-500 bg-card' value="USDT">USDT BEP20</option>
                        <option className=' text-yellow-500 bg-card' value="TRX">TRX TRON</option>
                    </select>
                </div>
            </div>
            <Button className='bg-gold text-black' onClick={(e) => {
                e.preventDefault();
                createWithdraw()
            }} type="submit">
                {loading ? <Spinner className='text-black' /> : 'Submit'}
            </Button>
        </form>
    );
}





function BnakForm({ balance, config }) {
    const [remaining, setRemainig] = useState(balance)
    const [amount, setAmount] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const api = useAxios()
    const createWithdraw = async () => {
        setLoading(true)
        try {
            let data = {
                amount: amount,
                account_type: 'bank',
                currency: 'PKR'
            }
            let resp = await api.post('/api/create-withdrawal/', data)
            toast.success("Successfully created withdraw")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error || "Unable to withdraw please try again")
        } finally {
            setLoading(false);
        }

    }
    return (
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className='flex justify-between'>
                    <div className="mb-2 block text-gold">
                        BALANCE
                    </div>
                    <div className="mb-2 block text-gold">
                        {balance}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className="mb-2 block text-gold">
                        REMAININGG BALANCE
                    </div>
                    <div className="mb-2 block text-gold">
                        RS.{remaining}
                    </div>
                </div>
                
                <div className='flex justify-between'>
                    <div className="mb-2 block text-gold">
                        MNIMUM WITHDRAW
                    </div>
                    <div className="mb-2 block text-gold">
                        RS.{config?.minimum_withdrawal}
                    </div>
                </div>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="amount" value="Withdraw Amount" className='text-gold' />
                </div>
                <input type="number" onChange={(e) => {
                    let rem = balance - e.target.value
                    setAmount(e.target.value)
                    if (rem <= 0) {
                        setRemainig(0)
                        setDisabled(true)
                    }
                    else {
                        setRemainig(rem)
                        setDisabled(false)
                    }
                }} id="amount" className="border border-yellow-500  text-sm rounded-lg block w-full p-2.5 text-gold" placeholder="Withdraw Amount" required />
            </div>


            <Button className='bg-gold text-black' onClick={(e) => {
                e.preventDefault();
                createWithdraw()
            }} type="submit" disabled={disabled || loading}>
                {loading ? <Spinner className='text-black' /> : 'Submit'}
            </Button>
        </form>
    );
}





export const AddAccount = ({ type, setAccountAdded }) => {
    const { handleSubmit, control, register, setValue, watch } = useForm();
    const api = useAxios();

    // Detect wallet format based on the entered address
    const detectWalletFormat = (address) => {
        const mainnetRegex = /^T[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{33}$/;
        let trx = mainnetRegex.test(address)
        const regex = /^(0x)?[0-9a-fA-F]{40}$/;
        let bep20 = regex.test(address);

        return bep20 ? 'BEP20' : trx ? 'TRX' : 'Please add a valid  TRX or BEP20  address';
    };

    const onSubmit = async (data) => {
        try {
            await api.post('/api/account/', data);
            toast.success('Added account successfully');
            setAccountAdded(true);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    // Watch for changes in the crypto_address field
    const watchCryptoAddress = watch('crypto_address', '');

    // Detect wallet format and set it to the format field
    React.useEffect(() => {
        const walletFormat = detectWalletFormat(watchCryptoAddress);
        setValue('wallet_format', walletFormat);
    }, [watchCryptoAddress, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {type === 'crypto' ? (
                <>
                    <div>
                        <label htmlFor="crypto_address" className="text-gold">
                            Crypto Address
                        </label>
                        <Controller
                            name="crypto_address"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Crypto Address is required',
                                validate: (value) =>
                                    detectWalletFormat(value) === 'TRX' || detectWalletFormat(value) === 'BEP20' ||
                                    'Please enter a valid TRX address',
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="border border-yellow-500 text-sm rounded-lg block w-full p-2.5 text-gold"
                                    placeholder="Crypto Address"
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor="wallet_format" className="text-gold">
                           Network Selection
                        </label>
                        <input
                            type="text"
                            readOnly
                            {...register('wallet_format')}
                            className="border border-yellow-500 text-sm rounded-lg block w-full p-2.5 text-gold"
                        />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <label htmlFor="bank_account" className="text-gold">
                            Bank Account
                        </label>
                        <Controller
                            name="bank_account"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Bank Account is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="border border-yellow-500 text-sm rounded-lg block w-full p-2.5 text-gold"
                                    placeholder="Bank Account"
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor="bank_name" className="text-gold">
                            Bank Name
                        </label>
                        <Controller
                            name="bank_name"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Bank Name is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="border border-yellow-500 text-sm rounded-lg block w-full p-2.5 text-gold"
                                    placeholder="Bank Name"
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor="owner_name" className="text-gold">
                            Owner Name
                        </label>
                        <Controller
                            name="owner_name"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Owner Name is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="border border-yellow-500 text-sm rounded-lg block w-full p-2.5 text-gold"
                                    placeholder="Owner Name"
                                />
                            )}
                        />
                    </div>
                </>
            )}
            <Button type="submit" className="bg-gold mt-5 text-black">
                Submit
            </Button>
        </form>
    );
}





