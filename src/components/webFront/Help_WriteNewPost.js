import React from 'react'
import '../articles/NewArticle.css'
function Help_WriteNewPost() {

    var md = require('markdown-it')({
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

    const data = '## **Editor Guide!!**\n**Devcom uses Markdown to write articles.**\nMarkdown allows to very easily add styles to the text.\n\n## Markdown Basics:\n\n### Headings:\n---\n# h1 Heading\n## h2 Heading\n### h3 Heading\n#### h4 Heading\n##### h5 Heading\n###### h6 Heading\n```\nhow to write heading:\n# h1 Heading\n## h2 Heading\n### h3 Heading\n#### h4 Heading\n##### h5 Heading\n###### h6 Heading\n```\n\n## Horizontal Rules\n___\n---\n***\n```\n___\n---\n***\n```\n\n## Emphasis\n---\n**This is bold text**\n\n__This is bold text__\n\n*This is italic text*\n\n_This is italic text_\n\n~~Strikethrough~~\n\n```\n**This is bold text**\n\n__This is bold text__\n\n*This is italic text*\n\n_This is italic text_\n\n~~Strikethrough~~\n```\n## Blockquotes\n---\n\n> Blockquotes can also be nested...\n>> ...by using additional greater-than signs right next to each other...\n> > > ...or with spaces between arrows.\n\n```\n> Blockquotes can also be nested...\n>> ...by using additional greater-than signs right next to each other...\n> > > ...or with spaces between arrows.\n```\n\n## Lists\n---\nUnordered\n\n+ Create a list by starting a line with `+`, `-`, or `*`\n+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    * Ac tristique libero volutpat at\n    + Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n+ Very easy!\n```\n\n+ Create a list by starting a line with `+`, `-`, or `*`\n+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    * Ac tristique libero volutpat at\n    + Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n+ Very easy!\n```\n\nOrdered\n---\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n```\n\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n```\n\n\n1. You can use sequential numbers...\n1. ...or keep all the numbers as `1.`\n\nStart numbering with offset:\n\n57. foo\n1. bar\n\n```\n\n57. foo\n1. bar\n```\n\n\n## Code\n---\nInline `code`\n```\nInline `code`\n```\n\nBlock code "fences"\n\n```\nSample text here...\n```\n```\n`` `\nSample text here...\n`` `\n```\n\n\n## Tables\n---\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n```\n\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n```\n\nRight aligned columns\n\n| Option | Description |\n| ------:| -----------:|\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\n```\n| Option | Description |\n| ------:| -----------:|\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n```\n\n## Links\n---\n[link text](http://dev.nodeca.com)\n\n[link with title](http://nodeca.github.io/pica/demo/ "title text!")\n\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\n\n```\n[link text](http://dev.nodeca.com)\n\n[link with title](http://nodeca.github.io/pica/demo/ "title text!")\n\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\n```\n\n\n## Images\n---\n![Minion](https://octodex.github.com/images/minion.png)\n```\n![Minion](https://octodex.github.com/images/minion.png)\n```\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")\n```\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")\n```\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"\n```\n[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"\n```\n### [Emojies](https://github.com/markdown-it/markdown-it-emoji)\n---\n> Classic markup: :wink: :cry: :laughing: :yum:\n```\n> Classic markup: :wink: :cry: :laughing: :yum:\n```\n>\n> Shortcuts (emoticons): :-) :-( 8-) ;)\n```\n> Shortcuts (emoticons): :-) :-( 8-) ;)\n```\n\n\n### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)\n---\n- 19^th^\n- H~2~O\n```\n- 19^th^\n- H~2~O\n```\n\n\n---\n++Inserted text++\n```\n++Inserted text++\n```\n\n---\n==Marked text==\n```\n==Marked text==\n```\n\n\n### [Footnotes]\n---\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n[^first]: Footnote **can have markup**\n\n    and multiple paragraphs.\n\n[^second]: Footnote text.\n\n```\n\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n[^first]: Footnote **can have markup**\n\n    and multiple paragraphs.\n\n[^second]: Footnote text.\n\n```\n\n### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)\n---\nThis is HTML abbreviation example.\n\nIt converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.\n\n*[HTML]: Hyper Text Markup Language\n```\nThis is HTML abbreviation example.\n\nIt converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.\n\n*[HTML]: Hyper Text Markup Language\n```';


    return (
        <div className="container">
            <div className="row">
                <div className="col s12 l10 offset-l1 xl8 offset-xl2 border radius-5 my20 white">
                    <div className="rendered-post">
                        <div className="rendered-body">
                            <p dangerouslySetInnerHTML={{ __html: md.render(data) }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Help_WriteNewPost
