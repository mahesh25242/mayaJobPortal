import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from '../../api/users/AuthenticationSlice'

export default function SignOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {            
            dispatch(signOut())
            localStorage.removeItem('token');               
        }
        return navigate("/");         
    });
    return (
        <div>
            Wait
        </div>
    );
}