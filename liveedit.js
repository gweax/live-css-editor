(function() {

    var html = location.search.match(/(?:[?&])html=([^&]*)/),
        css = location.search.match(/(?:[?&])css=([^&]*)/);

    if (html) {
        document.getElementById('html').value = decodeURIComponent(html[1]);
    }

    if (css) {
        document.getElementById('css').innerHTML = decodeURIComponent(css[1]);
    }

}());

(function() {

    var elementBlacklist = {
        SCRIPT: true,
        HTML: true,
        BODY: true,
        STYLE: true,
        HEAD: true,
        LINK: true,
        IFRAME: true,
        BASE: true,
        META: true,
        EMBED: true,
        OBJECT: true
    };

    function createDocumentFragment(str) {
        return document.createRange().createContextualFragment(str);
    }

    function sanitizeHTML(node) {
        if (!node) { return; }

        if (elementBlacklist[node.nodeName] && node.parentNode) {
            node.parentNode.removeChild(node);
        } else {
            sanitizeHTML(node.nextElementSibling);
            sanitizeHTML(node.firstElementChild);
        }
    }

    function insertHTML(fragment) {
        var target = document.getElementById('result');

        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }

        target.appendChild(fragment);
    }

    function checkAndInsertHTML(event) {
        var html = event.target.value;

        var fragment = createDocumentFragment(html);

        sanitizeHTML(fragment);

        insertHTML(fragment);
    }

    var htmlArea = document.getElementById('html');
    htmlArea.addEventListener('keyup', checkAndInsertHTML, false);

    checkAndInsertHTML({
        target: htmlArea
    });

}());
