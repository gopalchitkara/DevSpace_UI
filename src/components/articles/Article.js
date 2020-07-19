import React, { useContext, useEffect, useState, Fragment } from 'react';
import './Article.css';
import './NewArticle.css'
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import ScrollToTop from '../helpers/ScrollRestoration';
import ArticleAuthorDetails from './ArticleAuthorDetails';
import ArticleReactions from './ArticleReactions'
import ArticleComments from './ArticleComments'

function Article() {
    const { articleId } = useParams();
    const [articleById, setArticleById] = useState({});

    ScrollToTop();

    useEffect(() => {
        if (articleId && articleId !== '') {
            axios.get('https://localhost:5001/api/articles/' + articleId)
                .then((res) => {
                    setArticleById(res.data);
                })
                .catch((error) => {
                })
        }
    }, []);

    useEffect(() => {
        var renderedBody = document.querySelector('.rendered-body');
        if (renderedBody) {
            var renderedBodyDefaults = [...(renderedBody.querySelectorAll('h1, h2, h3, h4, h5, h6, blockquote, ul, ol, li, img, table, thead, tbody, tr, td, a, ins, mark, sup, sub, dt, dl, dd, strong'))];
            // eslint-disable-next-line
            renderedBodyDefaults.map((el) => {
                el.classList.add('browser-default')
            })
        }
    }, [articleById]);

    var md = require('markdown-it')({
        breaks: true,
        linkify: true,
        typographer: true,
    })
        .use(require('markdown-it-emoji'))
        .use(require('markdown-it-sub'))
        .use(require('markdown-it-sup'))
        .use(require('markdown-it-ins'))
        .use(require('markdown-it-mark'))
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-abbr'));

    console.log('articleById', articleById)

    return (
        < div className="article-page" >
            {/* article body */}
            < div className="container my20" >
                <div className="row">
                    <div className="article-container col s12 l11 xl9 ">
                        {!(articleById && articleById.title) ? (
                            <div className="article white border radius-5">
                                <div className="row mx0 article-skeleton ">
                                    <div className="row mx0">
                                        <div className="col s6 ">
                                            <div className="skeleton-element title"></div>
                                        </div>
                                    </div>
                                    <div className="row mx0">
                                        <div className="col s6">
                                            <div className="skeleton-element header mb5"></div>
                                            <div className="skeleton-element header"></div>
                                        </div>
                                    </div>
                                    <div className="row mx0">
                                        <div className="col s9">
                                            <div className="skeleton-element body"></div>
                                            <div className="skeleton-element body"></div>
                                            <div className="skeleton-element body"></div>
                                            <div className="skeleton-element body"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <Fragment>
                                    <div className="article white border radius-5">
                                        <div className="rendered-post">
                                            <div className="rendered-title">
                                                <h2>{articleById.title}</h2>
                                            </div>
                                            <div className="rendered-publish-detials flex-row items-center" style={{ fontWeight: "500" }}>
                                                <Link to={`/user/${articleById.authorUsername}`} className="profile mr10 flex-row items-center">
                                                    <span style={{ lineHeight: "0" }}>
                                                        <img className="profile-image-small radius-half" src="/images/img_avatar.png" alt="" />
                                                    </span>
                                                    <span className="ml10 grey-text text-darken-2">
                                                        {articleById.authorUsername}
                                                    </span>
                                                    <span className="author-social-links">
                                                    </span>
                                                </Link>
                                                <span className="date grey-text text-darken-2 mx10">
                                                    {moment(articleById.publishedAt).calendar()}
                                                </span>
                                            </div>
                                            <div className="rendered-tags">
                                                {articleById && articleById.hashtags && articleById.hashtags.map((hashtag) => {
                                                    return (
                                                        <Link to={`/topic/${hashtag.description}`} key={Math.floor(Math.random() * 10000000)}
                                                            className="rendered-tag  radius-3 grey darken-4 white-text">
                                                            {`#${hashtag.description}`}
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                            <div className="rendered-body" style={{ minHeight: "30vh" }}>
                                                <p dangerouslySetInnerHTML={{ __html: md.render(`${JSON.parse(articleById.body)}`) }} />
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )}
                    </div>
                    <div className="col s12 l11 xl3">
                        <ArticleAuthorDetails authorUsername={articleById.authorUsername} />
                        <ArticleReactions articleId={articleById} />
                    </div>
                    <div className="col s12">
                        <div className="article white border radius-5" style={{ marginTop: 10 }}>
                            <ArticleComments />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Article
