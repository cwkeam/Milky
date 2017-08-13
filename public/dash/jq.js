var socket = io();
var howManySteps = $('.col-md-4').length+1;


$(document).ready(function(){
  checkProgress();
});
$(document).on('focus click','.containsteps-titleofstep', function(){
  var id = this.id;
  if($('#'+id).text() == "enter a title"){
    $('#'+id).text('');
  }
});
$(document).on('blur','.containsteps-titleofstep',function(){
  var id = this.id;
  if($('#'+id).text() == ''){
    $('#'+id).text('enter a title');
  }
  var getChildIndex = function(child){
    var parent = child.parentNode.parentNode.parentNode.parentNode;
    var i = parent.children.length - 1;
    var incomechild = child.parentNode.parentNode.parentNode;
      for (; i >= 0; i--){
          if (incomechild == parent.children[i]){
              break;
          }
      }
      return i;
  };

  socket.emit('save input', {
    url: window.location.pathname.replace('/',''),
    //fix vulnerability here
    type: 'title description',
    text: $('#'+id).text(),
    index: getChildIndex(this)
  });
});

$(document).on('focus click','.task-description',function(){
  var id = this.id;
  if($('#'+id).text() == "Enter a description about this step."){
    $('#'+id).text('');
  }
});
$(document).on('blur', '.task-description', function(){
  var id = this.id;
  if($('#'+id).text() == ''){
    $('#'+id).text('Enter a description about this step.');
  }
  var getChildIndexDes = function(child){
    var parent = child.parentNode.parentNode.parentNode;
    var i = parent.children.length - 1;
    var incomechild = child.parentNode.parentNode;
      for (; i >= 0; i--){
          if (incomechild == parent.children[i]){
              break;
          }
      }
      return i;
  };

  socket.emit('save input', {
    url: window.location.pathname.replace('/',''),
    type: 'long description',
    text: $('#'+id).text(),
    index: getChildIndexDes(this)
  });
});



// Add step
$('.addStepDiv').click(function(){
  var waiting = `
  <div class="col-md-4 loading">
    <div class="contain-step">
      <img src="/public/dash/loadwheel.png" class="loadingimg"/>
    </div>
  </div>
  `;
  $('.containsteps').append(waiting);
  socket.emit('addStepDiv', {
    url:window.location.pathname.replace('/',''),
    index:howManySteps
  });
});
socket.on('addStepDiv complete', function(){
  $('.loading').remove();
  var onestep = `
  <div id="${howManySteps}step" class="col-md-4">
    <div class="contain-step">
      <img src="/public/dash/delete.png" class="delete-step displaychange" />
      <div class="containtitle">
        <h3 id="${howManySteps}title" contenteditable="true" class="containsteps-titleofstep">enter a title</h3>
      </div>
      <p id="${howManySteps}content" contenteditable="true" class="task-description">Enter a description about this step.</p>
      <div class="contain-buttons">
        <button class="display-button display-type-button display-course-button">course</button>
        <button class="display-button display-status-button display-start-button">start</button>
      </div>
    </div>
  </div>
  `;
  $('.containsteps').append(onestep);
  howManySteps++;
  checkProgress();

});
//delete step
$(document).on('click','.delete-step', function(e){
  var parentid = $(e.currentTarget).parent().parent()[0].id;
  $(e.currentTarget).parent().children().remove();
  var waiting = `
      <img src="/public/dash/loadwheel.png" class="loadingimg"/>
  `;
  $('#'+parentid).children().append(waiting);
  socket.emit('deleteStepDiv', {
    url:window.location.pathname.replace('/',''),
    index:parentid.slice(0,1)
  });

});
socket.on('deleteStepDiv completed', function(doc){
  $('#'+doc.index+'step').remove();
  checkProgress();

});

$('.deleteDiv').click(function(){
  $('.contain-step').toggleClass('shakeclass');
  $('.delete-step').toggleClass('displaychange');
  $('.deleteDiv').toggleClass('clicked');
  $('.addStepDiv').click(false);
  $('.addStepDiv').css('cursor', 'auto');
});
$('.clicked').click(function(){
  $('.contain-step').removeClass('shakeclass');
  $('.delete-step').removeClass('displaychange');
  $('.deleteDiv').removeClass('.clicked');
});

//display-status-button
$(document).on('click', '.display-status-button', function(e){
  if($(e.currentTarget).text() == 'start'){
    $(e.currentTarget).text('in progress');
    $(e.currentTarget).removeClass('display-start-button');
    $(e.currentTarget).toggleClass('display-progress-button');
  }else if($(e.currentTarget).text() == 'in progress'){
    $(e.currentTarget).text('finished');
    $(e.currentTarget).removeClass('display-progress-button');
    $(e.currentTarget).toggleClass('display-finished-button');
  }else if($(e.currentTarget).text() == 'finished'){
    $(e.currentTarget).text('start');
    $(e.currentTarget).removeClass('display-finished-button');
    $(e.currentTarget).toggleClass('display-start-button');
  }
});
$(document).on('blur', '.display-status-button', function(e){
  var index = $(e.currentTarget).parent().parent().parent().attr('id').slice(0,1);
  var getChildIndex = function(child){
    var parent = child.parentNode.parentNode.parentNode.parentNode;
    var i = parent.children.length - 1;
    var incomechild = child.parentNode.parentNode.parentNode;
      for (; i >= 0; i--){
          if (incomechild == parent.children[i]){
              break;
          }
      }
      return i;
  };
  socket.emit('changing status', {
    url: window.location.pathname.replace('/',''),
    index:getChildIndex(this),
    changedTo:$(e.currentTarget).text()
  });
  checkProgress();

});
//change courses
$(document).on('click', '.display-type-button', function(e){
  if($(e.currentTarget).text() == 'course'){
    $(e.currentTarget).text('task');
    $(e.currentTarget).removeClass('display-course-button');
    $(e.currentTarget).toggleClass('display-task-button');
  }else if($(e.currentTarget).text() == 'task'){
    $(e.currentTarget).text('milestone');
    $(e.currentTarget).removeClass('display-task-button');
    $(e.currentTarget).toggleClass('display-milestone-button');
  }else if($(e.currentTarget).text() == 'milestone'){
    $(e.currentTarget).text('course');
    $(e.currentTarget).removeClass('display-milestone-button');
    $(e.currentTarget).toggleClass('display-course-button');
  }
});
$(document).on('blur', '.display-type-button', function(e){
  var index = $(e.currentTarget).parent().parent().parent().attr('id').slice(0,1);
  var getChildIndex = function(child){
    var parent = child.parentNode.parentNode.parentNode.parentNode;
    var i = parent.children.length - 1;
    var incomechild = child.parentNode.parentNode.parentNode;
      for (; i >= 0; i--){
          if (incomechild == parent.children[i]){
              break;
          }
      }
      return i;
  };
  socket.emit('changing course', {
    url: window.location.pathname.replace('/',''),
    index:getChildIndex(this),
    changedTo:$(e.currentTarget).text()
  });
  checkProgress();
});


console.log($('.display-finished-button').length);

function checkProgress(){
  var howmany = $('.col-md-4').length;
  var finished = $('.display-finished-button').length;
  var percent = (finished/howmany)*100;
  percent = parseInt(percent);
  if(percent !== 0){
    $('.finished-progressbar').removeClass('none');
  }else if(percent == 0){
    if(!$('.finished-progressbar').hasClass('none')){
      $('.finished-progressbar').toggleClass('none');
    }
  }
  console.log(percent);
  $('.finished-progressbar > p').text(''+percent+'%');
  $('.finished-progressbar').css('width', ''+percent+'%');
}
