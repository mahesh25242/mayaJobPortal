import React from 'react';
import './App.css';
import LayOut from './lay-out/Lay-out';
import { Route, BrowserRouter,  Routes } from 'react-router-dom';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {  HelmetProvider } from 'react-helmet-async';

import { Container } from '@mui/material';




const AppRoutes = () => {
  const About = React.lazy(() => import("./pages/about/About"));
  const Home = React.lazy(() => import("./pages/Home/Home"));
  const Banner = React.lazy(() => import("./pages/Home/Banner"));
  const Contact = React.lazy(() => import("./pages/Contact/Contact"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
  const Terms = React.lazy(() => import("./pages/Terms/Terms"));
  const SignOut = React.lazy(() => import("./pages/signOut/SignOut"));
  const ChangePassword = React.lazy(() => import("./pages/changePassword/ChangePassword"));
  const Admin = React.lazy(() => import("./pages/admin/Admin"));
  const BlogDetails = React.lazy(() => import("./pages/blog/BlogDetails"));
  const Login = React.lazy(() => import("./pages/admin/login/Login"));
  const ForgotPassword = React.lazy(() => import("./pages/admin/ForgotPassword/ForgotPassword"));
  const SetNewPassword = React.lazy(() => import("./pages/admin/ForgotPassword/SetNewPassword"));
  const Register = React.lazy(() => import("./pages/register/Register"));
  const Candidate = React.lazy(() => import("./pages/candidate/Candidate"));
  const Employer = React.lazy(() => import("./pages/employer/Employer"));
  
  return <Routes>
  <Route path="/" element={<LayOut />}>
    <Route index 
    element={
        <React.Suspense fallback={<>...</>}>
          <Banner />
          <Container>
            <Home />
          </Container>
        </React.Suspense>
      } />
    <Route
      path="about"
      element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <About />
          </Container>          
        </React.Suspense>
      }
    />
    <Route
      path="contact/"
      element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <Contact />
          </Container>
        </React.Suspense>
      }
    />
    <Route path="terms" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <Terms />
          </Container>
        </React.Suspense>
      } />
       <Route path="sign-in" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <Login />
          </Container>
        </React.Suspense>
      } />
       <Route path="forgot-password" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <ForgotPassword />
          </Container>
        </React.Suspense>
      } />
       <Route path="set-new-password/:key" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <SetNewPassword />
          </Container>
        </React.Suspense>
      } />
    <Route path="blog/:id" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <BlogDetails />
          </Container>
        </React.Suspense>
      } />
    <Route path="admin/*" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <Admin />
          </Container>
        </React.Suspense>
      } />
      <Route path="candidate/*" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <Candidate />
          </Container>
        </React.Suspense>
      } />
      <Route path="employer/*" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <Employer />
          </Container>
        </React.Suspense>
      } />
    <Route path="change-password" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <ChangePassword />
          </Container>
        </React.Suspense>
      } />
    <Route path="SignOut" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <SignOut />
          </Container>
        </React.Suspense>
      } />
    <Route path="register/*" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <Register />
          </Container>
        </React.Suspense>
      } />
    <Route path="*" element={
        <React.Suspense fallback={<>...</>}>
          <Container>
            <NotFound />
          </Container>
        </React.Suspense>
      } />
  </Route>
</Routes>;
}

function App() {
  

  return (
    <div className="App">
       <HelmetProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
              {/* <LayOut>           */}
                <AppRoutes />
              {/* </LayOut> */}
            
            </BrowserRouter> 
          </LocalizationProvider>  
       </HelmetProvider>   
    </div>
  );
}

export default App;
