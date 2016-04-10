console.log('hello from the mixes controller!');

function revealMixData(url){
  var data = $.get(url).success(function(data){
    console.log("someone clicked on a mix");
    var mixElement = $('.mix-link.'+data.id);
    mixElement.find('.mix-description').text(data.description);
    mixElement.find('.hidden').removeClass('hidden').addClass('visible');
    mixElement.find('.show-more').addClass('hidden')
  });
}


function bindShowMoreButtons(){
  $('.show-more').click(function(event){
    event.preventDefault()
    var get_url = $(this).attr('href');
    var linkHtml = this;
    revealMixData(get_url, linkHtml);
  });
  console.log( "'show more' buttons have been bound" );
}

var initIndexPage = function(){
  bindShowMoreButtons();
}


$(document).ready( initIndexPage );

$(document).on('page:load',initIndexPage)