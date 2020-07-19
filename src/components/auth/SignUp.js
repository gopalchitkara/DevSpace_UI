import React, { useState, useContext } from 'react'
import './SignUp.css'
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css'

function SignUp() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { activeUser, authError, signUp } = useContext(AuthContext);

    if (activeUser.uid) return <Redirect to='/' />

    if (authError) {
        M.toast({ html: authError, classes: "red" })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!activeUser.uid) {
            signUp(username, fullName, email, password, confirmPassword)
        }
    }

    return (
        <div className="signin mx-auto white p20">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field col s12">
                    <input onChange={(e) => setUsername(e.target.value)} id="username" type="text" required className="validate" />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s12">
                    <input onChange={(e) => setFullName(e.target.value)} id="fullName" type="text" required className="validate" />
                    <label htmlFor="fullName">Full Name</label>
                </div>
                <div className="input-field col s12">
                    <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" required className="validate" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                    <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required className="validate" />
                    <label htmlFor="password">password</label>
                </div>
                <div className="input-field col s12">
                    <input onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" type="password" required className="validate" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <button className="waves-effect waves-light btn z-depth-0 indigo accent-4 signin-btn my10">
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp
