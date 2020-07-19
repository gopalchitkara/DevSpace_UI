import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import { AuthContext } from '../../contexts/AuthContext';

function TopbarMenu() {

    const { activeUser, signOut } = useContext(AuthContext);

    useEffect(() => {
        var elems = document.querySelectorAll('.topbar-menu-dropdown-trigger');
        var dropdownOptions = {
            'closeOnClick': true,
            'hover': false,
            'alignment': 'right',
            'coverTrigger': false,
            'constrainWidth': false
        }
        M.Dropdown.init(elems, dropdownOptions);
    }, []);

    if (activeUser.uid) {
        return (
            <span>
                <button
                    data-target='topbar-menu-dropdown'
                    className="topbar-menu-dropdown-trigger btn-floating btn btn-flat waves-effect waves-light green lighten-1 topbar-menu-button">
                    {activeUser.username[0]}
                </button>
                <ul id='topbar-menu-dropdown' className='dropdown-content topbar-menu-dropdown' >
                    <li>
                        <Link to={`/user/${activeUser.username}`} className="menu-header">
                            <p className="grey-text text-darken-3"><b>{activeUser.name}</b></p>
                            <p className="grey-text text-darken-2">{`@${activeUser.username}`}</p>
                        </Link>
                    </li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/newarticle">Write a Post</Link></li>
                    <li><Link to="/drafts">Drafts</Link></li>
                    <li><Link to="/readinglist">Reading List</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><Link to="" onClick={signOut}>Sign Out</Link></li>
                </ul>
            </span>
        )
    }
    else {
        return (
            <span>
                <button
                    data-target='topbar-menu-dropdown'
                    className="btn-floating btn-small waves-effect waves-light btn-flat btn-search topbar-menu-dropdown-trigger">
                    <i className="material-icons grey-text text-darken-4">menu</i>
                </button>
                <ul id='topbar-menu-dropdown' className='dropdown-content topbar-menu-dropdown' >
                    {/* <li><Link to="/signin">Sign In</Link></li> */}
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </span >
        )
    }
}

export default TopbarMenu
