/*
UPDATE : 2017.02.
AUTHOR : SUJIN LEE (sujinlee.me@gmail.com)
*/

/*-- Spend Textarea by enter key --*/
let textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', function(evt){
    let target = evt.target;
    setTimeout(function(){
        target.style.cssText = 'height:auto; padding:0';
        target.style.cssText = 'height:' + target.scrollHeight + 'px';
    },0); 
});



const form = document.forms[0];
let select = form.querySelector('select'); 
let fields = form.querySelectorAll('input[type=text]');
let fileVolume = form.querySelector('input[type=file]').files.length;
let category = select.options[select.selectedIndex].value;



 fields.forEach(function(e){
     fields[e] = e.value.length;
        // if (e.value.length === 0){
        //     result = false;
        // }
    });

console.log(fields);

    
const submitButton = form.querySelector('input[type=submit]');


function chkFormValidation(){
    result = true;
    
if (fileVolume == 0 || category.length) {
        result = false;
    }
   


    return result;
}




submitButton.addEventListener('click', function(evt){

    
    console.log(a);
    if (chkFormValidation()){
        confirm('Do you want to submit?');

    }
    else {
        return false;
    }
    
// 1. form validate 
    // if (confirm('Do you want to submit?')) {
    //     form.submit();
    // } else {

    //     return false;
    // }
});




function validateForm() {
    var x = document.forms["blogForm"]["fname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}
