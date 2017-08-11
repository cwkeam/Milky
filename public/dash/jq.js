$('.containsteps-titleofstep').blur(function(){
  var id = this.id;
  if($('#'+id).text() == ''){
    $('#'+id).text('TITLE OF STEP');
  }
});
$('.task-description').blur(function(){
  var id = this.id;
  if($('#'+id).text() == ''){
    $('#'+id).text('Enter a description about this step.');
  }
});


// Add step
$('.addStepDiv').click(function(){
  var onestep = `
  <div class="col-md-4">
    <div class="contain-step">
      <img src="/public/dash/delete.png" class="delete-step displaychange" />
      <div class="containtitle">
        <h3 id="1title" contenteditable="true" class="containsteps-titleofstep">
          ENTER A TITLE
        </h3>
      </div>
      <p id="1content" contenteditable="true" class="task-description">
        Enter a description about this step.
      </p>
      <div class="contain-buttons">
        <button class="display-button display-type-button display-course-button">Course</button>
        <button class="display-button display-status-button display-start-button">START</button>
      </div>
    </div>
  </div>
  `;
  $('.containsteps').append(onestep);
});

$('.deleteDiv').click(function(){
  $('.contain-step').toggleClass('shakeclass');
  $('.delete-step').toggleClass('displaychange');
  $('.deleteDiv').toggleClass('clicked');
});

$('.clicked').click(function(){
  $('.contain-step').removeClass('shakeclass');
  $('.delete-step').removeClass('displaychange');
  $('.deleteDiv').removeClass('.clicked');
});
