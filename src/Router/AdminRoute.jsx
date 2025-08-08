import React from 'react';
import CustomHooks from '../Hooks/CustomHooks';
import useRole from '../Hooks/useRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {

    const {user, loading} = CustomHooks();

    const {role, roleLoading} = useRole();
    const location = useLocation();

     if(loading || roleLoading){
        return <span className="loading loading-ring loading-xl"></span>
    }

if(!user || role !== 'admin') {

    return <Navigate  state={{ from: location }} to="/forbidden" replace />;

}


    return children;
};

export default AdminRoute;