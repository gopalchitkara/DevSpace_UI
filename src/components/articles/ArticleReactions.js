import React from 'react';
import { GetMarkdownEmoji } from '../helpers/GetMarkdownEmoji'
import './ArticleReactions.css';

function ArticleReactions() {

    const handleLikeBtnClick = (e) => {
        e.preventDefault();
        if (document.querySelector(".like-btn").classList.contains('like-active')) {
            document.querySelector(".like-btn").classList.remove('like-active');
        } else {
            document.querySelector(".like-btn").classList.add('like-active');
        }
    }

    return (
        <div className="white border radius-5 my20 p15">
            <div className="row mxy0">
                <div className="col s6" style={{ padding: 0, paddingRight: 5 }}>
                    <button
                        className="like-btn btn-small waves-effect btn-flat flex-row items-center fullwidth"
                        onClick={(e) => handleLikeBtnClick(e)}
                    >
                        <GetMarkdownEmoji emoji={':heart:'} classes={'mxy0'} />
                        <span>{10} bytes</span>
                    </button>
                </div>
                <div className="col s6" style={{ padding: 0, paddingLeft: 5 }}>
                    <button className="save-btn btn-small waves-effect btn-flat flex-row items-center fullwidth">
                        <GetMarkdownEmoji emoji={':floppy_disk:'} classes={'mxy0'} />
                        <span>{10} Saves</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ArticleReactions
