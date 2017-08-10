var socket = io();
socket.on('connect', function(){
  console.log('connect');
});


$('.submit').click(function(e){
  e.preventDefault();
  var username = $('[name="username"]').val();
  if(username == ''){
    username="Anonymous";
  }
  var goaltitle = $('[name="goalTitle"]').val();
  var stepsArray = [];
  $('.stepslisteitem').each(function(index){
    var type = $(this).children('.stepoption').children('span').text();
    var inputtext = $(this).children('.asktitle').children('input').val();
    stepsArray.push(
      [{
        type: type
      },{
        input: inputtext
      }]
    );
  });
  var requestingUrl = $('#linkname').text();
  socket.emit('sendForm', {
    username:username,
    goaltitle:goaltitle,
    stepsArray:stepsArray,
    requestingUrl:requestingUrl
  });
  $('p.loading').css('display', 'block');
  $('p.loading').toggleClass('pulseAnimate');
});
socket.on('taken', function(){
  $('p.loading').text('This url is taken.');
});
socket.on('err', function(){
  $('p.loading').text('An error has occured.');
})
socket.on('redirect', function(url){
  window.location.href = url.url;
});
