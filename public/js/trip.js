//
//  publish
//  =======
//

function publish(){
  var $dialog = $(this).parents('.dialog').first();
  var type = $dialog.attr('data-type');
  var section;

  switch(type){
    case 'destination':
      section = {
        type: 'destination',
        location: {
          name: $('#destination').val(),
          lat: parseFloat($('#destination').attr('data-lat')),
          lng: parseFloat($('#destination').attr('data-lng'))
        },
        story: $('#destination-story').val()
      }
      break;
    case 'journey':
      section = {
        type: 'journey',
        from: {
          name: $('#from').val(),
          lat: parseFloat($('#from').attr('data-lat')),
          lng: parseFloat($('#from').attr('data-lng'))
        },
        to: {
          name: $('#to').val(),
          lat: parseFloat($('#to').attr('data-lat')),
          lng: parseFloat($('#to').attr('data-lng'))
        },
        transport: $('#transport').val(),
        story: $('#journey-story').val()
      }
      break;
  }

  if(section){
    var url = '/user/' + user_data._id + '/trip/' + trip._id;

    $.ajax({
      type: 'PUT', 
      url: url,
      data: trip,
      dataType: 'json',
      headers: { 'x-csrf-token': $('meta[name=csrf_token]').attr('content') },
      success: function(newDocument){
        trip._rev = newDocument._rev;
        console.log("success");
      }
    });
  }
}

$('.publish').click(publish);


//
//  get location
//  ============
//

function getPositionFromName(name, callback){
  $.getJSON('http://maps.google.com/maps/api/geocode/json?address='+ name +'&sensor=false', callback);
}

$('#from, #to, #destination').on({
  'blur': getCoordinates,
  'focus': clearInputFeedback
});

function clearInputFeedback(){
  $(this).parents('.inputStyle').first().removeClass('error success');
}

function getCoordinates(){
  var _this = $(this);
  var name = _this.val();
  var $holder = _this.parents('.inputStyle').first();
  var callback = function(data){
    var _class = 'error';
    var lat = '';
    var lng = '';

    if(data.status == 'OK'){
      _class = 'success';
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
    }

      $holder.addClass(_class);
      _this.attr({
        'data-lat': lat,
        'data-lng': lng
      });
  };

  if(name)
    getPositionFromName(name, callback);
}

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

$('.admin .exit').click(function(){
  var $view = $(this).parents('.dialog').first();

  // clear data
  $view.find('input, textarea').val("");

  // TODO: clear gallery


  // switch view
  $adminView.attr('data-show', 'new');
});

//
//  scroll map controll
//  ===================
//

var $articles = $('.article:not(.admin)');
var oldMapIndex = -1;

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

  if(activeIndex !== undefined && activeIndex !== oldMapIndex){
    selectOnMap(activeIndex);
  }
});

function selectOnMap(index){
  // add class to dom element
  $articles.eq(index).addClass('highlight');
  $articles.eq(oldMapIndex).removeClass('highlight');

  if(index > oldMapIndex){
    if(map.hasLayer(highlights[oldMapIndex]))
      map.removeLayer(highlights[oldMapIndex]);

    // traveres up because of browser refresh scroll event
    for(var i = index-1; i >= 0; i--){
      if(!map.hasLayer(actives[i]))
        map.addLayer(actives[i]);
      if(map.hasLayer(inactives[i]))
        map.removeLayer(inactives[i]);
    }

    if(map.hasLayer(inactives[index]))
      map.removeLayer(inactives[index]);
    map.addLayer(highlights[index]);
  } else {
    map.removeLayer(actives[index]);
    map.addLayer(highlights[index]);
    
    map.removeLayer(highlights[oldMapIndex]);
    map.addLayer(inactives[oldMapIndex]);
  }

  oldMapIndex = index;
}