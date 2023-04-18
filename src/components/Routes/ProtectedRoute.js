import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner2 } from '../layouts/Spinner';

const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.isLoading);
    return isAuthenticated && !loading ? <Outlet /> : <Navigate to="/login" replace/>
}

export default ProtectedRoute

export const Protected = ({children}) => {

    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
    // const loading = useSelector((state) => state.auth.isLoading);
    
    if(!isLoggedIn){
        return <Spinner2 size/>
    }else if(isLoggedIn){
        return children
    }else{
        return <Navigate to="/login" replace />;
    }
    
    
  
}