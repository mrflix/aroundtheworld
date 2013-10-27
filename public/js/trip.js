


//
//  transport icon changer
//  ======================
//
//  changes the transport icon according to the selected transport option
//

var $transportIcon = $('.transport.icon');
var transportClasses = JSON.parse($transportIcon.attr('data-classes')).join(" ");

$('#transport').change(function(){
  $transportIcon.removeClass(transportClasses).addClass(this.value);
});


//
//  admin view control
//  ==================
//
//  controls the admin buttons' ('new journey') interaction with the help of css
//

var $adminView = $('.admin');

$('.button.add').click(function(){
  var targetViewName = $(this).attr('data-action-show');
  $adminView.attr('data-show', targetViewName);

  $('.dialog.' + targetViewName).find('input').first().focus();
});


// var userData = {
//   last: {
//     city: "",
//     transport: "car"
//   }
// };

//
//  scroll map controll
//  ===================
//

var $articles = $('.article:not(.admin)');
var oldSectionIndex = -1;
showMapSection(0, -1);

$(window).on('scroll', function(event){
  var activeIndex;

  $articles.each(function(i, el){
    var isAboveHalfWindow = ($(el).offset().top - $(window).scrollTop()) < $(window).height()/2;
    var hasReachedBottom = ($(window).scrollTop() + $(window).height() >= $('body').height());
    var $prev = $articles.eq(i-1);

    if(isAboveHalfWindow || hasReachedBottom){
      activeIndex = i;

      if($prev)
        $prev.addClass('active');

    } else {
      $(el).removeClass('active');
    }
  });

  // initial scroll (after reload)
  if(oldSectionIndex === undefined){

  }
  if(activeIndex !== oldSectionIndex){
    showMapSection(activeIndex, oldSectionIndex);
    oldSectionIndex = activeIndex;
  }
});

function showMapSection(newIndex, oldIndex){
  // add class to dom element
  $articles.eq(newIndex).addClass('highlight');
  $articles.eq(oldIndex).removeClass('highlight');

  if(newIndex > oldIndex){
    if(newIndex > 0){
      map.removeLayer(highlights[oldIndex]);
      map.addLayer(actives[oldIndex]);
    }

    map.removeLayer(inactives[newIndex]);
    map.addLayer(highlights[newIndex]);
  } else {
    map.removeLayer(actives[newIndex]);
    map.addLayer(highlights[newIndex]);

    if(oldIndex >= 0){
      map.removeLayer(highlights[oldIndex]);
      map.addLayer(inactives[oldIndex]);
    }
  }
}