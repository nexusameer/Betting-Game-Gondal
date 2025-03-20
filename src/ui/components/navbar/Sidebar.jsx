import { useRef, useState } from 'react'
import { GiHamburgerMenu, GiVote } from 'react-icons/gi'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import { SiSharex, SiWhatsapp } from "react-icons/si";
import { BiHomeSmile, BiUser } from 'react-icons/bi'
import GradientIcon from '../icons/GradientIcons'
import { GiCrossedSabres } from "react-icons/gi";
import { CiWallet } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { SiLegacygames } from "react-icons/si";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => setOpen(false))
  const toggleSidebar = () => setOpen(prev => !prev)

  return (
    <div className='h-full'>
      <button
        onClick={toggleSidebar}
        className="p-3 border-2 border-zinc-800 rounded-xl"
        aria-label="toggle sidebar"
      >
        <GradientIcon icon={GiHamburgerMenu} />
      </button>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-zinc-800 bg-zinc-900"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2 border-zinc-800">
                <span className='text-gold'>VetoGaming</span>
                <button
                  onClick={toggleSidebar}
                  className="p-3 border-2 border-zinc-800 rounded-xl"
                  aria-label="close sidebar"
                >
                  <GradientIcon icon={GiCrossedSabres} />
                </button>
              </div>
              <ul className='overflow-auto'>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item
                  return (
                    <li key={title}>
                      <Link
                        to={href}
                        onClick={toggleSidebar}
                        className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 text-gold"
                      >
                        {title}


                        <div>
                          <GradientIcon icon={Icon} size={25} />
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}





export default Sidebar;
const items = [
  { title: 'Home', Icon: BiHomeSmile, href: '/home' },
  { title: 'My Account', Icon: MdOutlinePrivacyTip, href: '/profile' },
  { title: 'Bonus', Icon: SiLegacygames, href: '/bonus' },
  { title: 'Reffer', Icon: SiSharex, href: '/invite' },
  { title: 'Contact', Icon: SiWhatsapp, href: '/contact' },
  { title: 'Vote History', Icon: GiVote, href: '/votehistory' },
 
  // { title: 'Privacy', Icon: MdOutlinePrivacyTip, href: '#' },

]

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
}

const framerSidebarPanel = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { duration: 0.3 },
}

const framerText = delay => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  }
}

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
}