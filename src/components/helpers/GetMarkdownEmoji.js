import React from 'react'

export const GetMarkdownEmoji = ({ emoji, classes }) => {
    var md = require('markdown-it')();
    md.use(require('markdown-it-emoji'));
    return <span className={"line-height-0 " + classes} dangerouslySetInnerHTML={{ __html: md.render(emoji) }} />
}
