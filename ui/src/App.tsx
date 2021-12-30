import React from 'react';
import './App.css';
import LayOut from './lay-out/Lay-out';
import { Route, BrowserRouter,  Routes } from 'react-router-dom';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';




const AppRoutes = () => {
  const About = React.lazy(() => import("./pages/About/About"));
  const Home = React.lazy(() => import("./pages/Home/Home"));
  const Contact = React.lazy(() => import("./pages/Contact/Contact"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
  const Terms = React.lazy(() => import("./pages/Terms/Terms"));

  return <Routes>
  <Route path="/" element={<LayOut />}>
    <Route index 
    element={
        <React.Suspense fallback={<>...</>}>
          <Home />
        </React.Suspense>
      } />
    <Route
      path="about"
      element={
        <React.Suspense fallback={<>...</>}>
          <About />
        </React.Suspense>
      }
    />
    <Route
      path="contact/"
      element={
        <React.Suspense fallback={<>...</>}>
          <Contact />
        </React.Suspense>
      }
    />
    <Route path="terms" element={
        <React.Suspense fallback={<>...</>}>
          <Terms />
        </React.Suspense>
      } />
    <Route path="*" element={
        <React.Suspense fallback={<>...</>}>
          <NotFound />
        </React.Suspense>
      } />
  </Route>
</Routes>;
}
function App() {
  

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          {/* <LayOut>           */}
            <AppRoutes />
          {/* </LayOut> */}
        
        </BrowserRouter> 
       </LocalizationProvider>     
    </div>
  );
}

export default App;
