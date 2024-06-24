import './App.css';
import { LandingPage } from './pages/user/landingPage';
import { SignUp } from './pages/user/signup';
import { SignIn } from './pages/user/signin';
import { Otp } from './pages/user/otp';
import { CompanyOtp } from './pages/company/companyOtp';
import { Forgot } from './pages/user/forgot';
import { ResetPassword } from './pages/user/resetPassword';
import { Home } from './pages/user/home';
import { UserSideBar } from './components/user/sidebar';
import { ForgotOtp } from './pages/user/forgotOtp';
import { Footer } from './components/user/footer';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from './redux/store';
import { useEffect, useState } from 'react';
import { ChatList, fetchSchedule, fetchSubscription, fetchUser, userNotificatinoList } from './redux/actions/userAction';
import { companyApplicantList, companyFetchSchedule, fetchCompany } from './redux/actions/companyAction';
import { fetchAdmin } from './redux/actions/adminAction';
import { UserManagement } from './pages/admin/userManagement';
import { RequestManagement } from './pages/admin/requestManagement';
import { CompanyManagement } from './pages/admin/companyManagement';
import { CompanyDashboard } from './pages/company/dashboard';
import { AdminSignIn } from './pages/admin/adminSignin';
import { CompanyForgot } from './pages/company/companyForgot';
import { CompanyForgotOtp } from './pages/company/forgotOtp';
import { CompanyResetPassword } from './pages/company/resetPassword';
import { AdminSideBar } from './components/admin/sidebar';
import { SubscriptionManagement } from './pages/admin/subscriptionManagement';
import { CategoryManagement } from './pages/admin/categoryManagement';
import { PostJob } from './pages/company/postJob';
import { JobListing } from './pages/company/jobListing';
import { CompanySideBar } from './components/company/companySideBar';
import { Setting } from './pages/user/setting';
import { AdminSetting } from './pages/company/settings';
import { Subscription } from './pages/user/subscription';
import { Joblist } from './pages/user/joblist';
import { Loader } from './components/common/loader';
import { ResourceManagement } from './pages/company/resourceManagement';
import { EditJob } from './pages/company/editJob';
import { CompanyList } from './pages/user/companyList';
import { Chat } from './pages/user/chat';
import { CompanyChat } from './pages/company/companyChat';
import { UnderConstruction } from './pages/user/underConstruction';
import { MyProfilePage } from './pages/user/myProfilePage';
import { Application } from './pages/user/application';
import { allMessageList } from './redux/actions/userAction';
import { Applicants } from './pages/company/applicants';
import { ApplicantDetails } from './pages/company/applicantDetails';
import VideoCall from './pages/user/videoCall';
import { ProfilePage } from './pages/company/profilePage';
import { CompanySchedule } from './pages/company/mySchedule';
import { AdminDashBoard } from './pages/admin/dashboard';
import { AdminManagement } from './pages/admin/adminManagement';



function App() {

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();


  const userSidebarHiddenPaths = [
    '/signin',
    '/company/videocall',
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
    '/admin/dashboard',
    '/admin/subscriptionmanagement',
    '/admin/adminmanagement',
    '/company',
    '/admin/request',
    '/company/forgot',
    '/company/companyotp',
    '/company/companyforgototp',
    '/company/companyreset',
    '/company/postjob',
    '/company/editjob',
    '/company/joblist',
    '/company/resources',
    '/company/profile',
    '/company/settings',
    '/company/chat',
    '/underconstrution',
    '/company/schedule'
  ];

  const displaySideBar = !userSidebarHiddenPaths.includes(location.pathname);

  const adminSidebarHiddenPaths = [
    '/admin/request',
    '/admin/companymanagement',
    '/admin/usermanagement',
    '/admin/categorymanagement',
    '/admin/subscriptionmanagement',
    '/admin/dashboard',
    '/admin/adminmanagement'
  ];

  const companySidebarPaths = [
    '/company/joblist',
    '/company/profile',
    '/company/resources',
    '/company',
    '/company/settings',
    '/company/chat',
    '/company/applicants',
    '/company/applicantsdetails',
    '/company/schedule'
  ];

  const adminDisplaySideBar = adminSidebarHiddenPaths.includes(location.pathname);
  const companyDisplaySidebar = companySidebarPaths.includes(location.pathname);

  const { user, loading: userLoading } = useSelector((state: RootState) => state.user);
  const { data: company, loading: companyLoading } = useSelector((state: RootState) => state.company);
  const { admin, loading: adminLoading } = useSelector((state: RootState) => state.admin);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?._id) {
        await dispatch(allMessageList(String(user?._id)))
        await dispatch(ChatList(String(user?._id)))
        await dispatch(fetchSchedule(String(user?._id)))
        await dispatch(fetchSubscription())
        await dispatch(userNotificatinoList(String(user._id)))

      }
      if (company?._id) {
        await dispatch(companyApplicantList(String(company?._id)))
        await dispatch(ChatList(String(company?._id)))
        await dispatch(allMessageList(String(company?._id)))
        await dispatch(companyFetchSchedule(String(company?._id)))
        await dispatch(fetchSchedule(String(user?._id)))

      }
      await dispatch(fetchUser());
      await dispatch(fetchCompany());
      await dispatch(fetchAdmin());

      setLoading(false);
    };

    fetchData();
  }, [dispatch]);



  if (loading || userLoading || companyLoading || adminLoading) {
    return <div className='w-screen h-screen'>
      <Loader />
    </div>;
  }

  return (
    <div className='w-screen flex-col'>
      <div className={displaySideBar || adminDisplaySideBar || companyDisplaySidebar ? 'flex' : 'flex-col'}>
        {displaySideBar && <UserSideBar />}
        {adminDisplaySideBar && <AdminSideBar />}
        {companyDisplaySidebar && <CompanySideBar />}

        <Routes>
          {/* User Routes */}
          <Route path='/' element={user?.email ? <Navigate to="/home" /> : company?.email ? <Navigate to="/company" /> : <LandingPage />} />
          <Route path='/home' element={user?.email ? <Home /> : company?.email ? <CompanyDashboard /> : <Navigate to="/" />} />
          <Route path='/signin' element={user?.email ? <Navigate to="/home" /> : company?.email ? <CompanyDashboard /> : <SignIn />} />
          <Route path='/signup' element={user?.email ? <Navigate to="/home" /> : company?.email ? <CompanyDashboard /> : <SignUp />} />
          <Route path='/otp' element={user?.email ? <Navigate to="/home" /> : company?.email ? <CompanyDashboard /> : <Otp />} />
          <Route path='/forgot' element={user?.email ? <Navigate to="/home" /> : company?.email ? <CompanyDashboard /> : <Forgot />} />
          <Route path='/Forgototp' element={user?.email ? <Navigate to="/home" /> : company?.email ? <CompanyDashboard /> : <ForgotOtp />} />
          <Route path='/resetpassword' element={user?.email ? <Navigate to="/home" /> : company?.email ? <CompanyDashboard /> : <ResetPassword />} />
          <Route path='/setting' element={user?.email ? <Setting /> : <Navigate to="/" />} />
          <Route path='/joblist' element={<Joblist />} />
          <Route path='/companylist' element={<CompanyList />} />
          <Route path='/chat' element={user?.email ? <Chat /> : <Navigate to="/" />} />
          <Route path='/subscription' element={user?.email ? <Subscription /> : <Navigate to="/" />} />
          <Route path='/profile' element={user?.email ? <MyProfilePage /> : <Navigate to="/" />} />
          <Route path='/myapplication' element={user?.email ? <Application /> : <Navigate to="/" />} />


          {/* Admin Routes */}
          <Route path='/admin' element={admin?.email ? <Navigate to="/admin/dashboard" /> : <AdminSignIn />} />
          <Route path='/admin/request' element={admin?.email ? <RequestManagement /> : <Navigate to="/admin" />} />
          <Route path='/admin/usermanagement' element={admin?.email ? <UserManagement /> : <Navigate to="/admin" />} />
          <Route path='/admin/categorymanagement' element={admin?.email ? <CategoryManagement /> : <Navigate to="/admin" />} />
          <Route path='/admin/companymanagement' element={admin?.email ? <CompanyManagement /> : <Navigate to="/admin" />} />
          <Route path='/admin/subscriptionmanagement' element={admin?.email ? <SubscriptionManagement /> : <Navigate to="/admin" />} />
          <Route path='/admin/dashboard' element={admin?.email ? <AdminDashBoard /> : <Navigate to="/admin" />} />
          <Route path='/admin/adminmanagement' element={admin?.email ? <AdminManagement /> : <Navigate to="/admin" />} />

          {/* Company Routes */}
          <Route path='/company' element={company?.email ? <CompanyDashboard /> : <Navigate to="/" />} />
          <Route path='/company/forgot' element={company?.email ? <CompanyDashboard /> : <CompanyForgot />} />
          <Route path='/company/companyotp' element={company?.email ? <CompanyDashboard /> : <CompanyOtp />} />
          <Route path='/company/companyforgototp' element={company?.email ? <CompanyDashboard /> : <CompanyForgotOtp />} />
          <Route path='/company/companyreset' element={company?.email ? <CompanyDashboard /> : <CompanyResetPassword />} />
          <Route path='/company/postjob' element={company?.email ? <PostJob /> : <Navigate to="/" />} />
          <Route path='/company/editjob' element={company?.email ? <EditJob /> : <Navigate to="/" />} />
          <Route path='/company/joblist' element={company?.email ? <JobListing /> : <Navigate to="/" />} />
          <Route path='/company/resources' element={company?.email ? <ResourceManagement /> : <Navigate to="/" />} />
          <Route path='/company/settings' element={company?.email ? <AdminSetting /> : <Navigate to="/" />} />
          <Route path='/company/chat' element={company?.email ? <CompanyChat /> : <Navigate to="/" />} />
          <Route path='/company/applicants' element={company?.email ? <Applicants /> : <Navigate to="/" />} />
          <Route path='/company/applicantsdetails' element={company?.email ? <ApplicantDetails /> : <Navigate to="/" />} />
          <Route path='/company/videocall' element={company?.email || user?.email ? <VideoCall /> : <Navigate to="/" />} />
          <Route path='/company/profile' element={company?.email ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path='/company/schedule' element={company?.email ? <CompanySchedule /> : <Navigate to="/" />} />



          <Route path='/underconstrution' element={<UnderConstruction />} />


          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>

      <div className='w-full'>
        {companyDisplaySidebar && <Footer />}
        {displaySideBar && <Footer />}

      </div>

    </div>

  );
}

export default App;
