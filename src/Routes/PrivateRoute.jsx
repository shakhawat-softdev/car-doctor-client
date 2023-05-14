import { useContext } from "react";
import { AuchContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
   const { user, loading } = useContext(AuchContext);
   const location = useLocation()
   console.log(location)


   if (loading) {
      return <progress className="progress w-56"></progress>
   }

   if (user?.email) {
      return children;
   }
   return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;