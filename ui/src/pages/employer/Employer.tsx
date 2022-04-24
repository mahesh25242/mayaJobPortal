import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  checkLogin,
  getAuth
} from "../../api/users/AuthenticationSlice";
import { AlternateEmailTwoTone } from "@mui/icons-material";
import Home from "./home/Home";
import Login from "../admin/login/Login";



export default function Employer(){ 
  const dispatch = useDispatch();
  const { token } = useSelector(getAuth);

  

    return (<>    
        <Routes>   
        <Route path="login" element={<Login />} />        
          {
            token &&   <Route path="/*" element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>}>
             
              {/* <Route path="messages" element={<Messages />} /> */}
            </Route>
          }
         
        </Routes>
      </>);
}

function PrivateRoute({ children }: any) {    
  
    const { token } = useSelector(getAuth);       
    return !!token.token ? children :   <Navigate to="/admin/login" />;
}
  

function DashboardLayout() {
  
   
    return (
      <div>   
        <Routes>
            <Route path="/" element={<Home />} />               
        </Routes>                
        <Outlet />
      </div>
    );
  }
  