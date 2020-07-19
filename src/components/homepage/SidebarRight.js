import React, { useState, useEffect, Fragment } from 'react'
import './SidebarRight.css'
import SidebarWidget from './sidebarRightElements/SidebarWidget'
import axios from 'axios';

function SidebarRight() {
    const [widgetTopics, setWidgetTopics] = useState([]);
    const abortController = new AbortController();

    useEffect(() => {
        axios.get('https://localhost:5001/api/hashtags/GetHashtagsForWidgets')
            .then((res) => {
                // console.log(res.data)
                setWidgetTopics(res.data);
            })
            .catch((error) => {
                console.log(error)
            })

        return function cleanup() {
            abortController.abort();
        }
    }, [])


    return (
        <div className="sidebar-right flex-col">
            {widgetTopics && widgetTopics.length > 0 ? (
                <Fragment>
                    {widgetTopics.map((topic) => {
                        return <SidebarWidget key={topic.id} topic={topic.description} />
                    })}
                </Fragment>
            ) : (
                    <div style={{ textAlign: "center" }}>
                        Loading...
                    </div>
                )}
        </div>
    )
}

export default SidebarRight
