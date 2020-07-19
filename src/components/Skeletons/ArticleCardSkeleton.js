import React from 'react'

function ArticleCardSkeleton() {

    const storySkeletonAvatar = {
        height: 30,
        width: 30,
        backgroundColor: "#f4f4f4",
        borderRadius: "50%"
    }

    const storySkeletonContentrow = {
        height: 25,
        width: "80%",
        backgroundColor: "#f4f4f4",
        marginBottom: 20,
        marginLeft: 10
    }

    return (
        <div className="article-story flex-row white p10 radius-5 my10" style={{ minHeight: 180 }}>
            <span style={storySkeletonAvatar} ></span>
            <span className="flex-col" style={{ display: "block", width: "100%" }}>
                <div style={storySkeletonContentrow}></div>
                <div style={storySkeletonContentrow}></div>
                <div style={storySkeletonContentrow}></div>
            </span>
        </div>
    )
}

export default ArticleCardSkeleton
