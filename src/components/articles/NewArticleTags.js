import React, { useState, useEffect } from 'react';
import './NewArticleTags.css';
import axios from 'axios'
// import { getArticeTagSuggestions } from '../helpers/getArticleTagSuggestions';

function NewArticleTags({ tags, setTags }) {
    const [suggestions, setSuggestions] = useState([]);

    const getArticeTagSuggestions = (targetTag) => {
        axios.get('https://localhost:5001/api/hashtags/GetHashtagSuggestions/' + targetTag)
            .then((res) => {
                setSuggestions(res.data);
            })
            .catch((error) => {
            })
    }

    const handleTextareaInputChange = (e) => {
        e.preventDefault();
        var tagsTextInput = e.target.value.split(" ");
        var targetTag = tagsTextInput[tagsTextInput.length - 1]
        if (targetTag.length > 2) {
            setSuggestions(getArticeTagSuggestions(targetTag));
        } else {
            setSuggestions([]);
        }
        setTags(tagsTextInput)
    }

    const handleSuggestionClick = (e, item) => {
        e.preventDefault();
        var tempTagList = tags.slice(0, -1);
        setTags([...tempTagList, item]);
        setSuggestions([]);
    }

    useEffect(() => {
        document.getElementById('tags').value = tags.join(" ")
        if (tags.length) {

        }
        document.getElementById('tags').focus();
    }, [tags])

    return (
        <div className="flex-col new-post-tag-container">
            <textarea
                className="browser-default new-post-textarea"
                placeholder="4 tags max"
                name="tags" id="tags" cols="" rows="1"
                onChange={(e) => handleTextareaInputChange(e)}
            ></textarea>
            {
                suggestions && suggestions.length > 0 ? (
                    <div className="tag-suggestions-container white" style={{ border: "solid 1px black" }}>
                        <ul className="mxy0">
                            {suggestions.map((item) => {
                                return (
                                    <li key={Math.floor(Math.random() * 10000)}
                                        className="suggestion px20 py15"
                                        value={item}
                                        onClick={(e) => handleSuggestionClick(e, item)}
                                    ><span>{`#${item}`}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ) : (
                        <></>
                    )
            }

        </div>
    )
}

export default NewArticleTags
