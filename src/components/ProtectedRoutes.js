import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuth = true;
    return ( 
        isAuth ? <Outlet /> : <Navigate to="/login" />
     );
}
 
export default ProtectedRoutes;