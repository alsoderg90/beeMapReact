import React from 'react'
import { GoogleLogout, GoogleLogin } from 'react-google-login'

const GoogleOAuth = ({setUser, logged}) => {

    const client_id  = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
    console.log(client_id, "moi")
 

    
    const login = (response) => {
    console.log(response);
    setUser(true)
    }

    const logout = (response) => {
    console.log(response);
    setUser(false)
    return 
    }

    const loginFailed = (response) => {
    console.log("wrong credentials")
    }



    if (!logged) return (
        <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={login}
        onFailure={loginFailed}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
        />
    )

    else return (
        <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={logout}
        >
        </GoogleLogout>
    )
}

export default GoogleOAuth



