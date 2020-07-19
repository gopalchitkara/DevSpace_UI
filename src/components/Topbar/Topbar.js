import React from 'react'
import { Link } from 'react-router-dom'
import TopbarSearch from './TopbarSearch'
import TopbarMenu from './TopbarMenu'
import './Topbar.css';

function Topbar() {
    return (
        <div className="navbar-fixed">
            <nav className="white z-depth-0 nav-topbar">
                <div className="container topbar-container">
                    <div className="topbar-items">
                        <Link to="/" className="topbar-logo">
                            {'DevSpace.'}
                        </Link>
                        <div className="topbar-links">
                            <span className="topbar-link">
                                <TopbarSearch />
                            </span>
                            <span className="topbar-link">
                                <TopbarMenu />
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Topbar
