
import './App.css'

import { LandingPage } from './pages/user/landingPage'
import { SignUp } from './pages/user/signup'
import { SignIn } from './pages/user/signin'
import { Otp } from './pages/user/otp'
import { CompanyOtp } from './pages/company/companyOtp'
import { Forgot } from './pages/user/forgot'
import { ResetPassword } from './pages/user/resetPassword'
import { Home } from './pages/user/home'
import { UserSideBar } from './components/user/sidebar'
import { ForgotOtp } from './pages/user/forgotOtp'
import { Footer } from './components/user/footer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AppDispatch, RootState } from './redux/store'
import { useEffect } from 'react'
import { fetchUser } from './redux/actions/userAction'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation();
  const displaySideBar = location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgototp' && location.pathname !== '/resetpassword' && location.pathname !== '/' && location.pathname !== '/companyotp' && location.pathname !== '/otp' && location.pathname !== '/forgot';

  const userData = useSelector((state: RootState) => state.user.user?.email)


  useEffect(() => {

    dispatch(fetchUser())
  }, [])




  return (
    <>
      <div className='w-screen  flex-col'>

        <div className={displaySideBar ? "flex" : "flex-col"}>


          {displaySideBar && <UserSideBar />}


          <Routes>
            <Route path='/' element={userData ? <Navigate to="/home" /> : <LandingPage />} />
            <Route path='/home' element={userData ? <Home /> : <Navigate to="/" />} />
            <Route path='/signin' element={userData ? <Navigate to="/home" /> : <SignIn />} />
            <Route path='/signup' element={userData ? <Navigate to="/home" /> : <SignUp />} />
            <Route path='/otp' element={userData ? <Navigate to="/home" /> : <Otp />} />
            <Route path='/companyotp' element={userData ? <Navigate to="/home" /> : <CompanyOtp />} />
            <Route path='/forgot' element={userData ? <Navigate to="/home" /> : <Forgot />} />
            <Route path='/Forgototp' element={userData ? <Navigate to="/home" /> : <ForgotOtp />} />
            <Route path='/resetpassword' element={userData ? <Navigate to="/home" /> : <ResetPassword />} />
          </Routes>


        </div>



        <div className='w-full  '>
          {displaySideBar && <Footer />}
        </div>
      </div>
    </>
  );
}

export default App;
