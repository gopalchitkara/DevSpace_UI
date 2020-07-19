import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import './NewArticle.css'
import { AuthContext } from '../../contexts/AuthContext';
import moment from 'moment';
import NewArticleTags from './NewArticleTags';
import { addAutoResize } from '../helpers/addAutoResizeToTextareas';
import { md } from '../helpers/markdownWithPlugins';
import axios from 'axios';

function NewArticle() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [body, setBody] = useState('');
    const [preview, togglePreview] = useState(false);
    const [renedredBody, setRenedredBody] = useState('');

    const { activeUser, getBearerTokenValue } = useContext(AuthContext);

    const routeMatch = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        addAutoResize('[data-autoresize]');
        var localArticle = JSON.parse(localStorage.getItem('newLocalArticle'));
        if (localArticle) {
            setTitle(localArticle.title);
            setTags(localArticle.tags);
            setBody(localArticle.body);
        }
        else {
            localStorage.setItem('newLocalArticle', JSON.stringify({ 'title': title, 'tags': tags, 'body': body }));
        }
        // eslint-disable-next-line
    }, [preview]);

    useEffect(() => {
        localStorage.setItem('newLocalArticle', JSON.stringify({ 'title': title, 'tags': tags, 'body': body }));
    }, [title, tags, body])

    useEffect(() => {
        var renderedBody = document.querySelector('.rendered-body');
        if (renderedBody) {
            var renderedBodyDefaults = [...(renderedBody.querySelectorAll('h1, h2, h3, h4, h5, h6, p, blockquote, ul, ol, li, pre, code, img, span, table, thead, tbody, tr, td, a, ins, mark, sup, sub, dt, dl, dd, strong'))];
            // eslint-disable-next-line
            renderedBodyDefaults.map((el) => {
                el.classList.add('browser-default')
            })
        }
    }, [renedredBody]);

    if (!activeUser.uid) {
        return <Redirect to={{ pathname: '/signin', state: { from: routeMatch.path } }} />
    }

    const handlePreviewClick = (e) => {
        e.preventDefault();
        setRenedredBody(md.render(body));
        togglePreview(!preview);
        addAutoResize();
    }

    const handleDiscardClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('newLocalArticle');
        history.goBack();
    }

    const handleSaveClick = (e) => {
        e.preventDefault();
        var data = {
            "Title": title,
            "Hashtags": tags,
            "Body": JSON.stringify(body),
            "AuthorId": activeUser.uid,
        }

        let config = {
            headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
        };

        axios.post('https://localhost:5001/api/drafts', data, config)
            .then((res) => {
                if (res.status === 201) {
                    localStorage.removeItem('newLocalArticle');
                    history.push('/drafts');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handlePublishClick = (e) => {
        e.preventDefault();
        var data = {
            "Title": title,
            "Hashtags": tags,
            "Body": JSON.stringify(body),
            "AuthorId": activeUser.uid,
            "AuthorUsername": activeUser.username
        }
        // console.log(data);

        let config = {
            headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
        };
        axios.post('https://localhost:5001/api/articles', data, config)
            .then((res) => {
                // console.log(res);
                if (res.status === 201) {
                    // console.log('article created')
                    localStorage.removeItem('newLocalArticle');
                    history.push('/');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="">
            <div className="container new-post-container">
                <div className="row ">
                    <div className="col s12 l11 xl9 new-post-wrapper ">
                        <div className="new-post p10 mx15 border radius-5 white ">
                            {preview ? (
                                <div className="rendered-post">
                                    <div className="rendered-title">
                                        <h2>{title}</h2>
                                    </div>
                                    <div className="rendered-publish-detials">
                                        <p className="profile">- {activeUser.name}</p>
                                        <p className="date grey-text text-darken-2">{moment(new Date()).format("MMM Do YY")}</p>
                                    </div>
                                    <div className="rendered-tags">
                                        <p>{tags ? tags.join(" ") : ''}</p>
                                    </div>
                                    <div className="rendered-body">
                                        <p dangerouslySetInnerHTML={{ __html: renedredBody }} />
                                    </div>
                                </div>
                            ) : (
                                    <form>
                                        <div className="new-post-header">
                                            <div className="new-post-title">
                                                <textarea
                                                    className="browser-default new-post-textarea"
                                                    placeholder="Title" data-autoresize
                                                    name="title" id="title" cols="" rows="1"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className="new-post-tags">
                                                {/* <textarea
                                                    className="browser-default new-post-textarea"
                                                    placeholder="4 tags max"
                                                    name="tags" id="tags" cols="" rows="1"
                                                    onChange={(e) => setTags((e.target.value).split(" "))}
                                                ></textarea> */}
                                                <NewArticleTags tags={tags} setTags={setTags} />
                                            </div>
                                        </div>
                                        <div className="new-post-body">
                                            <textarea
                                                className="browser-default new-post-textarea"
                                                placeholder="Body" data-autoresize
                                                name="body" id="body" cols="" rows="30"
                                                value={body}
                                                onChange={(e) => setBody(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </form>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="new-post-nav ">
                <div className="nav-options flex-row justify-center items-center white border-top">
                    <button
                        onClick={(e) => handlePreviewClick(e)}
                        className="waves-effect waves-dark grey lighten-2 btn btn-flat mx10 z-depth-0"
                    >{preview ? ('Edit') : ('Preview')}</button>
                    <button
                        onClick={() => history.push('/help/writenewarticle')}
                        className="waves-effect waves-dark grey lighten-2 btn btn-flat mx10 z-depth-0 hide-on-small-only"
                    >Guide</button>
                    <button
                        onClick={(e) => handleDiscardClick(e)}
                        className="waves-effect waves-dark grey lighten-2 btn btn-flat mx10 z-depth-0"
                    >Discard</button>
                    <button
                        onClick={(e) => handleSaveClick(e)}
                        className="waves-effect waves-dark grey lighten-2 btn btn-flat mx10 z-depth-0"
                    >Save</button>
                    <button
                        onClick={(e) => handlePublishClick(e)}
                        className="waves-effect waves-light indigo darken-4 white-text btn btn-flat mx10 z-depth-0"
                    >Publish</button>
                </div>
            </div>
        </div>
    )
}

export default NewArticle
