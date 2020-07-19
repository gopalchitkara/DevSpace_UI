import React, { useState, useEffect } from 'react'
import './UserProfile.css'
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


function UserProfile() {
    const [userDetail, setUserDetail] = useState({});

    const { activeUser } = useContext(AuthContext);
    const { username } = useParams();

    useEffect(() => {
        // console.log(username);
        if (username && username !== '') {
            axios.get('https://localhost:5001/api/userdetail/GetUserDetailByUsername/' + username)
                .then((res) => {
                    setUserDetail(res.data);
                    // console.log(res.data);
                })
                .catch((error) => {
                })
        }
    }, [username])

    return (
        <div className="container">
            <div className="row">
                <div className="col s12  my20">
                    {userDetail ? (
                        <div className="user-profile-container row flex-row items-center p10 white mxy0">
                            <div className="col l3 ">
                                <div className="flex-row justify-center">
                                    <img className="profile-image" src="/images/img_avatar.png" alt="" />
                                </div>
                            </div>
                            <div className="profile-user-data-container col l6 flex-col ">
                                <span className="profile-username">
                                    {userDetail.firstName ? (
                                        userDetail.firstName.charAt(0).toUpperCase() + userDetail.firstName.slice(1)
                                    ) : (<></>)}
                                    {userDetail.lastName ? (
                                        ' ' + userDetail.lastName.charAt(0).toUpperCase() + userDetail.lastName.slice(1)
                                    ) : (<></>)}

                                </span>

                                {activeUser.username === userDetail.username ? (
                                    <span>
                                        <Link to='/settings'
                                            className="waves-effect waves-light grey darken-3 white-text radius-3 bold px20 py5">
                                            EDIT PROFILE
                                        </Link>
                                    </span>
                                ) : (<></>)}


                                {userDetail.bio ? (
                                    <span>
                                        <p className="profile-bio grey-text text-darken-1">{userDetail.bio}</p>
                                    </span>
                                ) : (<></>)}

                                <span className="social-links">
                                    {userDetail.githubLink ? (<a href={userDetail.githubLink} target="_blank"><i className="fab fa-2x fa-github grey-text text-darken-1 social-link"></i></a>) : (<></>)}
                                    {userDetail.linkedInLink ? (<a href={userDetail.linkedInLink} target="_blank"><i className="fab fa-2x fa-linkedin grey-text text-darken-1 social-link"></i></a>) : (<></>)}
                                    {userDetail.stackoverflowLink ? (<a href={userDetail.stackoverflowLink} target="_blank"><i className="fab fa-2x fa-stack-overflow grey-text text-darken-1 social-link"></i></a>) : (<></>)}
                                    {userDetail.mediumLink ? (<a href={userDetail.mediumLink} target="_blank"><i className="fab fa-2x fa-medium grey-text text-darken-1 social-link"></i></a>) : (<></>)}
                                    {userDetail.externalWebsite ? (<a href={userDetail.externalWebsite} target="_blank"><i className="fas fa-2x fa-external-link-alt grey-text text-darken-1 social-link"></i></a>) : (<></>)}
                                </span>
                            </div>
                            <div className="col l3">
                                <div className="profile-quick-info-container flex-col justify-center">
                                    <div className="profile-quick-info">
                                        {userDetail.emailId ? (
                                            <div style={{ marginBottom: 15 }}>
                                                <div className="key grey-text text-darken-2">Email</div>
                                                <div className="value">{userDetail.emailId}</div>
                                            </div>
                                        ) : (<></>)}
                                        {userDetail.location ? (
                                            <div style={{ marginBottom: 15 }}>
                                                <div className="key grey-text text-darken-2">Location</div>
                                                <div className="value">{userDetail.location}</div>
                                            </div>
                                        ) : (<></>)}
                                        {userDetail.joinedOn ? (
                                            <div className="">
                                                <div className="key grey-text text-darken-2">joined</div>
                                                <div className="value">{moment(userDetail.joinedOn).format("MMM Do YY")}</div>
                                            </div>
                                        ) : (<></>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                            <div>Loading...</div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
