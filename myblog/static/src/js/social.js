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


/*-- social popup UI --*/
// (function($){
//   $.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {

//     // Prevent default anchor event
//     e.preventDefault();

//     // Set values for window
//     intWidth = intWidth || '500';
//     intHeight = intHeight || '400';
//     strResize = (blnResize ? 'yes' : 'no');

//     // Set title and open popup with focus on it
//     var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
//         strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
//         objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
//   }
//   // pop new window
//   $(document).ready(function ($) {
//     $('.customer.share').on("click", function(e) {
//       $(this).customerPopup(e);
//     });
//   });

// }(jQuery));
