import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './SidebarWidget.css'
import { GetMarkdownEmoji } from '../../helpers/GetMarkdownEmoji'
import axios from 'axios'

function SidebarWidget({ topic }) {

    const [topicArticles, setTopicArticles] = useState({});

    useEffect(() => {
        if (topic) {
            axios.get('https://localhost:5001/api/articles/GetArticlesByTopic/' + topic)
                .then((res) => {
                    // console.log(res.data)
                    setTopicArticles(res.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [topic])

    return (
        <div className="widget border radius-5 mb10">
            <div className="widget-header border-bottom">
                <div className="px10 my10 ">
                    <Link to={`/topic/${topic}`}
                        className="grey-text text-darken-4 onhover-blue"
                        style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                        <p className="mxy0 px10">#{topic}</p>
                    </Link>
                </div>
            </div>
            {topicArticles && topicArticles.length > 0 ? (
                <Fragment>
                    {topicArticles.map((article) => {
                        return (
                            <div className="widget-body" key={Math.random()}>
                                <ul className="widget-links-list mxy0">
                                    <Link to={`/article/${article.id}`}>
                                        <li className="flex-col py5 bg-on-hover px15" style={{ minHeight: "85px" }}>
                                            <div className="flex-row items-baseline ">
                                                <GetMarkdownEmoji emoji={':small_blue_diamond:'} classes={'mx5 font-0_6'} />
                                                <span className="grey-text text-darken-4 link-desc">
                                                    {article.title.length > 64 ? (
                                                        article.title.slice(0, 64) + '...'
                                                    ) : (
                                                            article.title
                                                        )}
                                                </span>
                                            </div>
                                            <div className="flex-row items-center px15">
                                                {article.totalComments && article.totalComments.length > 0 ? (
                                                    <Fragment>
                                                        <GetMarkdownEmoji emoji={':speech_balloon:'} classes={'mx5'} />
                                                        <span className="grey-text text-darken-2" style={{ fontSize: "0.9rem" }}>
                                                            {article.totalComments.length}
                                                        </span>
                                                    </Fragment>
                                                ) : (
                                                        <span className="green accent-3 white-text px10 m5" style={{ fontSize: "0.8rem" }}>NEW</span>
                                                    )}
                                            </div>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        )
                    })}
                </Fragment>
            ) : (
                    <div style={{ textAlign: "center", minHeight: 85, paddingTop: "10%" }}>
                        oops! no article found.
                    </div>
                )}
        </div>
    )
}

export default SidebarWidget
