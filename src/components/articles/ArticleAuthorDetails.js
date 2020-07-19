import React, { useState, useEffect, Fragment } from 'react';
import './ArticleAuthorDetails.css';
import axios from 'axios';
import moment from 'moment'
import { Link } from 'react-router-dom'

function ArticleAuthorDetails({ authorUsername }) {
    const [authorDetails, setAuthorDetails] = useState({});
    const [loadingDetails, setLoadingDetails] = useState(true);

    useEffect(() => {
        if (authorUsername && authorUsername !== '') {
            axios.get('https://localhost:5001/api/userdetail/GetUserDetailByUsername/' + authorUsername)
                .then((res) => {
                    console.log(res.data)
                    setAuthorDetails(res.data);
                    setLoadingDetails(false);
                })
                .catch((error) => {
                })
        }
    }, [authorUsername]);

    return (
        <div className="article-author-detail white border radius-5">
            <div className="row mxy0" style={{ minHeight: 250 }}>
                <div className="p15">
                    {loadingDetails ? (
                        <div>
                            <div className="col s12 skeleton-row" ></div>
                            <div className="col s12 skeleton-row" style={{ marginTop: 10 }}></div>
                            <div className="col s12 skeleton-row" style={{ marginTop: 10 }}></div>
                        </div>
                    ) : (
                            <Fragment>
                                {!authorDetails ? (
                                    <div style={{ textAlign: "center" }}>
                                        <p className="grey-text text-darken-1 my20"><i>404 Author not found...</i></p>
                                    </div>
                                ) : (
                                        <div className="row" style={{ marginBottom: 0 }}>
                                            <div className="col s2">
                                                <Link to={`/user/${authorDetails.username}`}>
                                                    <img src="/images/img_avatar.png" alt="" className="radius-half" style={{ height: "40px", width: "40px" }} />
                                                </Link>
                                            </div>
                                            <div className="col s10">
                                                <h6 className="bold" style={{ marginTop: "8%" }}>
                                                    {authorDetails.username ? (
                                                        <Link to={`/user/${authorDetails.username}`} className="grey-text text-darken-4">
                                                            {authorDetails.username.charAt(0).toUpperCase() + authorDetails.username.slice(1)}
                                                        </Link>
                                                    ) : (<></>)}
                                                </h6>
                                            </div>
                                            <div className="col s12">
                                                <p className="grey-text text-darken-3 my10">{authorDetails.bio}</p>
                                            </div>
                                            <div className="col s12">
                                                <p className="bold mxy0 grey-text text-darken-2" style={{ fontSize: "0.9rem" }}>Location</p>
                                                <p className="mxy0 mb10 grey-text text-darken-3">
                                                    {authorDetails.location ? (
                                                        authorDetails.location.charAt(0).toUpperCase() + authorDetails.location.slice(1)
                                                    ) : (<></>)}
                                                </p>
                                            </div>
                                            <div className="col s12">
                                                <p className="bold mxy0 grey-text text-darken-2" style={{ fontSize: "0.9rem" }}>Email</p>
                                                <p className="mxy0 mb10 grey-text text-darken-3">{authorDetails.emailId}</p>
                                            </div>
                                            <div className="col s12">
                                                <p className="bold mxy0 grey-text text-darken-2" style={{ fontSize: "0.9rem" }}>Joined</p>
                                                <p className="mxy0 grey-text text-darken-3">{moment(authorDetails.joinedOn).format("MMM D YYYY")}</p>
                                            </div>
                                        </div>
                                    )}
                            </Fragment>
                        )}
                </div>
            </div>
        </div>
    )
}

export default ArticleAuthorDetails


