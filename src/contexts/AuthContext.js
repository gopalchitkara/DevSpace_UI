import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

//create context
export const AuthContext = createContext();

//provider component
export const AuthContextProvider = (props) => {
    const [authError, setAuthError] = useState('')
    const [activeUser, setActiveUser] = useState({});

    useEffect(() => {
        var _activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (_activeUser) {
            setActiveUser(JSON.parse(localStorage.getItem('activeUser')));
            //TODO: check expire date and logout if invalid
        }
    }, [])

    //actions
    const signIn = (username, password) => {
        const data = {
            "Username": username,
            "Password": password
        }

        axios.post('https://localhost:5001/api/auth/login', data)
            .then((res) => {
                // console.log(res.data);
                localStorage.setItem('activeUser', JSON.stringify({
                    uid: res.data.userDetails.id,
                    username: res.data.userDetails.username,
                    name: res.data.userDetails.firstName.charAt(0).toUpperCase() + res.data.userDetails.firstName.slice(1)
                        + ' '
                        + res.data.userDetails.lastName.charAt(0).toUpperCase() + res.data.userDetails.lastName.slice(1),
                    token: res.data.message,
                    expireDate: res.data.expireDate
                }));
            })
            .then(() => {
                // console.log(JSON.parse(localStorage.getItem('activeUser')))
                setActiveUser(JSON.parse(localStorage.getItem('activeUser')));
            });
    }

    const signUp = (username, fullName, email, password, confirmPassword) => {

        // console.log(username, email, password, confirmPassword);
        if (!(username, fullName, email, password, confirmPassword)) {
            setAuthError('please provide valid details')
        }

        const newUserDetails = {
            "Username": username,
            "FullName": fullName,
            "Email": email,
            "Password": password,
            "ConfirmPassword": confirmPassword
        }

        axios.post('https://localhost:5001/api/auth/register', newUserDetails)
            .then((res) => {
                // console.log(res.data);
                localStorage.setItem('activeUser', JSON.stringify({
                    uid: res.data.userDetails.id,
                    username: res.data.userDetails.username,
                    name: res.data.userDetails.firstName.charAt(0).toUpperCase() + res.data.userDetails.firstName.slice(1)
                        + ' '
                        + res.data.userDetails.lastName.charAt(0).toUpperCase() + res.data.userDetails.lastName.slice(1),
                    token: res.data.message,
                    expireDate: res.data.expireDate
                }));
            })
            .then(() => {
                // console.log(JSON.parse(localStorage.getItem('activeUser')))
                setActiveUser(JSON.parse(localStorage.getItem('activeUser')));
            });
    }

    const signOut = () => {
        setActiveUser({});
        localStorage.removeItem('activeUser')
    }

    const getBearerTokenValue = () => {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'))
        return activeUser.token;
    }

    const getUserInfoByUsername = (username) => {
        // var existingUsers = JSON.parse(localStorage.getItem('users'));
        // var user = existingUsers.find(user => user.username === username)
        // return ({ uid: user.uid, name: user.name, username: user.username, email: user.email })
        return ({ uid: 1, name: 'admin', username: 'admin', email: 'admin@admin.com' })
    }

    return (
        <AuthContext.Provider value={{ authError, signIn, signUp, signOut, activeUser, getBearerTokenValue, getUserInfoByUsername }}>
            {props.children}
        </AuthContext.Provider>
    )
}