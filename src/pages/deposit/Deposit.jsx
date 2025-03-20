import { useEffect } from 'react';
import React, { useState } from 'react';
import { Button, Card, Timeline } from 'flowbite-react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Modaal from '../myaccount/Modal';
import History from './History';
import DepositForm from './DepositForm';
import { useLocation } from 'react-router-dom';
import { check_deposit } from '../../utils/useUserData';
import toast from 'react-hot-toast';

const Deposit = () => {
    const [deposit, setDeposit] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [modelType, setModeltyp] = useState('bank')
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const type = queryParams.get('type');
    const { check } = check_deposit()

    useEffect(() => {
        if (type === 'history') {
            setDeposit(false)
        }
    }, [])
    return (
        <div className='p-3'>
            <div className='flex justify-center  pt-24 '>
                <a href='#' onClick={(e) => {
                    e.preventDefault()
                    setDeposit(true)
                }} className={`w-full border-2 rounded border-yellow-500 p-1  ${deposit ? 'bg-gold text-black' : 'text-gold'}`} >
                    <p className={`text-center ${deposit ? ' text-black' : 'text-gold'} `}>Deposit</p>
                </a>
                <a href='#' className={`w-full border-2 rounded border-yellow-500 p-1 ${!deposit ? 'bg-gold text-black' : 'text-gold'}`} onClick={(e) => {
                    e.preventDefault()
                    setDeposit(false)

                }}>
                    <p className={`text-center ${!deposit ? ' text-black' : 'text-gold'} `}>History</p>
                </a>

            </div>
            <div className='pt-3'>
                {
                    !deposit ? <>
                        <History />
                    </> :

                        <Timeline className='border-yellow-500 pb-32'>
                            <Timeline.Item>
                                <Timeline.Point />
                                <Timeline.Content>
                                    <Timeline.Title className='text-gold'>Bank Transfer</Timeline.Title>
                                    <Timeline.Body className='text-gold capitalize'>
                                        Here You can deposit money in banks Given here.
                                        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 py-12">
                                            <div className='  bg-card p-3           '>
                                                <div className='flex justify-center' >
                                                    <img className=' h-20   rounded' src="/images/jazz.png" alt="" />
                                                </div>
                                                <p className='     pt-2 text-center text-gold'>JazzCash</p>
                                            </div>
                                            <div className='  bg-card p-3           '>
                                                <div className='flex justify-center'>
                                                    <img className='  h-20   rounded' src="/images/easy.svg" alt="" />
                                                </div>
                                                <p className='     pt-2 text-center text-gold'>EasyPaisa</p>
                                            </div>
                                        </div>


                                    </Timeline.Body>
                                    <Button color="balck" onClick={() => {
                                        if (!check) {
                                            setOpenModal(true)
                                            setModeltyp('bank')
                                        } else {
                                            toast.error('You have already requested for deposit')
                                        }
                                    }} className='bg-gold'>
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
                                        You can deposit crypto there are Multiple crypto currrencies we accept TRX TRON, USDT BEP20
                                        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 py-12">
                                            <div className='  bg-card        p-3 '>
                                                <div className='flex justify-center'>
                                                    <img className=' h-20   rounded' src="/images/trx.png" alt="" />
                                                </div>
                                                <p className='     pt-2 text-center text-gold'>TRX TRON</p>
                                            </div>
                                            <div className='  bg-card p-3    '>
                                                <div className='flex justify-center' >
                                                    <img className=' h-20   rounded' src="/images/usdt.png" alt="" />
                                                </div>
                                                <p className='     pt-2 text-center text-gold'>USDT BEP20</p>
                                            </div>
                                        </div>
                                    </Timeline.Body>
                                    <Button color="balck" className='bg-gold' onClick={() => {
                                        if (!check) {
                                            setOpenModal(true)
                                            setModeltyp('crypto')
                                        } else {
                                            toast.error('You have already requested for deposit')
                                        }
                                    }}>
                                        View More
                                        <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                                    </Button>
                                </Timeline.Content>
                            </Timeline.Item>
                        </Timeline>}
            </div>
            <Modaal title={`${modelType == 'bank' ? 'Bank' : 'Crypto'} Deposit Options`} setOpenModal={setOpenModal} openModal={openModal} >
                <DepositForm type={modelType} />
            </Modaal>
        </div>
    );
}



export default Deposit;








