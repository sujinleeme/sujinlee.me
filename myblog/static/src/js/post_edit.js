/*
UPDATE : 2017.02.
AUTHOR : SUJIN LEE (sujinlee.me@gmail.com)
*/

var form = document.forms[0];


var formElement = {
    selectbox : form.querySelector('select'),
    bodytext : document.querySelector('textarea'),
    fields : form.querySelectorAll('input[type=text]'),
    submitButton : form.querySelector('input[type=submit]'),
    resetButton : form.querySelector('input[type=reset]')
}


var formEditor = {

    init : function() {
        this.enterBodyText();
        this.publish();
        this.reset();
    },


    enterBodyText : function() {
        formElement.bodytext.addEventListener('keydown', function(evt){
        let target = evt.target;
        setTimeout(function(){
            target.style.cssText = 'height:auto; padding:0';
            target.style.cssText = 'height:' + target.scrollHeight + 'px';
        },0); 
        });
    },


    validFieldCheck : function(){
        let category = formElement.selectbox;
        let file = form.querySelector('input[type=file]');

        validResult = (category.checkValidity());
        validResult = (file.checkValidity());

        formElement.fields.forEach(function(e){
            validResult = e.checkValidity();
        });
        return validResult;
    },


     publish : function() {
        formElement.submitButton.addEventListener('click', function(){
            valid = formEditor.validFieldCheck();
            if (valid) {
                let msg = confirm("Do you want to submit?");
                if (msg == true) {
                    form.submit();
                    alert("Post Sucessfully!");
                    form.reset();
                }
                else {
                    return false;
                }
            }
        });
    },


    reset : function() {
        formElement.resetButton.addEventListener('click', function(){
        let msg = confirm("Do you want to delete content?");
                if (msg == true) {
                    form.reset();
                    alert("Delete Content");   
                }
                else {
                    return false;
                }
        })
    }
}

formEditor.init();



