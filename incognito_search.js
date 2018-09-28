function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

chrome.contextMenus.create({
    id: "incognito-search",
    title: "Search Incognito for “%s”",
    contexts: ["selection"],
    });

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "incognito-search") {
        let searchText = info.selectionText;
        chrome.windows.create({
            "url": "http://www.google.com/search?q=" + fixedEncodeURIComponent(searchText),
            "incognito": true
        });
    }
});
