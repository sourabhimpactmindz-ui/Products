    import React from 'react'
    import {Navigate,Outlet} from 'react-router-dom';
    const PrivateRoute = () => {
    if(localStorage.getItem('jwtToken')){
        return <Outlet></Outlet>
    }
    else {
        return <Navigate to='/' replace ></Navigate>
    }
    }

    export default PrivateRoute
