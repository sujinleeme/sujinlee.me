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
    resetButton : form.querySelector('input[type=reset]'),
    tags : document.getElementById('id_tag')
}



console.log(formElement.tags.value);



var formEditor = {

    init : function() {
        // this.enterBodyText();
        this.publish();
        this.reset();

    },


    // enterBodyText : function() {
    //     formElement.bodytext.addEventListener('keydown', function(evt){
    //     let target = evt.target;
    //     setTimeout(function(){
    //         target.style.cssText = 'height:auto; padding:0';
    //         target.style.cssText = 'height:' + target.scrollHeight + 'px';
    //     },0); 
    //     });
    // },


    validFieldCheck : function(){
        
        formElement.bodytext.innerHTML = simplemdeEditor.value();
        for (let i = 0; i < required.length; i++) { 
            if (!required[i].checkValidity()){
                return false;         
            }
        };
        return true;
    },


     publish : function() {
         formElement.submitButton.addEventListener('click', function(evt){
             evt.stoppropagation()
            // required = form.querySelectorAll("[required]")
            // valid = formEditor.validFieldCheck();
            // if (valid) {
            //     let msg = confirm("Do you want to submit?");
            //     if (msg) {
            //         alert("Post Sucessfully!");
            //         form.summit();
                    
            //     }
            //     else {
            //         return false;
            //     }
            // }
        });
        // formElement.submitButton.addEventListener('click', function(){
        //     required = form.querySelectorAll("[required]")
        //     valid = formEditor.validFieldCheck();
        //     if (valid) {
        //         let msg = confirm("Do you want to submit?");
        //         if (msg) {
        //             alert("Post Sucessfully!");
        //             form.summit();
                    
        //         }
        //         else {
        //             return false;
        //         }
        //     }
        // });
    },


    reset : function() {
        formElement.resetButton.addEventListener('click', function(){
            let msg = confirm("Do you want to delete content?");
                if (msg) {
                    form.reset();
                    alert("Delete Content");   
                }
                else {
                    return false;
                }
        });
    }
}

formEditor.init();





var simplemdeEditor = new SimpleMDE({
    autofocus: true,
    autosave: {
        enabled: true,
        delay: 1000
    }
});
// console.log(;
// simplemde.codemirror.on("change", function(){
//     console.log(simplemde.value().length);
// });
