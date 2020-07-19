import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import './MySettings.css'
import { useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';

function MySettings() {
    const [username, setUsername] = useState('');
    const [emailId, setEmailId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [linkedInLink, setLinkedInLink] = useState('');
    const [stackoverflowLink, setStackoverflowLink] = useState('');
    const [mediumLink, setMediumLink] = useState('');
    const [externalWebsite, setExternalWebsite] = useState('');
    const [profileImage, setProfileImage] = useState();

    const { activeUser, getBearerTokenValue } = useContext(AuthContext);
    const routeMatch = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        // console.log(activeUser);
        if (activeUser && activeUser.username) {
            axios.get('https://localhost:5001/api/userdetail/GetUserDetailByUsername/' + activeUser.username)
                .then((res) => {
                    // console.log(res.data);
                    setUsername(res.data.username);
                    setEmailId(res.data.emailId);
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setLocation(res.data.location);
                    setBio(res.data.bio);
                    setGithubLink(res.data.githubLink);
                    setLinkedInLink(res.data.linkedInLink);
                    setStackoverflowLink(res.data.stackoverflowLink);
                    setMediumLink(res.data.mediumLink);
                    setExternalWebsite(res.data.externalWebsite);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [activeUser])

    if (!activeUser.uid) {
        return <Redirect to={{ pathname: '/signin', state: { from: routeMatch.path } }} />
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        var data = {
            "FirstName": firstName,
            "LastName": lastName,
            "Location": location,
            "Bio": bio,
            "GithubLink": githubLink,
            "LinkedInLink": linkedInLink,
            "StackoverflowLink": stackoverflowLink,
            "MediumLink": mediumLink,
            "ExternalWebsite": externalWebsite,
            "ProfileImage": profileImage,
        }
        console.log(data);

        let config = {
            headers: {
                Authorization: `Bearer ${getBearerTokenValue()}`,
                'Content-Type': profileImage.type
            }
        };
        axios.post('https://localhost:5001/api/userdetail/UpdateUserDetail/' + activeUser.uid, data, config)
            .then((res) => {
                // console.log(res);
                if (res.status === 204) {
                    history.push('/user/' + activeUser.username);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m10 border radius-3 settings-container">
                    <div className="title border-bottom" style={{ paddingLeft: 20 }}>
                        <h3>Settings</h3>
                    </div>
                    <div className="container mt10">
                        <div className="row">
                            <form className="col s12" onSubmit={(e) => handleFormSubmit(e)}>
                                <div className="row">
                                    <div className="input-field col s12 l6">
                                        <input
                                            disabled
                                            placeholder="Username" id="username" type="text" className="validate"
                                            value={username}
                                        />
                                        <label htmlFor="username" className="active">Username</label>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <input
                                            disabled
                                            placeholder="Email Id" id="emailId" type="text" className="validate"
                                            value={emailId}
                                        />
                                        <label htmlFor="emailId" className="active">Email Id</label>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <input
                                            placeholder="first name" id="firstName" type="text" className="validate"
                                            value={firstName ? firstName : ''}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <label htmlFor="firstName" className="active">First Name</label>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <input
                                            placeholder="last name" id="lastName" type="text" className="validate"
                                            value={lastName ? lastName : ''}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        <label htmlFor="lastName" className="active">Last Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea
                                            id="bio" placeholder="Bio" className="materialize-textarea" data-length="120"
                                            value={bio ? bio : ''}
                                            onChange={(e) => setBio(e.target.value)}
                                        ></textarea>
                                        <label htmlFor="bio" className="active">Bio</label>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <div className="file-field input-field mxy0">
                                            <div className="waves-effect waves-light indigo darken-4 white-text btn btn-flat z-depth-0">
                                                <span>Profile Image</span>
                                                <input
                                                    type="file" id="profile-image-input"
                                                    accept=".jpg,.jpeg,.png"
                                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                                />
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" readOnly type="text" placeholder="select profile image" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <input
                                            placeholder="Location" id="location" type="text" className="validate"
                                            value={location ? location : ''}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                        <label htmlFor="location" className="active">Location</label>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <input
                                            placeholder="Github Link" id="githubLink" type="text" className="validate"
                                            value={githubLink ? githubLink : ''}
                                            onChange={(e) => setGithubLink(e.target.value)}
                                        />
                                        <label htmlFor="githubLink" className="active">Github Link</label>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <input
                                            placeholder="LinkedIn link" id="linkedInLink" type="text" className="validate"
                                            value={linkedInLink ? linkedInLink : ''}
                                            onChange={(e) => setLinkedInLink(e.target.value)}
                                        />
                                        <label htmlFor="linkedInLink" className="active">LinkedIn link</label>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <input
                                            placeholder="Stack Overflow Link" id="stackoverflowLink" type="text" className="validate"
                                            value={stackoverflowLink ? stackoverflowLink : ''}
                                            onChange={(e) => setStackoverflowLink(e.target.value)}
                                        />
                                        <label htmlFor="stackoverflowLink" className="active">Stack Overflow Link</label>
                                    </div>
                                    <div className="input-field col s12 l6">
                                        <input
                                            placeholder="Medium Link" id="mediumLink" type="text" className="validate"
                                            value={mediumLink ? mediumLink : ''}
                                            onChange={(e) => setMediumLink(e.target.value)}
                                        />
                                        <label htmlFor="mediumLink" className="active">Medium Link</label>
                                    </div>
                                    <div className="input-field col s12 l6 ">
                                        <input
                                            placeholder="External Website Link" id="externalWebsite" type="text" className="validate"
                                            value={externalWebsite ? externalWebsite : ''}
                                            onChange={(e) => setExternalWebsite(e.target.value)}
                                        />
                                        <label htmlFor="externalWebsite" className="active">External Website Link</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m6 offset-m3">
                                        <button
                                            className="waves-effect waves-light indigo darken-4 white-text btn btn-flat z-depth-0"
                                            style={{ width: "100%" }}
                                        >
                                            Update Details
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MySettings
