import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  checkLogin,
  getAuth
} from "../../api/users/AuthenticationSlice";
import { AlternateEmailTwoTone } from "@mui/icons-material";
import Home from "./home/Home";
import CategoriesList from "./categories/CategoriesList";
import SettingLists from "./settings/SettingLists";
import EmployersList from "./employers/EmployersList";
import JobSekkersList from "./jobSekkers/JobSekkersList";
import ChangePassword from "../changePassword/ChangePassword";


export default function Admin(){ 
  const dispatch = useDispatch();
  const { token } = useSelector(getAuth);

  

    return (<>    
        <Routes>   
        <Route path="login" element={<Login />} />        
          {
            token && token.loading === false &&  <Route path="/*" element={
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
            <Route path="/categories" element={<CategoriesList />} />                               
            <Route path="/employers" element={<EmployersList />} />                               
            <Route path="/job-seekers" element={<JobSekkersList />} />                               
            <Route path="/settings" element={<SettingLists />} />                                      
        </Routes>                
        <Outlet />
      </div>
    );
  }
  