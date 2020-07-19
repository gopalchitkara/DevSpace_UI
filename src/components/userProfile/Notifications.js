import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Redirect, useRouteMatch } from 'react-router-dom';
import './Notifications.css'

function Notifications() {
    const { activeUser } = useContext(AuthContext);
    const routeMatch = useRouteMatch();

    if (!activeUser.uid) {
        return <Redirect to={{ pathname: '/signin', state: { from: routeMatch.path } }} />
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s8 offset-s2 border white radius-5 my20 p20">
                    <p className="flow-text">No new Notification...</p>
                </div>
            </div>
        </div>
    )
}

export default Notifications
