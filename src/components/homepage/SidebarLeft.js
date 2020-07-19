import React, { useContext } from 'react'
import './SidebarLeft.css'
import SidebarProfile from './sidebarLeftElements/SidebarProfile'
import SidebarLeftOptions from './sidebarLeftElements/SidebarLeftOptions'
import TrendingTagsWidget from './sidebarLeftElements/TrendingTagsWidget'
import { AuthContext } from '../../contexts/AuthContext'

function SidebarLeft() {
    const { activeUser } = useContext(AuthContext);

    if (activeUser.uid) {
        return (
            <div className="sidebar-left">
                <SidebarProfile activeUser={activeUser} />
                <SidebarLeftOptions activeUser={activeUser} />
                <TrendingTagsWidget />
            </div>
        )
    } else {
        return (
            <div className="sidebar-left">
                <SidebarLeftOptions activeUser={activeUser} />
                <TrendingTagsWidget />
            </div>
        )
    }


}

export default SidebarLeft
