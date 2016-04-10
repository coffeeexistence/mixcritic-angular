function bindWriteCritiqueButtons(){
  $('.write-critique').click(function(event){
    event.preventDefault()
    $(this).siblings('.critique-form-container').removeClass('hidden').addClass('visible');
    $(this).addClass('hidden');
  });

  $('.critique-form').submit(function(event){
    event.preventDefault();

    var values = $(this).serialize();
    var url = $(this).attr('action');
    var posting = $.post({url:url, data:values});

    posting.success(function(data){
      var revisionHtml = $('#revision-'+data.revision_id);
      revisionHtml.find('.show-critiques').prepend(data.partial);
      revisionHtml.find('.critique-form-container').removeClass('visible').addClass('hidden');
      revisionHtml.find('.write-critique').removeClass('hidden').addClass('visible');
      $('no-critiques').addClass('hidden');
    });

    posting.error(function(data){
      $('#critique-error-messages').removeClass('hidden').addClass('visible');
      if (data.status=="411"){
        displayErrors('#critique-error-messages ul', data.responseJSON);
      } else {
        $('#critique-error-messages ul').text('Something went wrong');
      }
    });
    
  });
}

function displayCritique(critiqueHtml){
  debugger;
}

function displayErrors(listElement, errors){
  var errorHtml = '<li>'+errors.join('</li><li>')+'</li>';
  $(listElement).html(errorHtml);
}



$( document ).ready(function() {
    bindWriteCritiqueButtons();
});


$(document).on('page:load', function(){
  bindWriteCritiqueButtons();
})