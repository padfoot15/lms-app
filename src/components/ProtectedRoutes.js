import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuth = false;
    return ( 
        isAuth ? <Outlet /> : <Navigate to="/login" />
     );
}
 
export default ProtectedRoutes;