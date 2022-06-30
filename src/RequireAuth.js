import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from './Components/Spinner';
import { auth } from './firebase.init';


const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (loading) {
        return <Spinner></Spinner>
    }
    if (!user) {
        return <Navigate to='/' state={{ from: location }} replace></Navigate>
    }

    return children;
}

export default RequireAuth;
