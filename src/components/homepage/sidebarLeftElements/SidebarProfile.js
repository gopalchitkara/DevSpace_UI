import React, { useContext } from 'react'
import './SidebarProfile.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

function SidebarProfile({ activeUser }) {

    // const { activeUser, getUserInfoByUsername } = useContext(AuthContext);
    // const userDetails = getUserInfoByUsername(activeUser.username);

    return (
        <Link to={`/user/${activeUser.username}`}>
            <div className="sidebar-profile-container bg-on-hover flex-row items-center py5 px10 radius-5">
                <img src="./images/img_avatar.png" alt="" className="sidebar-profile-avatar radius-half" />
                <div className="sidebar-profile-details flex-col px10">
                    <div className="sidebar-profile-name grey-text text-darken-4" style={{ fontWeight: "500" }}>
                        <p>{activeUser.name}</p>
                    </div>
                    <div className="sidebar-profile-handle grey-text text-darken-1">
                        <p>{`@${activeUser.username}`}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SidebarProfile
