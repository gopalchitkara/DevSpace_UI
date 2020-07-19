import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Redirect, useRouteMatch } from 'react-router-dom';
import './ReadingList.css'
import ReadingListArticleCard from './ReadingListArticleCard';
import axios from "axios";

function ReadingList() {
    const [readingList, setReadingList] = useState([]);
    const [updateReadingList, setUpdateReadingList] = useState(0);
    const { activeUser, getBearerTokenValue } = useContext(AuthContext);
    const routeMatch = useRouteMatch();

    useEffect(() => {
        if (activeUser.uid) {
            let config = {
                headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
            };

            axios.get(`https://localhost:5001/api/readinglists/${activeUser.uid}`, config)
                .then((res) => {
                    setReadingList(res.data);
                })
        }
    }, [updateReadingList])

    if (!activeUser.uid) {
        return <Redirect to={{ pathname: '/signin', state: { from: routeMatch.path } }} />
    }

    const handleUnSaveArticleClick = (e, articleId) => {
        e.preventDefault();
        if (activeUser.uid && articleId) {
            let data = {
                "UserId": activeUser.uid,
                "ArticleId": articleId
            }
            let config = {
                headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
            };
            axios.post('https://localhost:5001/api/readinglists/unsaveArticle', data, config)
                .then(() => {
                    setUpdateReadingList(updateReadingList + 1);
                })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="reading-list-wrapper border white my20 radius-5">
                        <div className="title grey lighten-3">
                            <h4 className="mxy0 py20 px20">Reading List</h4>
                        </div>
                        <div className="reading-list">
                            {readingList && readingList.length > 0 ? (
                                readingList.map((article) => {
                                    return <ReadingListArticleCard key={article.id} article={article}
                                        handleUnSaveArticleClick={handleUnSaveArticleClick} />
                                })
                            ) : (
                                    <div className="m20 p20">
                                        <h6>Your Reading List is empty...</h6>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadingList
