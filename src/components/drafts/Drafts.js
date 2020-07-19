import React from 'react';
import './Drafts.css';
import { useState } from 'react';
import { useContext } from 'react';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import DraftCard from './DraftCard';
import axios from 'axios';


function Drafts() {
    const [draftList, setDraftList] = useState([]);

    const { activeUser, getBearerTokenValue } = useContext(AuthContext);
    const routeMatch = useRouteMatch();

    useEffect(() => {
        if (activeUser.uid) {
            let config = {
                headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
            };

            axios.get(`https://localhost:5001/api/drafts/GetDraftsByUserId/${activeUser.uid}`, config)
                .then((res) => {
                    setDraftList(res.data);
                })
        }
    }, [])

    if (!activeUser.uid) {
        return <Redirect to={{ pathname: '/signin', state: { from: routeMatch.path } }} />
    }

    const handleDiscardDraft = (e, draftid) => {
        let config = {
            headers: { Authorization: `Bearer ${getBearerTokenValue()}` }
        };

        axios.delete('https://localhost:5001/api/drafts/' + draftid, config)
            .then((res) => {
                if (res.status == 204) {
                    axios.get(`https://localhost:5001/api/drafts/GetDraftsByUserId/${activeUser.uid}`, config)
                        .then((res) => {
                            setDraftList(res.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="reading-list-wrapper border white my20 radius-5">
                        <div className="title grey lighten-3">
                            <h4 className="mxy0 py20 px20">Drafts</h4>
                        </div>
                        <div className="reading-list">
                            {draftList && draftList.length > 0 ? (
                                draftList.map((draft) => {
                                    return <DraftCard key={draft.id} draft={draft}
                                        handleDiscardDraft={handleDiscardDraft} />
                                })
                            ) : (
                                    <div className="m20 p20">
                                        <h6>Drafts Empty...</h6>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drafts
