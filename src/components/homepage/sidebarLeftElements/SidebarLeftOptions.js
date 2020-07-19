import React from 'react'
import './SidebarLeftOptions.css'
import { Link } from 'react-router-dom';

const GetMarkdownEmoji = (props) => {
    var md = require('markdown-it')();
    md.use(require('markdown-it-emoji'));
    return <span className="sidebar-left-option-emoji" dangerouslySetInnerHTML={{ __html: md.render(props.emoji) }} />
}

function SidebarLeftOptions({ activeUser }) {

    return (
        <div className="sidebar-left-options flex-col my10">
            {activeUser.uid ? (
                <Link to="/readinglist" className="sl-option flex-row items-center bg-on-hover px10 py2 radius-5">
                    <GetMarkdownEmoji emoji={':floppy_disk:'} />
                    <span className="sl-option-text px10 grey-text text-darken-4">Reading List</span>
                </Link >
            ) : (
                    <Link to="/signin" className="sl-option flex-row items-center bg-on-hover px10 py2 radius-5">
                        <GetMarkdownEmoji emoji={':computer:'} />
                        <span className="sl-option-text px10 grey-text text-darken-4">Sign In</span>
                    </Link >
                )}
            <Link to="/newarticle" className="sl-option flex-row items-center bg-on-hover px10 py2 radius-5">
                <GetMarkdownEmoji emoji={':scroll:'} />
                <span className="sl-option-text px10 grey-text text-darken-4">Write a Post</span>
            </Link >
            {/* <Link to="/about" className="sl-option flex-row items-center bg-on-hover px10 py2 radius-5">
                <GetMarkdownEmoji emoji={':briefcase:'} />
                <span className="sl-option-text px10 grey-text text-darken-4">About</span>
            </Link > */}
            <Link to="/help/writenewarticle" className="sl-option flex-row items-center bg-on-hover px10 py2 radius-5">
                <GetMarkdownEmoji emoji={':keyboard:'} />
                <span className="sl-option-text px10 grey-text text-darken-4">Writing Guide</span>
            </Link >
            {activeUser.uid ? (
                <Link to="/notifications" className="sl-option flex-row items-center bg-on-hover px10 py2 radius-5">
                    <GetMarkdownEmoji emoji={':mailbox_with_mail:'} />
                    {/* <GetMarkdownEmoji emoji={':mailbox_with_no_mail:'} /> */}
                    <span className="sl-option-text px10 grey-text text-darken-4">Notifications</span>
                </Link >
            ) : (
                    <></>
                )}

        </div>
    )
}

export default SidebarLeftOptions
