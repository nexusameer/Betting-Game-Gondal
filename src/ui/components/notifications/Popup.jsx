import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { motion } from 'framer-motion';
import './modal.css'
const Popup = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentPointIndex, setCurrentPointIndex] = useState(0);
    const points = [
        "You can earn by playing our exclusive casino games and voting.We offer a wide range of roulette, casino, and poker games.",
        "Experience lightning roulette for a fast-paced gaming experience.We are partnered with some of the world's largest betting giants.",
        "Our platform provides secure and fair gaming for all players.",
        "If you lose a bet worth 100 PKR, you'll receive 1 free coin that you can use to vote.",
        "If you lose a bet worth 1 USDT, you'll receive 2.8 free coins that you can use to vote.",
        "If you lose a bet worth 1 TRX, you'll receive 0.4 free coins that you can use to vote.",
        "Points 28 to 37 will be shown in a popup window.",
        "Each vote costs one coin.",
        "The outcome of the bet will depend on the votes.",
        "Only one vote is allowed for even or odd.",
        "Only one vote is allowed for red or black.",
        "Only one vote is allowed for a single digit.",
        "You can only choose from three types of votes: even, odd, or a single digit."
    ];
    
    useEffect(() => {
        const viewed = localStorage.getItem('viewed');
        if (viewed) {
            setOpenModal(false);
        }
    }, [])

    const handleNext = () => {
        if (currentPointIndex < points.length - 1) {
            setCurrentPointIndex(prevIndex => prevIndex + 1);
        } else {
            setOpenModal(false);
            localStorage.setItem('viewed','viewed')
        }
    };

    return (
        <div className='flex justify-center '>
            <Modal className='chutti' show={openModal} onClose={() => setOpenModal(false)}>

                <Modal.Body className='bg-transparent p-0'>
                    <div className='mt-32'>
                        <div className='bg-transparent rounded-2xl'>
                            <div className='-mb-28'>
                                <div className='flex justify-center'>
                                    <img src="/popup.png" className='h-52 w-52' alt="" />
                                </div>
                            </div>
                           <div className='bg-modal rounded-2xl border-[0.2px] border-red-950 py-8 pt-24'>
                           <p className=' text-gold my-4 text-xl text-center'>WelCome To VetoGaming</p>
                            <div className="flex justify-center">
                                <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="list-disc ml-6 text-gold">
                                    <motion.li className="mb-2 text-center" key={currentPointIndex}>{points[currentPointIndex]}</motion.li>
                                </motion.ul>
                            </div>
                            <div className="flex justify-center">
                                <Button color="gray" className='bg-gold my-4 text-gradient-gold w-130' onClick={handleNext}>
                                    {currentPointIndex === points.length - 1 ? 'Close' : 'Next'}
                                </Button>
                            </div>
                           </div>
                        </div>

                    </div>
                </Modal.Body>

            </Modal>

        </div>
    );
}

export default Popup;
