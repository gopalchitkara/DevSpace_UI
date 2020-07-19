import React from 'react'
import { Link } from 'react-router-dom';
import './ReadingListArticleCard.css'
import moment from 'moment';


function ReadingListArticleCard({ article, handleUnSaveArticleClick }) {
    return (
        <Link to={`/article/${article.id}`} className="grey-text text-darken-4">
            <div className="flex-col px20 border-bottom bg-on-hover">
                <div className="flex-row items-center">
                    <h5 className="bold" style={{ marginBottom: "2px" }}>{article.title}</h5>
                    <div className="mx20" style={{ marginTop: "20px" }}>
                        {article.tagList && article.tagList.map((hashtag) => {
                            return (
                                <span className="story-tag-link grey-text text-darken-2"
                                    key={Math.floor(Math.random() * 1000000)}>
                                    {`#${hashtag.hashtagName}`}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="flex-row justify-between">
                    <div className="flex-row items-center">
                        <img src="./images/img_avatar.png" alt="" className="radius-half" style={{ height: "30px", width: "30px" }} />
                        <p className="grey-text text-darken-3 mx10" style={{ fontSize: "0.9rem" }}>
                            {moment(article.publishedAt).format("MMM D YYYY")}
                        </p>
                        <p className="grey-text text-darken-3 mx10" style={{ fontSize: "0.9rem" }}>
                            {article.readingTime > 0 ? article.readingTime : 1} minute read
                        </p>
                    </div>
                    <button
                        onClick={(e) => handleUnSaveArticleClick(e, article.id)}
                        className="btn-small white waves-effect waves-dark btn-flat grey lighten-3 border">
                        <span>Remove</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ReadingListArticleCard
