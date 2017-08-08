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
		scrollingSpeed: 3000
	});
	$.fn.fullpage.setAllowScrolling(false, 'up');





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
