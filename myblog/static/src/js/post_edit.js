/*
UPDATE : 2017.02.
AUTHOR : SUJIN LEE (sujinlee.me@gmail.com)
*/

var form = document.forms[0];
var msgBox = document.getElementsByClassName('message')[0];

var formElement = {
    selectbox : form.querySelector('select'),
    bodytext : document.querySelector('textarea'),
    fields : form.querySelectorAll('input[type=text]'),
    submitButton : form.querySelector('input[type=submit]'),
    resetButton : form.querySelector('input[type=reset]'),
    tags : document.getElementById('id_tag')
}






var formEditor = {

    init : function() {

        this.publish();
        this.reset();
        this.tag();

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
            required = form.querySelectorAll("[required]")
            valid = formEditor.validFieldCheck();
            if (valid) {
                let msg = confirm("Do you want to submit?");
                if (msg) {
                    alert("Post Sucessfully!");
                    form.summit();
                    
                }
                else {
                    return false;
                }
            }
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
    },

    tag : function() {
        tagList = [];
        formElement.tags.addEventListener('keydown', function(evt){
            if (!evt.target.matches("#id_tag")){
                return;
            }
          
            if ((evt.keyCode == 13) || (evt.keyCode == 188)){
                str = formElement.tags.value.split(",");
                newTag = str.slice(-1)[0].replace(/\s/g,'');
                if (!/^[a-zA-Z]+$/.test(newTag)){
                    error = "Tags only support letters.";
                    formEditor.message(error);
                    return;
                }
                else if (newTag in tagList){
                    console.log(newTag);
                }
                
                tagList.push(newTag);

            }
        })
    },

    message : function(msg){
        msgBox.className += " _show";
        msgBox.innerText = msg;
        setTimeout(function(){ 
            msgBox.className = msgBox.className.replace("_show", "");
        }, 3000);
    }


}

formEditor.init();

var simplemdeEditor = new SimpleMDE({
    autofocus: true,
    autosave: {
        enabled: true,
        uniqueId: "save",
        delay: 1000
    }
});