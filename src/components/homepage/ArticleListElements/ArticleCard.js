import React, { useContext, Fragment } from 'react'
import './ArticleCard.css'
import { Link } from 'react-router-dom';
import { GetMarkdownEmoji } from '../../helpers/GetMarkdownEmoji'
import moment from 'moment';
import { AuthContext } from '../../../contexts/AuthContext';
import AddToReadingListBtn from './AddToReadingListBtn';

function ArticleCard({ article, isSavedArticle }) {
    return (
        <div className="article-story flex-col white p10 radius-5 my10">
            <div className="article-story-header flex-row items-center">
                <Link to={`/user/${article.authorUsername}`}>
                    <div className="story-author-pic ">
                        <img src="/images/img_avatar.png" alt="" className="radius-half" style={{ height: "30px", width: "30px" }} />
                    </div>
                </Link>
                <Link to={`/user/${article.authorUsername}`}>
                    <div className="story-author-bio mx10">
                        <p className="story-author-name grey-text text-darken-3">{article.authorUsername}</p>
                        <p className="story-publish-date grey-text text-darken-2">
                            {moment(article.createdAt).calendar()}
                        </p>
                    </div>
                </Link>
            </div>
            <div className="article-story-body flex-col">
                <Link to={`/article/${article.id}`}>
                    <h5 className="story-title my5">{article.title}</h5>
                </Link>
                <div className="story-tags">
                    {article.hashtags && article.hashtags.length > 0 && article.hashtags.map((hashtag) => {
                        return (
                            <Fragment key={Math.random()}>
                                {hashtag.description ? (
                                    <Link to={`/topic/${hashtag.description}`} key={Math.floor(Math.random() * 10000000)}
                                        className="story-tag-link grey-text text-darken-2">
                                        {`#${hashtag.description}`}
                                    </Link>
                                ) : (<></>)}
                            </Fragment>
                        )
                    })}
                </div>
                <div className="story-bottom flex-row justify-between">
                    <div className="story-reaction-details flex-row items-center">
                        <Link to={`/article/${article.id}`} className="btn-small white waves-effect waves-dark btn-flat grey lighten-3 flex-row items-center">
                            <GetMarkdownEmoji emoji={':heart:'} classes={'mx5 font-1_2'} />
                            <span>{article.totalLikes} bytes</span>
                        </Link>
                        <Link to={`/article/${article.id}`} className="mx10 btn-small white waves-effect waves-dark btn-flat grey lighten-3 flex-row items-center">
                            <GetMarkdownEmoji emoji={':speech_balloon:'} classes={'mx5 font-1_2'} />
                            <span>{article.totalComments} comments</span>
                        </Link>
                    </div>
                    <div className="story-options flex-row items-center">
                        <span className="mx10 grey-text text-darken-2">{article.readingTime === 0 ? 1 : article.readingTime} minute read</span>
                        <AddToReadingListBtn articleId={article.id} isSavedArticle={isSavedArticle} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard
