export var md = require('markdown-it')({
    breaks: true,
    linkify: true,
    typographer: true
})
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-abbr'));