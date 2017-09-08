/* code by 
http://sixthform.info/katex/guide.html
*/
function katexRender() {
	  // replace text dollar signs by %​% temporarily then
	  // replace $...$ by <span class="maths">...</span>
	  // regular expression \$([\s\S]+?)\$/g consists of all whitespace \s 
	  // and non-whitespace characters \S between the dollar signs. See [4]
	document.body.innerHTML = document.body.innerHTML.replace(/\\\$/g, '\%\%');
	document.body.innerHTML = document.body.innerHTML.replace(/\$([\s\S]+?)\$/g, '<span class=\"maths\">$1</span>');
	  // replace \[ ...\] by <div class="maths"> ... </div>
	  // but don't replace eg \\[1ex] so temporarily rename them
	document.body.innerHTML = document.body.innerHTML.replace(/\\\\\[/g, '%​%​%');
	document.body.innerHTML = document.body.innerHTML.replace(/\[/g, '<div class=\"maths\">');
	document.body.innerHTML = document.body.innerHTML.replace(/\]/g, '</div>');
	  // put back eg \\[1ex]
	document.body.innerHTML = document.body.innerHTML.replace(/%​%​%/g, '\\\\\[');
	  // replace \( ...\) by <span class="maths"> ... </span>
	document.body.innerHTML = document.body.innerHTML.replace(/\(/g, '<span class=\"maths\">');
	document.body.innerHTML = document.body.innerHTML.replace(/\)/g, '</span>');
	  // put back text dollar signs
	document.body.innerHTML = document.body.innerHTML.replace(/\%\%/g, '\$');
	
	  // Get all <div or span or p class ="maths"> elements in the document
	var x = document.getElementsByClassName('maths');

	  // go through each of them in turn
	for (var i = 0; i < x.length; i++) {
	try {
		if(x[i].tagName == "DIV"){
			t= katex.render(x[i].textContent,x[i],{ displayMode: true }); 
		} else {
			t= katex.render(x[i].textContent,x[i]);
		}
	}
	catch(err) {
		x[i].style.color = 'red';
		x[i].textContent= err;
		}
	}
	  // Optional. Allows use of delimiters in document without them being replaced
	  // Use \$ or %​% for $, %​[ for \[, %​] for \], %​( for \(, %​) for \)
	  // the following will convert them to the appropriate delimiters
	document.body.innerHTML = document.body.innerHTML.replace(/\%\\[/g, '\\\[');
	document.body.innerHTML = document.body.innerHTML.replace(/\%\\]/g, '\\\]');
	document.body.innerHTML = document.body.innerHTML.replace(/\%\\(/g, '\\\(');
	document.body.innerHTML = document.body.innerHTML.replace(/\%\\)/g, '\\\)');
}

