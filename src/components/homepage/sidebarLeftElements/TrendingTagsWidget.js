import React from 'react'
import { Link } from 'react-router-dom'
import './TrendingTagsWidget.css'
import { GetMarkdownEmoji } from '../../helpers/GetMarkdownEmoji'

function TrendingTagsWidget() {
    return (
        <div className="widget-trending-tags px10 ">
            <div className="flex-row items-center" style={{ marginTop: "10px" }}>
                <GetMarkdownEmoji emoji={':fire:'} classes={'mx5 line-height-0 font-1_2'} />
                <span className="bold">Trending Topics</span>
            </div>
            <div className="trending-tags px10 flex-col">
                <Link to="/topic/react" className="grey-text text-darken-4 my5 trending-tag">#react</Link>
                <Link to="/topic/javascript" className="grey-text text-darken-4 my5 trending-tag">#javascript</Link>
                <Link to="/topic/awesome" className="grey-text text-darken-4 my5 trending-tag">#awesome</Link>
                <Link to="/topic/webdev" className="grey-text text-darken-4 my5 trending-tag">#webdev</Link>
                <Link to="/topic/workfromhome" className="grey-text text-darken-4 my5 trending-tag">#workfromhome</Link>
            </div>
        </div>
    )
}

export default TrendingTagsWidget
