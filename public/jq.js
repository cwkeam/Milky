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
		$('h1.heading').css('padding','0 30%');
		$('ul.og').css('margin-top', '30vh');
	}


	$('#fullpage').fullpage({
		controlArrows: false,
		anchors: ['page1', 'page2', 'page3'],
		scrollingSpeed: 2000
	});

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
	$.fn.fullpage.moveTo('page3');

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
	$.fn.fullpage.moveTo('page1');
	console.log('clickkk');
});
