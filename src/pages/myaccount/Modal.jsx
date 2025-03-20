
import { Button, Card, Modal } from 'flowbite-react';
import { useState } from 'react';
import GradientIcon from '../../ui/components/icons/GradientIcons';
import { FaCopy } from 'react-icons/fa';

function Modaal({ openModal, setOpenModal, children, title }) {

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className='bg-modal'><span className=' text-gold'>{title}</span></Modal.Header>
                <Modal.Body className='bg-modal'>
                    <div className="space-y-6 ">
                        {children}
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg-modal'>
                    <Button color="gray" className='bg-gold text-gradient-gold' onClick={() => setOpenModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modaal;