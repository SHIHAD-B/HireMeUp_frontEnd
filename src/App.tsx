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
import { fetchCompany } from './redux/actions/companyAction'
import { fetchAdmin } from './redux/actions/adminAction'
import { UserManagement } from './pages/admin/userManagement'
import { RequestManagement } from './pages/admin/requestManagement'
import { CompanyManagement } from './pages/admin/companyManagement'
import { CompanyDashboard } from './pages/company/dashboard'
import { AdminSignIn } from './pages/admin/adminSignin'
import { CompanyForgot } from './pages/company/companyForgot'
import { CompanyForgotOtp } from './pages/company/forgotOtp'
import { CompanyResetPassword } from './pages/company/resetPassword'
import { AdminSideBar } from './components/admin/sidebar'
import { SubscriptionManagement } from './pages/admin/subscriptionManagement'
import { CategoryManagement } from './pages/admin/categoryManagement'
import { fetchSubscription } from './redux/actions/adminAction'
import { PostJob } from './pages/company/postJob'


function App() {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation();
  const userSidebarHiddenPaths = [
    '/signin',
    '/signup',
    '/forgototp',
    '/resetpassword',
    '/',
    '/companyotp',
    '/otp',
    '/forgot',
    '/admin',
    '/admin/usermanagement',
    '/admin/categorymanagement',
    '/admin/companymanagement',
    "/admin/subscriptionmanagement",
    '/company',
    '/admin/request',
    '/company/forgot',
    "/company/companyotp",
    '/company/companyforgototp',
    '/company/companyreset',
    '/company/postjob'
  ];
  const footerHiddenpath=[
    '/signin',
    '/signup',
    '/forgototp',
    '/resetpassword',
    '/',
    '/companyotp',
    '/otp',
    '/forgot',
    '/admin',
    '/admin/usermanagement',
    '/admin/categorymanagement',
    '/admin/companymanagement',
    "/admin/subscriptionmanagement",
    '/company',
    '/admin/request',
    '/company/forgot',
    "/company/companyotp",
    '/company/companyforgototp',
    '/company/companyreset'
  ]

  const displaySideBar = !userSidebarHiddenPaths.includes(location.pathname);
  
  const adminSidebarHiddenPaths = [
    '/admin/request',
    '/admin/companymanagement',
    '/admin/usermanagement',
    '/admin/categorymanagement',
    '/admin/subscriptionmanagement',
  ];

  const admindisplaySideBar = adminSidebarHiddenPaths.includes(location.pathname);

  const { user } = useSelector((state: RootState) => state.user)
  const { data } = useSelector((state: RootState) => state.company)
  const { admin } = useSelector((state: RootState) => state.admin)



  useEffect(() => {

    dispatch(fetchUser())
    dispatch(fetchCompany())
    dispatch(fetchAdmin())
    dispatch(fetchSubscription())
  }, [])




  return (
    <>
      <div className='w-screen  flex-col'>

        <div className={displaySideBar || admindisplaySideBar ? "flex" : "flex-col"}>


          {displaySideBar && <UserSideBar />}
          {admindisplaySideBar && <AdminSideBar />}


          <Routes>
            {/* user Routes */}
            <Route path='/' element={user?.email ? <Navigate to="/home" /> : data?.email ? <CompanyDashboard /> : <LandingPage />} />
            <Route path='/home' element={user?.email ? <Home /> : data?.email ? <CompanyDashboard /> : <Navigate to="/" />} />
            <Route path='/signin' element={user?.email ? <Navigate to="/home" /> : data?.email ? <CompanyDashboard /> : <SignIn />} />
            <Route path='/signup' element={user?.email ? <Navigate to="/home" /> : data?.email ? <CompanyDashboard /> : <SignUp />} />
            <Route path='/otp' element={user?.email ? <Navigate to="/home" /> : data?.email ? <CompanyDashboard /> : <Otp />} />
            <Route path='/forgot' element={user?.email ? <Navigate to="/home" /> : data?.email ? <CompanyDashboard /> : <Forgot />} />
            <Route path='/Forgototp' element={user?.email ? <Navigate to="/home" /> : data?.email ? <CompanyDashboard /> : <ForgotOtp />} />
            <Route path='/resetpassword' element={user?.email ? <Navigate to="/home" /> : data?.email ? <CompanyDashboard /> : <ResetPassword />} />

            {/* admin Routes */}
            <Route path='/admin' element={admin?.email ? <Navigate to="/admin/request" /> : <AdminSignIn />} />
            <Route path='/admin/request' element={admin?.email ? <RequestManagement /> : <Navigate to="/admin" />} />
            <Route path='/admin/usermanagement' element={admin?.email ? <UserManagement /> : <Navigate to="/admin" />} />
            <Route path='/admin/categorymanagement' element={admin?.email ? <CategoryManagement /> : <Navigate to="/admin" />} />
            <Route path='/admin/companymanagement' element={admin?.email ? <CompanyManagement /> : <Navigate to="/admin" />} />
            <Route path='/admin/subscriptionmanagement' element={admin?.email ? <SubscriptionManagement/> : <Navigate to="/admin" />} />


            {/* company routes */}
            <Route path='/company' element={data?.email ? <CompanyDashboard /> : <Navigate to="/" />} />
            <Route path='/company/forgot' element={data?.email ? <CompanyDashboard /> : <CompanyForgot />} />
            <Route path='/company/companyotp' element={data?.email ? <CompanyDashboard /> : <CompanyOtp />} />
            <Route path='/company/companyforgototp' element={data?.email ? <CompanyDashboard /> : <CompanyForgotOtp />} />
            <Route path='/company/companyreset' element={data?.email ? <CompanyDashboard /> : <CompanyResetPassword />} />
            <Route path='/company/postjob' element={data?.email ? <PostJob /> : <CompanyResetPassword />} />



            <Route path='*' element={<Navigate to='/' />} />

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
