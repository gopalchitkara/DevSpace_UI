import React from 'react'
import './ArticleListNav.css'

function ArticleListNav() {
    return (
        // <div className="article-list-nav flex-row items-center justify-center my10">
        //     <button className="waves-effect waves-light btn indigo accent-4 z-depth-0 mx15">
        //         <span>Feed</span>
        //     </button>
        //     <button className="waves-effect waves-light btn indigo accent-4 z-depth-0 mx15">
        //         <span>Latest</span>
        //     </button>
        //     <button className="waves-effect waves-light btn indigo accent-4 z-depth-0 mx15">
        //         <span>Popular</span>
        //     </button>
        // </div>
        <div className="article-list-nav flex-row justify-between">
            <div>
                <h5 className="bold" style={{ marginTop: 0, marginBottom: 5 }}>Feed</h5>
            </div>
        </div>
    )
}

export default ArticleListNav
