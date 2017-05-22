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
    tagsField : form.querySelector('.tags_field'),
    tagsInput : document.getElementById('id_tag')
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


        formElement.tagsField.insertAdjacentHTML('afterbegin', '<div class=tag-group></div>');
        
        tagGroup = formElement.tagsField.children[0];
        
        function addNewTag(tag){
            tagList.push(tag);
            formElement.tagsField.children[0].insertAdjacentHTML('beforeend', '<div class="tag">'+newTag+'</div>');
        }
        
        
        
        formElement.tagsInput.addEventListener('keydown', function(evt){
            
            if (!evt.target.matches("#id_tag")){
                return;
            }

            //insert new tag
            if ((evt.keyCode == 13) || (evt.keyCode == 188)){
                str = this.value.split(",");
                newTag = str.slice(-1)[0].replace(/\s/g,'');

                if (!/^[a-zA-Z]+$/.test(newTag)){
                    error = "Tags only support English letters.";
                    formEditor.message(error);
                    return;
                }
                else {
                    console.log(tagList[tagList.length - 1], newTag);
                    addNewTag(newTag);
                    


                    setTimeout(function(){ 
                    formElement.tagsInput.value = "";},
                    10);
            
                    // if (tagList.length === 0) {
                       
                    // }
                    // else {
                    //     for (let i = 0; i < tagList.length; i++) {
                    //         if(tagList[i] === newTag){
                    //             console.log("noe");
                    //             return false;
                    //         }
                    //         else {
                    //             addNewTag(newTag);
                    //         }
                    //     // if (newTag in tagList){
                    //     //     console.log("no")
                    //     // }
                    // };
                    }
                    // for (let i = 0; i < tagList.length; i++) { 
                    //     if (tagList[i] !== newTag){
                    //         console.log(tagList[i], tagList);
                            
                    //     }
                    // };

                    
                    
                    //tagList.push(newTag);
                    console.log(tagList);
                    this.value = "";



                }
               
               
            

            //delete last tag element
            if (evt.keyCode == 8){
                tagGroup.removeChild(tagGroup.lastElementChild);
                tagList.pop();
                console.log(tagList);
            }

    });

        tagGroup.addEventListener('click', function(evt){
            let target = evt.target;

            if (target.className === "tag") {
                tagIndex = [].indexOf.call (target.parentNode.children, target);
                tagList.splice(tagIndex, 1);
                tagGroup.removeChild(target);
            };
        });
        
        // tagItem.forEach(function(tag){
        //     tag.addEventListener("click", function(evt){
        //         console.log('hi');
        //         // evt.preventDefault();
        //         // evt.stopPropagation();
        //         // window.open(this.href);
        // })
        // });
        

        

    },

    message : function(msg){
        msgBox.className += " _show";
        msgBox.innerText = msg;
        setTimeout(function(){ 
            msgBox.className = msgBox.className.replace("_show", "");
        }, 3000);
    }


    //formElement.tagsInput.value(;)


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


form.onkeypress = function(e) {
  var key = e.charCode || e.keyCode || 0;     
  if (key == 13) {
    e.preventDefault();
  }
}