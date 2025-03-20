import Sidebar from './Sidebar'
import GradientIcon from '../icons/GradientIcons';
import { Link } from 'react-router-dom';
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useAuthStore } from '../../../store/auth';
import { useWhastapp } from '../../../utils/useUserData';

const Navbar = () => {

  const { whatsappData, loading, error } = useWhastapp();
  const message = 'Hello, I need help with my account.';

  const handleWhatsAppBtn = () => {
    window.open(`https://wa.me/${whatsappData}?text=${message}`, '_blank');
  }

  const loggedIn = useAuthStore((state) => state.isLoggedIn)();
  return (
    <nav className="flex nav-bg fixed z-50 items-center w-full justify-between px-5 py-2 border-b-2 border-zinc-800 " >
      <div className="flex items-center gap-3">
        <Sidebar />

      </div>
      <div className='flex justify-end'>
       {loggedIn &&
       <>
        <Link
          className="flex items-center gap-2 px-4 py-2 "
          to="/chat"
        >
          <div>
            <img src="/live.png" alt="" className=' h-10 w-10' />
            <p className='text-center text-sm -pl-2 text-gold'>LiveChat</p>
          </div>
        </Link>
        <button
          className="flex items-center gap-2 px-4 py-2 "
          onClick={() => {handleWhatsAppBtn()} }
        >
          <div className='flex flex-col items-center py-2'> 
            <GradientIcon icon={FaWhatsapp} size={30} />
            <p className='text-center text-sm -pl-2 text-gold'>WhatsApp</p>
          </div>
        </button>
       </>
       }
        <Link
          className="flex items-center gap-2 px-4 py-2 "
          to="/"
        >
          <div>
            <div className='pl-8'>
              <div className='flex justify-center'>
                <img src="/images/thumb.png" alt="hero banner" className=" custom-spin overflow-hidden w-8   " />
              </div>
            </div>
            <p className='text-gold -mt-2 text-center font-extrabold' >VetoGaming</p>
          </div>

        </Link>
      </div>

    </nav>
  )
}
export default Navbar;