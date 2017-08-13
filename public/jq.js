$(document).ready(function(){
	if($(window).height() > $(window).width()){
		$('.stars').css('background-image','url("/public/starryvertical.png")');
		$('h1.heading').css('padding','0 10%');
		$('ul.og').css('margin-top', '23vh');
	}else if(($(window).width()-$(window).height())<100){
		$('ul.og').css('margin-top', '27vh');
	}else if(($(window).width()-$(window).height())<150){
		$('ul.og').css('margin-top', '20vh');
	}else{
		$('.stars').css('background-image', 'url("/public/starrybackground.png")');
		$('.sliding').css('background-image', 'url("/public/starrytopbackground.png")');
		$('h1.heading').css('padding','0 30%');
		$('ul.og').css('margin-top', '30vh');
	}
	var inFirstPage = false;

	$('#fullpage').fullpage({
		controlArrows: false,
		scrollingSpeed: 2000,
		onLeave: function(index, nextIndex, direction){
			var leavingSection = $(this);
			if(index == 2 && direction == 'up'){
				inFirstPage = true;
			}
			if(index == 2 && direction =='down'){
				$.fn.fullpage.setAllowScrolling(true, 'up');
				inFirstPage = false;
			}else{
				$.fn.fullpage.setAllowScrolling(false, 'up');
				inFirstPage = false;
			}
		}
	});
	$.fn.fullpage.setAllowScrolling(false, 'up');
	$.fn.fullpage.setKeyboardScrolling(false);

	$('html').css('visibility', 'visible');
});


$('.tar2').hover(function(){
	$('.learnmore').css('opacity','0.6');
	$('.learntext').css('margin-bottom', '10px');
	$('div.learnmore > ul').css('bottom', '30px');
}, function(){
	$('.learnmore').css('opacity','1.0');
	$('.learntext').css('margin-bottom', '20px');
	$('div.learnmore > ul').css('bottom', '35px');
});

$('.tars').click(function(){
// 	clickedLearnMore = true;
	$.fn.fullpage.moveTo(3,0);

});


$(window).resize(function(){
	if($(window).height() > $(window).width()){
		$('.stars').css('background-image','url("/public/starryvertical.png")');
		$('h1.heading').css('padding','0 15%');
		$('ul.og').css('margin-top', '18vh');
	}else if(($(window).width()-$(window).height())<100){
		$('ul.og').css('margin-top', '27vh');
	}else if(($(window).width()-$(window).height())<100){
		$('ul.og').css('margin-top', '27vh');
	}else{
		$('.stars').css('background-image', 'url("/public/starrybackground.png")');
		$('h1.heading').css('padding','0 30%');
		$('ul.og').css('margin-top', '30vh');
	}
});

$('button.start').click(function(){
	$.fn.fullpage.moveTo(1);
	$.fn.fullpage.setAllowScrolling(false, 'right');
	inFirstPage = true;
});

$('#firsta').click(function(){
	$.fn.fullpage.setAllowScrolling(false, 'down','right');
});
$('#firstback').click(function(){
	$.fn.fullpage.setAllowScrolling(true,'down');
	$.fn.fullpage.setAllowScrolling(false,'right');
});
$('.next').click(function(){
	$.fn.fullpage.moveSlideRight();
});
$('.back').click(function(){
	$.fn.fullpage.moveSlideLeft();
});




$('#addstep').click(function(e){
	e.preventDefault();
	$('#addstep').css('display', 'none');
	$('.hid').toggleClass('transform-button');
	$('.hid').css('position','relative');
	$('.hid').css('visibility','visible');
	setTimeout(
  function()
  {
		$('.hidden').css('visibility', 'visible');
  }, 300);
});
var clickedctwice = 0;
var clickedtwice = 0;
var clicked = 0;


var clickcountC = 1;
var clickcountT = 1;
var clickcountM = 1;

$('.taskoption').click(function(e){
	e.preventDefault();
	clicked++;
	if(clicked == 3){
		restorePlus(false);
		$('.dontworry').css('visibility', 'visible');
	}else{
		restorePlus(true);
	}
	var whichEventId = this.id;
	if(whichEventId == 'course'){
		$('#stepslist').append(appendStep('course'));
		clickcountC+=1;
	}else if(whichEventId == 'task'){
		$('#stepslist').append(appendStep('task'));
		clickcountT+=1;
	}else if(whichEventId == 'milestone'){
		$('#stepslist').append(appendStep('milestone'));
		clickcountM+=1;
	}

});
$("#revert").click(function(e){
	restorePlus(true);
});
function restorePlus(checked){
	$('.hid').css('position','absolute');
	$('.hid').css('visibility','hidden');
	$('.hid').removeClass('transform-button');
	$('.hidden').css('visibility', 'hidden');
	if(checked == true){
		$('#addstep').css('display', 'inline-block');
	}
}
function appendStep(stepType){
	var placeholder = '';
	if(stepType == 'course'){
		if(clickcountC == 1){
			placeholder = '(Node.js introductory course)';
		}else if(clickcountC == 2){
			placeholder = '(AngularJS introductory course)';
		}else if(clickcountC == 3){
			placeholder = '(Nike diet program 2017)';
		}
	}
	if(stepType == 'task'){
		if(clickcountT == 1){
			placeholder = '(Run 5km tomorrow)';
		}
		if(clickcountT == 2){
			placeholder = '(Solve math worksheets by tomorrow)';
		}
		if(clickcountT == 3){
			placeholder = '(Buy a new chair)';
		}
	}
	if(stepType == 'milestone'){
		if(clickcountM == 1){
			placeholder = '(Get to 35lb bicep curls)';
		}
		if(clickcountM == 2){
			placeholder = '(Run 5km everyday for two weeks)';
		}
		if(clickcountM == 3){
			placeholder = '(Final senior thesis)';
		}
	}
	var id = clicked;
	// console.log(id);
	// console.log(stepType);
	var newStep = `
	<li id="${id}option" class="stepslisteitem">
		<div class="stepoption ${stepType}"><span>${stepType}</span></div>
		<div class="asktitle">
			<input type="text" placeholder="Title this step. ${placeholder}"></input>
			<img class="delete ${id}" src="/public/delete.png"/>
		</div>
	</li>
	`
	return newStep;
}

$(document).on('click','.delete', function(e){
	$('#'+$(e.currentTarget).parent().parent()[0].id).remove();
	clicked--;
	if(clicked<3){
		restorePlus(true);
		$('.dontworry').css('visibility', 'hidden');
	}
	var type = $(e.currentTarget).parent().parent().children()[0].id;
	console.log(type);
	if(type == 'course'){
		clickcountC-=1;
	}else if(type == 'task'){
		clickcountT-=1;
	}else if(type == 'milestone'){
		clickcountM-=1;
	}
});



$(document).keypress(function(e) {
    if(e.which == 13 && inFirstPage) {
        $.fn.fullpage.moveSlideRight();
    }
});
