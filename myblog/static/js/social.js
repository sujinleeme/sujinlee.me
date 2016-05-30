/*- twitter -*/
var TWEET_URL = "https://twitter.com/intent/tweet";
$(".tweet").each(function() {
    var elem = $(this),
        // Use current page URL as default link
        url = encodeURIComponent(elem.attr("data-url") || document.location
            .href),
        // Use page title as default tweet message
        text = elem.attr("data-text") || document.title,
        via = elem.attr("data-via") || "",
        related = encodeURIComponent(elem.attr("data-related")) || "",
        hashtags = encodeURIComponent(elem.attr("data-hashtags")) || "";
    // Set href to tweet page
    elem.attr({
        href: TWEET_URL + "?hashtags=" + hashtags +
            "&original_referer=" + encodeURIComponent(document.location
                .href) + "&related=" + related +
            "&source=tweetbutton&text=" + text + "&url=" + url +
            "&via=" + via,
        target: "_blank"
    });
});

/*- facebook -*/
window.fbAsyncInit = function() {
    FB.init({
        appId: '1081681621896558',
        xfbml: true,
        version: 'v2.3'
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*- google plus -*/
function googleshare() {
    window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    return false;
}
