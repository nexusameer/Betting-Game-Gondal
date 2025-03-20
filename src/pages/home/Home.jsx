import React, { Profiler } from 'react';
import Header from '../../ui/components/home/Header';
import About from '../../ui/components/home/About'
import Games from '../../ui/components/home/Games';
import Updates from '../../ui/components/home/Updates';
import HowItworks from '../../ui/components/home/HowItworks';
import Details from '../../ui/components/home/Details';
import Invite from '../../ui/components/home/Invite';
import Footer from '../../ui/components/footer/Footer';
import Parters from '../../ui/components/home/Parters';
import { useAuthStore } from '../../store/auth';
import { useLocation } from 'react-router-dom';
const Home = () => {
  const location = useLocation();
  const loggedIn = useAuthStore((state) => state.isLoggedIn)();
  return (
   <div>
   
    <div className=''>
    <Header />
    {/* <About /> */}
    <Games />
    <Updates />
    {/* 
- #INSTRUCTION
*/}
    <HowItworks />
    {/* 
- #ABOUT
*/}
    {/* <Details /> */}
    {/* 
- #APP
*/}
    <Invite />
    {/* 
  - #FOOTER
  
*/}
    <Parters />
    <Footer />
  </div>
  
   
   </div>

  );
}

export default Home;
