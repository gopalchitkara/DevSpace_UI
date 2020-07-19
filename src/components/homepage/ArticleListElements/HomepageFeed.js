import React, { useState, useEffect, useContext } from 'react'
import './HomepageFeed.css'
import ArticleCard from './ArticleCard'
import axios from "axios";
import { AuthContext } from '../../../contexts/AuthContext';
import ArticleCardSkeleton from '../../Skeletons/ArticleCardSkeleton';

function HomepageFeed() {
    const [feedArticles, setFeedArticles] = useState([]);
    const [readingList, setReadingList] = useState([]);
    const { activeUser, getBearerTokenValue } = useContext(AuthContext);

    useEffect(() => {
        if (activeUser && activeUser.uid) {
            let config = {
                headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
            };

            axios.all([
                axios.get('https://localhost:5001/api/articles/feedarticles'),
                axios.get(`https://localhost:5001/api/readinglists/${activeUser.uid}`, config)
            ])
                .then(responseArr => {
                    //this will be executed only when all requests are complete
                    setFeedArticles(responseArr[0].data);
                    setReadingList(responseArr[1].data);
                });
        } else {
            axios.get('https://localhost:5001/api/articles/feedarticles')
                .then((res) => {
                    setFeedArticles(res.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [activeUser])

    return (
        <div>
            {feedArticles && feedArticles.length > 0 ? (
                feedArticles.map((article) => {
                    let isSavedArticle = false;
                    if (readingList.length > 0) {
                        isSavedArticle = readingList.find(art => art.id === article.id) != null;
                    }
                    return (
                        <ArticleCard key={article.id} article={article} isSavedArticle={isSavedArticle} />
                    )
                })
            ) : (
                    <>
                        <ArticleCardSkeleton />
                        <ArticleCardSkeleton />
                        <ArticleCardSkeleton />
                        <ArticleCardSkeleton />
                    </>
                )}
        </div>
    )
}

export default HomepageFeed
