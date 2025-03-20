import { Routes, Route, BrowserRouter } from 'react-router-dom';
import User from './ui/layouts/User';
import Signup from './ui/components/auth/Signup';
import Auth from './ui/layouts/Auth';
import Login from './ui/components/auth/Login';
import Forget from './ui/components/auth/Forget';
import Confirm from './ui/components/auth/Confirm';
import NewPassword from './ui/components/auth/NewPassword';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Deposit from './pages/deposit/Deposit';
import Withdraw from './pages/withdraw/Withdraw';
import Bonus from './pages/bonus/Bonus';
import Profile from './pages/myaccount/Profile';
import Invite from './pages/invite/Invite';
import Team from './pages/team/Team';
import { Toaster } from 'react-hot-toast';
import MainWrapper from './ui/layouts/layouts/MainWrapper';
import PrivateRoute from './ui/layouts/layouts/PrivateRoute';
import OpenRoutes from './ui/layouts/layouts/OpenRoutes';
import Game from './pages/game/Game';
import Bets from './pages/myaccount/Bets';
import Chat from './ui/components/chat/Chat';
import VoteHistory from './pages/withdraw/VoteHistory';
import Verify from './pages/withdraw/Verify';
import Popup from './ui/components/notifications/Popup';
import About from './ui/components/home/About';
function App() {
  return (
    <>
      <Toaster />
      <Popup/>
      <BrowserRouter>
        <MainWrapper>
          <Routes>
            <Route path="/" exact element={<User />} >
              <Route path='' element={<Home />} />
              <Route path='home' element={<Home />} />
              <Route path='contact' element={<Contact />} />
              <Route path='deposit' element={<PrivateRoute><Deposit /></PrivateRoute>} />
              <Route path='withdraw' element={<PrivateRoute><Withdraw /></PrivateRoute>} />
              <Route path='bonus' element={<PrivateRoute><Bonus /></PrivateRoute>} />
              <Route path='profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='invite' element={<PrivateRoute><Invite /></PrivateRoute>} />
              <Route path='team' element={<PrivateRoute><Team /></PrivateRoute>} />
              <Route path='bets' element={<PrivateRoute><Bets /></PrivateRoute>} />
              <Route path='chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
              <Route path='votehistory' element={<PrivateRoute><VoteHistory /></PrivateRoute>} />
              <Route path='about' element={<About />} />
            </Route>
            
            <Route path='game' element={<Game />} />
            <Route path='/auth' element={<OpenRoutes><Auth /></OpenRoutes>}>
              <Route path='register' element={<OpenRoutes><Signup /></OpenRoutes>} />
              <Route path='login' element={<OpenRoutes><Login /></OpenRoutes>} />
              <Route path='forget' element={<OpenRoutes><Forget /></OpenRoutes>} />
              <Route path='confirm' element={<OpenRoutes><Confirm /></OpenRoutes>} />
              <Route path='reset' element={<OpenRoutes><NewPassword /></OpenRoutes>} />
              <Route path='verify' element={<OpenRoutes><Verify /></OpenRoutes>} />
              
            </Route>
          </Routes>
        </MainWrapper>
      </BrowserRouter>
    </>
  )
}

export default App
