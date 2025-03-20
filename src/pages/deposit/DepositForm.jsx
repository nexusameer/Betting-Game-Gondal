import React, { useEffect, useState } from 'react';
import { Button, Card, Label, Spinner } from 'flowbite-react';
import Timer from '../../ui/components/timer/Timer';
import toast from 'react-hot-toast';
import copyToClipboard from 'elastic-copy-paste';
import { FaRegCopy } from 'react-icons/fa';
import GradientIcon from '../../ui/components/icons/GradientIcons';
import { GiCrossedSabres } from 'react-icons/gi';
import axios from 'axios';
import useAxios from '../../utils/useAxios';
import { data } from 'autoprefixer';

const DepositComponent = ({ data, setShowAccount, type, setFinal, network }) => {
    const [cryptoPrices, setCryptoPrices] = useState({});
    const [cyptoamount, setCryptoAmount] = useState(0);
    const [currency, setCurrency] = useState('PKR');
    const api = useAxios();

    async function getPKRtoPrices() {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'tron,tether',
                    vs_currencies: 'usd',
                },
            });

            if (response.data.tron && response.data.tether) {
                const usdToTRXPrice = response.data.tron.usd ;
               
                const usdToUSDTPrice = response.data.tether.usd;
                 let trxPrice=  usdToUSDTPrice/usdToTRXPrice;
                // price setup
                // Set the prices in your state or wherever you need them
                setCryptoPrices({ trx: trxPrice, usdt: usdToUSDTPrice });
                
            } else {
                console.log('Unable to fetch prices.');
            }
        } catch (error) {
            console.error('Error fetching prices:', error.message);
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

    useEffect(() => {
        getPKRtoPrices();
    }, []);

    return (
        <div>
            <Card className="max-w-sm bg-card">
                <div className='flex justify-end'>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setShowAccount(false);
                        setFinal(false);
                        localStorage.removeItem(`${type.type}-deposit`);
                    }} className='border-2 border-yellow-500 rounded p-1'>
                        <GradientIcon icon={GiCrossedSabres} />
                    </a>
                </div>
                <h5 className="text-2xl font-bold tracking-tight text-gold">
                    A Deposit Created Please Deposit funds within Given Time
                </h5>
                <p className="font-normal text-gold">Amount:{type.type === 'bank' ? 'PKR' : network === 'USDT' ? "$" :  'TRX' }{data.amount}</p>
                {data.account_name && (
                    <p className="font-normal text-gold">Amount Name: {data.account_name}</p>
                )}
                {type.type === 'crypto' ? (
                    network === 'USDT' ? (
                        <p className="font-normal text-gold">
                            <p>{data.account_network}</p>
                            {data.account_address}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                copy(`${data.account_address}`);
                            }}>
                                <GradientIcon icon={FaRegCopy} />
                            </a>{' '}
                        </p>
                    ) : (
                        <p className="font-normal text-gold">
                            <p>{data.account_network}</p>
                            {data.account_address}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                copy(`${data.account_address}`);
                            }}>
                                <GradientIcon icon={FaRegCopy} />
                            </a>
                        </p>
                    )
                    // <>
                    //     <p className="font-normal text-gold">
                    //         USDT BEP20({(cryptoPrices.usdt * data.amount).toFixed(2)}):
                    //         0xa35F79FF60DA5aD36586C5428d39e1C0cB72890e{' '}
                    //         <a href="#" onClick={(e) => {
                    //             e.preventDefault();
                    //             copy('0xa35F79FF60DA5aD36586C5428d39e1C0cB72890e');
                    //         }}>
                    //             <GradientIcon icon={FaRegCopy} />
                    //         </a>{' '}
                    //     </p>
                    //     <p className="font-normal text-gold">
                    //         TRX TRC20({(cryptoPrices.trx * data.amount).toFixed(2)}): La35F79FF60DA5aD36586C5428d39e1C0cB72890e{' '}
                    //         <a href="#" onClick={(e) => {
                    //             e.preventDefault();
                    //             copy('L35F79FF60DA5aD36586C5428d39e1C0cB72890e');
                    //         }}>
                    //             <GradientIcon icon={FaRegCopy} />
                    //         </a>
                    //     </p>
                    // </>
                ) : (
                    <>
                        <p className="font-normal bg-[#006eff]">Account: {data.account}</p>
                        <p className="font-normal text-gold">Bank: {data.type}{' '}
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                copy(data.account);
                            }}>
                                <GradientIcon icon={FaRegCopy} />
                            </a>
                        </p>
                        <p className="font-normal text-gold">Name: {data.name}</p>
                    </>
                )}
                <Timer initialMinutes={data.min} initialSeconds={data.sec} />
                <Button
                    className='bg-gold text-black '
                    type="submit"
                    onClick={() => {
                        let prevdata = localStorage.getItem('deposit');
                        let newdata = { ...JSON.parse(prevdata), cryptoPrices: cryptoPrices };
                        localStorage.setItem('deposit', JSON.stringify(newdata));
                        setFinal(true);
                    }}>
                    Upload Reciept
                </Button>
            </Card>
        </div>
    );
};

const DepositForm = (type) => {
    const [showAccount, setShowAccount] = useState(false);
    const [data, setData] = useState({});
    const [final, setFinal] = useState(false);
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(false);
    const [network, setNetwork] = useState('USDT');
    const api = useAxios();

    function timer(oldTimestamp) {
        const currentTimestamp = Date.now();
        const timeDifference = oldTimestamp - currentTimestamp;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);
        return { min: minutesDifference, sec: secondsDifference };
    }

    function check() {
        const deposit = localStorage.getItem(`${type.type}-deposit`);
        if (deposit !== null) {
            const deposited = JSON.parse(deposit);
            const timestamp = deposited.timestamp;
            const time = Date.now();
            if (timestamp > time) {
                const { min, sec } = timer(timestamp);
                if (deposited.type === type, type) {
                    setData({ ...deposited, min, sec, amount: data?.amount });
                    setShowAccount(true);
                }

            } else {
                localStorage.removeItem('deposit');
            }

        }
    }


    const getAvailableAccounts = async () => {
       
        setLoading(true);
        try {
            var currentTimestamp;
            if (type.type === 'crypto') {
                currentTimestamp = Date.now() + 15 * 60 * 1000;
            } else {
                currentTimestamp = Date.now() + 5 * 60 * 1000;
            }
            if(type.type === 'crypto'){
                if (network === "USDT") {
                    const cryptoaccount = await api.get(`/api/available-accounts/crypto/usdt/${data?.amount}/`);
                    setAccount(cryptoaccount.data);
                    const cryptoData = {
                        ...cryptoaccount.data,
                        amount: data.amount,
                        timestamp: Date.now() + 15 * 60 * 1000,
                    }
                    localStorage.setItem(`${type.type}-deposit`, JSON.stringify(cryptoData));
                    check();
                } else if (network === "TRX") {
                    const cryptoaccount = await api.get(`/api/available-accounts/crypto/trx/${data?.amount}/`);
                    setAccount(cryptoaccount.data);
                    const cryptoData = {
                        ...cryptoaccount.data,
                        timestamp: Date.now() + 15 * 60 * 1000,
                    }
                    localStorage.setItem(`${type.type}-deposit`, JSON.stringify(cryptoData));
                    check();
                }
                    
            } else {
                const acdata = await api.get(`/api/available-accounts/${data?.amount}/`);
                setAccount(data.data);
                
                const depositData = {
                    ...data,
                    timestamp: currentTimestamp,
                    account: acdata?.data?.account_number,
                    type: acdata?.data?.account_company,
                    name: acdata?.data?.account_name,

                };
                localStorage.setItem(`${type.type}-deposit`, JSON.stringify(depositData));
                check();
            }
        } catch (error) {
            console.log(error);
            toast.error('No Account available');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        check();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center">
                    <Spinner className='text-yellow-500' />

                </div>
            ) : (
                <>
                    {showAccount ? (
                        <>
                            {final ? (
                                <UploadReceipt setFinal={setFinal} type={type} setShowAccount={setShowAccount} network={network} data={data} />
                            ) : (
                                <DepositComponent type={type} data={data} setShowAccount={setShowAccount} setFinal={setFinal} network={network}/>
                            )}
                        </>
                    ) : (
                        <form className="flex max-w-md flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Amount" value="Deposit Amount" className="text-gold" />
                                </div>
                                <input
                                    type="number"
                                    id="Amount"
                                    className="border border-yellow-500 text-sm rounded-lg block w-full p-2.5 text-gold"
                                    placeholder="Enter Amount To Deposit"
                                    onChange={(e) => {
                                        if (e.target.value === '') {
                                            toast.error('Please Enter Amount');
                                            return;
                                        }
                                        setData({ ...data, amount: e.target.value });
                                    }}
                                    required
                                />
                            </div>
                            {type.type === 'crypto' && (
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="repeat-password" value="Select Network" className='text-gold' />
                                    </div>
                                    <select
                                        onChange={(e) => setNetwork(e.target.value)}
                                        id="countries"
                                        className="border border-yellow-500 bg-card  text-sm rounded-lg block w-full p-2.5 text-yellow-500">
                                        <option className='text-yellow-500' defaultValue={true}>Choose a Network</option>
                                        <option className='text-yellow-500 bg-card' value="USDT">USDT BEP20</option>
                                        <option className=' text-yellow-500 bg-card' value="TRX">TRX TRON</option>
                                    </select>
                                </div>
                            )}
                            <Button
                                className="bg-gold text-black"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (data.amount === undefined) {
                                        toast.error('Please Enter Amount');
                                        return;
                                    } else if (type.type === 'bank' && data.amount < 1000) {
                                        toast.error('Minimum deposit amount is 1000');
                                        return;
                                    } else if (type.type === 'crypto' && network === 'USDT' && data.amount < 5) {
                                        toast.error('Minimum deposit amount is 5');
                                        return;
                                    } else if (type.type === 'crypto' && network === 'TRX' && data.amount < 30) {
                                        toast.error('Minimum deposit amount is 30');
                                        return;
                                    } else {
                                        getAvailableAccounts();
                                    }
                                }}>
                                Next
                            </Button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

const UploadReceipt = ({ type, setShowAccount, network, data }) => {
    const [receipt, setReceipt] = useState('');
    const [loading, setLoading] = useState(false);
    const api = useAxios();

    const createDeposit = async () => {
        setLoading(true);
        try {
            if (receipt === '') {
                toast.error('Please Select Receipt');
                return;
            }
            if (type.type === 'crypto' && network == 'PKR'  ) {
                toast.error('Please Select Network');
                return
            }
            let presentData = localStorage.getItem(`${type.type}-deposit`);
            presentData = JSON.parse(presentData);
            console.log(presentData);

            const jsonData = {
                account_number: presentData.account ? presentData.account : data.account_address,
                amount: presentData.amount ? presentData.amount : data.amount,
                source: 'Pakistan',
                deposit_currency: type.type === 'bank' ? 'PKR' : network === 'USDT' ? 'USDT' : 'TRX',
                crypto_amount: presentData.amount,
                deposit_reciept: receipt,
                currency: network
            };
            console.log(jsonData);

            const formData = new FormData();
            for (const key in jsonData) {
                if (jsonData.hasOwnProperty(key)) {
                    const value = jsonData[key];
                    formData.append(key, value);
                }
            }

            const response = await api.post('api/create-deposit/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            toast.success('Deposited successfully');
            localStorage.removeItem('deposit');
            setShowAccount(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.response?.data?.error || 'Unknown error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Amount" value="Upload Receipt" className="text-gold" />
                    </div>
                    <input
                        type="file"
                        id="Amount"
                        className="hidden" // Hide the default file input style
                        accept="image/*" // Only allow image files
                        onChange={(e) => {
                            // Handle the selected image file
                            const selectedFile = e.target.files[0];
                            setReceipt(selectedFile);
                            console.log(selectedFile);
                        }}
                        required
                    />

                    <label
                        htmlFor="Amount"
                        className="cursor-pointer border border-yellow-500 text-sm rounded-lg block w-full p-2.5 text-gold text-center"
                    >
                        Select Receipt
                    </label>
                </div>
                
                <Button
                    className="bg-gold text-black"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        createDeposit();
                    }}
                    disabled={loading}
                >
                    {loading ? <Spinner className='text-yellow-500' /> : 'Submit'}
                </Button>
            </form>
        </div>
    );
};

export default DepositForm;
