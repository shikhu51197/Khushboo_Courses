import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import NotFound from './components/Layout/NotFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import CoursePages from './components/Courses/CoursePages';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Admincreatecourses from './components/Admin/AdminCreateCourse/Admincreatecourses';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader';

function App() {
  // window.addEventListener('contextmenu', (e)=>{
  // e.preventDefault();
  // })

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/course/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CoursePages user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/request" element={<Request />} />
            <Route
              path="/forgetpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentfail" element={<PaymentFail />} />

            {/* admin routs */}

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createcourse"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  {' '}
                  <Admincreatecourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
