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
			console.log(index);
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
		$('#stepslist').append(appendStep('course', '(Node.js introductory course)',clicked));
		clickedctwice++;
	}else if(whichEventId == 'task'){
		$('#stepslist').append(appendStep('task', '(Finish coding Milky)',clicked));
		clickedtwice++;
	}else if(whichEventId == 'milestone'){
		$('#stepslist').append(appendStep('milestone', '(50 minutes workout every day for 3 months)',clicked));
		clickedtwice++;
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

function appendStep(stepType, place, id){
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

$('.delete').click(function(event){
	console.log(this.id);
});

$(document).on('click','.delete', function(e){
	$('#'+$(e.currentTarget).parent().parent()[0].id).remove();
	clicked--;
	if(clicked<3){
		restorePlus(true);
		$('.dontworry').css('visibility', 'hidden');
	}
});



$(document).keypress(function(e) {
    if(e.which == 13 && inFirstPage) {
        $.fn.fullpage.moveSlideRight();
    }
});
