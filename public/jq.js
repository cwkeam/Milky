// var clickedLearnMore = false;

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

	$('#fullpage').fullpage({
		controlArrows: false,
		scrollingSpeed: 2000,
		onLeave: function(index, nextIndex, direction){
			var leavingSection = $(this);
			console.log(index);
			if(index == 2 && direction =='down'){
				$.fn.fullpage.setAllowScrolling(true, 'up');
			}else{
				$.fn.fullpage.setAllowScrolling(false, 'up');
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
$('.taskoption').click(function(e){
	e.preventDefault();
	clicked++;
	$('.hid').css('position','absolute');
	$('.hid').css('visibility','hidden');
	$('.hid').removeClass('transform-button');
	$('.hidden').css('visibility', 'hidden');
	if(clicked == 3){
		$('.dontworry').css('visibility', 'visible');
	}else{
		$('#addstep').css('display', 'inline-block');
	}
	var whichEventId = this.id;
	if(whichEventId == 'course'){
		$('#stepslist').append(appendStep('course', '(Node.js introductory course)'));
		clickedctwice++;
	}else{
		$('#stepslist').append(appendStep('task', '(Finish coding Milky)'));
		clickedtwice++;
	}

});

function appendStep(stepType, place){
	var placeholder = place;
	if(clickedtwice == 1){
		placeholder = '(Bicep curl 35lb)';
	}else if(clickedtwice == 2){
		placeholder = '(Finish coding first website)';
	}
	if(clickedctwice == 1){
		placeholder = '(AngularJS course)';
	}else if(clickedctwice == 2){
		placeholder = '(Python tutorial series youtube)';
	}
	var newStep = `
	<li class="stepslisteitem">
		<div class="stepoption ${stepType}"><span>${stepType}</span></div>
		<div class="asktitle">
			<input type="text" placeholder="Title this step. ${placeholder}"></input>
		</div>
	</li>
	`
	return newStep;
}
