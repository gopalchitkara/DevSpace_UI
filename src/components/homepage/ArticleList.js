import React from 'react'
import ArticleListNav from './ArticleListElements/ArticleListNav'
import HomepageFeed from './ArticleListElements/HomepageFeed'

function ArticleList() {
    return (
        <div className="article-list flex-col">
            <ArticleListNav />
            <HomepageFeed />
        </div>
    )
}

export default ArticleList
