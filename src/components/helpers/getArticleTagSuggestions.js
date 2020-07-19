export const getArticeTagSuggestions = (tagInput) => {
    var tempTagList = [
        "react", "webdev", "reactnative", "redux", "developer", "designer", "context", "hooks", "contextapi",
        "dotnet", "csharp", "html", "css", "razor", "dotnetcore", "api", "webapi", "restapi", "restfull",
        "help", "discuss", "backend", "frontend"
    ]

    var searchResult = tempTagList.filter(item => item.includes(tagInput))

    return searchResult;
} 