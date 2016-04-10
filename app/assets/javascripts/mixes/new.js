var initNewMix = function(){
  $('select').material_select();
  $('#new-mix-form form').submit(function(){
    console.log("submit");
    $('#new-mix-progress-bar').removeClass('hidden').addClass('visible');
  });
}

$(document).ready( initNewMix );

$(document).on('page:load',initNewMix)