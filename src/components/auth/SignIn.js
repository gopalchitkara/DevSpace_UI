import React, { useState, useContext } from 'react'
import './SignIn.css'
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

function SignIn(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { activeUser, signIn } = useContext(AuthContext)

    if (activeUser.uid) {
        if (props.location.state && props.location.state.from) {
            return <Redirect to={props.location.state.from} />
        }
        return <Redirect to='/' />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!activeUser.uid) {
            signIn(username, password)
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
                    <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required className="validate" />
                    <label htmlFor="password">password</label>
                </div>
                <div>
                    <p className="grey-text text-darken-1 pointer my20">Forgot Password?</p>
                </div>
                <button className="waves-effect waves-light btn z-depth-0 indigo accent-4 signin-btn my10">
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default SignIn
