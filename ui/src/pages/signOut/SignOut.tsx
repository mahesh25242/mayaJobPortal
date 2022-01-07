import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');               
        }
        return navigate("/admin");         
    });
    return (
        <div>
            Wait
        </div>
    );
}