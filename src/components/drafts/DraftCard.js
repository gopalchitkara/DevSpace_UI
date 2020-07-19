import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './DraftCard.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Drafts from './Drafts';

function DraftCard({ draft, handleDiscardDraft }) {
    const [localArticleUpdated, setLocalArticleUpdated] = useState(false);
    const history = useHistory();

    const handleEditDraft = (e) => {
        e.preventDefault();
        var localArticle = localStorage.getItem('newLocalArticle');

        if (localArticle) {
            localStorage.removeItem('newLocalArticle');
        }

        var hashtags = draft.hashtags.map((tag) => tag.description);

        localStorage.setItem('newLocalArticle', JSON.stringify({
            'title': draft.title,
            'tags': hashtags,
            'body': JSON.parse(draft.body)
        }));

        setLocalArticleUpdated(true);
    }

    useEffect((e) => {
        if (localArticleUpdated) {
            handleDiscardDraft(e, draft.id)
            history.push('/newarticle')
        }
    }, [localArticleUpdated])

    return (
        <div className="row mxy0 px20 py10 border-bottom bg-on-hover" style={{ minHeight: 100 }}>
            <div className="col s8">
                <h5 className="bold mxy0">{draft.title}</h5>
            </div>
            <div className="col s4 flex-row justify-flex-end">
                <button
                    onClick={(e) => handleEditDraft(e)}
                    className="btn-small waves-effect waves-dark btn-flat grey lighten-3 border"
                >Edit</button>
                <button
                    onClick={(e) => handleDiscardDraft(e, draft.id)}
                    className="btn-small waves-effect waves-dark btn-flat red lighten-1 white-text ml10"
                >Discard</button>
            </div>
            <div className="col s12">
                {draft.hashtags && draft.hashtags.length > 0 ? (
                    draft.hashtags.map((hashtag) => {
                        return (
                            <span className="draft-tag-link grey-text text-darken-2"
                                key={Math.floor(Math.random() * 1000000)}>
                                {`#${hashtag.description}`}
                            </span>
                        )
                    })
                ) : (<></>)}
            </div>
            <div className="col s12">
                <p style={{ marginTop: 5, marginBottom: 0 }}>{JSON.parse(draft.body).slice(0, 80)}</p>
            </div>
        </div>
    )
}

export default DraftCard
