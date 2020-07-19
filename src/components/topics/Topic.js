import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import ArticleCard from '../homepage/ArticleListElements/ArticleCard'
import axios from "axios";
import { AuthContext } from '../../contexts/AuthContext';
import './Topic.css'
import ArticleCardSkeleton from '../Skeletons/ArticleCardSkeleton';


function Topic() {
    const [currentTopic, setCurrentTopic] = useState();
    const [feedArticles, setFeedArticles] = useState([]);
    const [readingList, setReadingList] = useState([]);
    const [showNoContentMessage, setShowNoContentMessage] = useState(false);
    const { activeUser, getBearerTokenValue } = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        const pathName = history.location.pathname;
        setCurrentTopic(pathName.slice(pathName.lastIndexOf("/") + 1));
    });

    useEffect(() => {
        if (currentTopic) {
            axios.get('https://localhost:5001/api/articles/GetArticlesByTopic/' + currentTopic)
                .then((res) => {
                    if (res.data.length > 0) {
                        setFeedArticles(res.data);
                    } else {
                        setShowNoContentMessage(true)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        if (activeUser.uid) {
            let config = {
                headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
            };

            axios.get(`https://localhost:5001/api/readinglists/${activeUser.uid}`, config)
                .then((res) => {
                    setReadingList(res.data);
                })
        }
    }, [currentTopic, activeUser])

    return (
        <div className="contatiner">
            <div className="row">
                <div className="col s12 l10 offset-l1 xl8 offset-xl2">
                    <div className="topic-header">
                        {currentTopic ? (
                            <h3 className="mxy0">#{currentTopic}</h3>
                        ) : (<></>)}
                    </div>
                </div>
                <div className="col s12 l10 offset-l1 xl8 offset-xl2">
                    {feedArticles && feedArticles.length > 0 ? (
                        feedArticles.map((article) => {
                            let isSavedArticle = readingList.includes(article.id);
                            return (
                                <ArticleCard key={article.id} article={article} isSavedArticle={isSavedArticle} />
                            )
                        })
                    ) : (
                            <div>
                                {showNoContentMessage ? (
                                    <div style={{ textAlign: "center", marginTop: 50 }}>
                                        <h5>Sorry! Data not found...</h5>
                                    </div>
                                ) : (
                                        <div>
                                            <ArticleCardSkeleton />
                                            <ArticleCardSkeleton />
                                            <ArticleCardSkeleton />
                                            <ArticleCardSkeleton />
                                        </div>
                                    )}
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Topic
