export const getArticleReadingTime = (length) => {
    const charPerWord = 5;
    const readingSpeed = 250;
    var readingTime = Math.round((length / (charPerWord * readingSpeed)))
    return (readingTime < 1 ? 1 : readingTime)
}