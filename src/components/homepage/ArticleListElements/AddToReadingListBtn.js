import React, { useContext, useState, useEffect } from 'react'
import './AddToReadingListBtn.css'
import { AuthContext } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios'


function AddToReadingListBtn({ articleId, isSavedArticle }) {
    const [isSavedArticleLocal, setIsSavedArticleLocal] = useState()
    const { activeUser, getBearerTokenValue } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        setIsSavedArticleLocal(isSavedArticle);
    }, [isSavedArticle])


    const handleClick = (e, articleId) => {
        e.preventDefault();

        let data = {
            "UserId": activeUser.uid,
            "ArticleId": articleId
        }
        let config = {
            headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
        };
        if (isSavedArticleLocal) {
            axios.post('https://localhost:5001/api/readinglists/unsaveArticle', data, config)
                .then(() => {
                    setIsSavedArticleLocal(false)
                })
        } else {
            axios.post('https://localhost:5001/api/readinglists/saveArticle', data, config)
                .then(() => {
                    setIsSavedArticleLocal(true)
                })
        }
    }

    return (
        <span>
            {activeUser.uid ? (
                <button
                    onClick={(e) => handleClick(e, articleId)}
                    className="btn-save-article btn-small white waves-effect waves-dark btn-flat grey lighten-3">
                    <span>{isSavedArticleLocal ? "Unsave" : "Save"}</ span>
                </button>
            ) : (
                    <button
                        onClick={(e) => history.push('/signin')}
                        className="btn-save-article btn-small white waves-effect waves-dark btn-flat grey lighten-3">
                        <span>{"Save"}</ span>
                    </button>
                )}
        </span>
    )
}

export default AddToReadingListBtn
