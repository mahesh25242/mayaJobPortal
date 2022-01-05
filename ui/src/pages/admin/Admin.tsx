import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./login/Login";

export default function Admin(){
    return (
        <Routes>
            <Route path="/login" element={<Login />}>            
            {/* <Route path="messages" element={<Messages />} /> */}
          </Route>
          <Route path="/*" element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>}>
            <Route index element={<Login />} />
            {/* <Route path="messages" element={<Messages />} /> */}
          </Route>
        </Routes>
      );
}

function PrivateRoute({ children }: any) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/admin/login" />;
}
  
function useAuth() {
    return false;
  }

function DashboardLayout() {
    return (
      <div>  as                 
        {/* <Outlet /> */}
      </div>
    );
  }
  