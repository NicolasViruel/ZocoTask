import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
  const {loading, isAdmin} = useAuth();
    
  if(loading) return <h1>Loading...</h1>;

  if (!loading && !isAdmin) return <Navigate to='/login' replace />


  return <Outlet/>;
}



export default ProtectedRoute