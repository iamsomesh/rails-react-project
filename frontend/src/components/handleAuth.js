import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
const AuthRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (userToken || userToken !== 'undefined') {
            setIsLoggedIn(true);
            return navigate('/');
        }
        setIsLoggedIn(false);
    }
    useEffect(() => {
            checkUserToken();
        }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default AuthRoute;