/*-- Spend Textarea by enter key --*/
var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', function(evt){
    let target = evt.target;
    setTimeout(function(){
        target.style.cssText = 'height:auto; padding:0';
        target.style.cssText = 'height:' + target.scrollHeight + 'px';
    },0);
    
});
    