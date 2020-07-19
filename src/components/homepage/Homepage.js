import React from 'react'
import './Homepage.css'
import SidebarLeft from './SidebarLeft'
import ArticleList from './ArticleList'
import SidebarRight from './SidebarRight'
import ScrollToTop from '../helpers/ScrollRestoration';

function Homepage() {

    ScrollToTop();

    return (
        <div className="container homepage-container">
            <div className="row homepage">
                <div className="sidebar-wrapper-left col s3 hide-on-med-and-down ">
                    <SidebarLeft />
                </div>
                <div className="article-list-wrapper col s12 m12 l9 xl6 ">
                    <ArticleList />
                </div>
                <div className="sidebar-wrapper-right col s3">
                    <SidebarRight />
                </div>
            </div>
        </div>
    )
}

export default Homepage
