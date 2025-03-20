import React from 'react';
import Sliders from '../../ui/components/slider/Sliders';
import GradientIcon from '../../ui/components/icons/GradientIcons';
import { FaWhatsapp } from 'react-icons/fa';
import { BiChat } from 'react-icons/bi';
import { SiLivechat } from 'react-icons/si';
import { useWhastapp } from '../../utils/useUserData';

const Contact = () => {

    const { whatsappData, loading, error } = useWhastapp();
    const message = 'Hello, I need help with my account.';

    return (
        <div>
            {/* <Sliders/>
             <marquee  direction="left" scrolldelay="0">
                <p className='capitalize mt-12 text-yellow-500'>
                    You can deposit using JazzCash 💸, EasyPaisa 💳, USDT (BEP20) 💵, and TRX (TRC20) 💰. Get a bonus of 5% extra on your first deposit! Also, earn by voting 🗳️ and through our referral system 🔄. Get 5% of your referral's deposit. Play and earn! Vote and earn! 🎮📈
                </p>
            </marquee> */}
            {/* Container for demo purpose */}
            <div className="container pt-24 mx-auto md:px-6">
                {/* Section: Design Block */}
                <section className="mb-32">
                    <div className="flex justify-center">
                        <div className="text-center pt-20 md:max-w-xl lg:max-w-3xl">
                            <h2 className="mb-12 px-6 text-3xl  font-bold text-gold ">Contact us</h2>
                        </div>
                    </div>
                    <div className="flex  justify-center p-4">
                        <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                            <div className="flex flex-wrap">
                                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                                <GradientIcon icon={FaWhatsapp} />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold text-gold">
                                                Any kind of Queries
                                            </p>
                                            <p className="text-neutral-500 text-gold">
                                                support@example.com
                                            </p>
                                            <p className="text-neutral-500 text-gold">
                                                <button className="bg-primary-100 text-primary p-2 rounded-md"
                                                    onClick={() => {window.open(`https://wa.me/${whatsappData}?text=${message}`, '_blank')}}
                                                >
                                                    Click here
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                    <div className="align-start flex">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                                <GradientIcon icon={FaWhatsapp} />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold text-gold">Deposit Queries</p>
                                            <p className="text-neutral-500 text-gold">
                                                support@vetogaming.com
                                            </p>
                                            <p className="text-neutral-500 text-gold">
                                                <a href="#" target="_blank" rel="noopener noreferrer">
                                                    Click ere
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                                <GradientIcon icon={BiChat} />
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold text-gold">
                                               Live Chat
                                            </p>
                                            <p className="text-neutral-500 text-gold">
                                                support@vetogaming.com
                                            </p>
                                            <p className="text-neutral-500 text-gold">
                                                <button className="bg-primary-100 text-primary p-2 rounded-md"
                                                    onClick={() => {window.location.href = '/chat'}}
                                                >
                                                    Chat Now
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </section>
                {/* Section: Design Block */}
            </div>
            {/* Container for demo purpose */}
        </div>

    );
}

export default Contact;
