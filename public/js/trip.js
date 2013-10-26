var $transportIcon = $('.transport.icon');
var transportClasses = JSON.parse($transportIcon.attr('data-classes')).join(" ");

$('#transport').change(function(){
  $transportIcon.removeClass(transportClasses).addClass(this.value);
});

var userData = {
  last: {
    city: "",
    transport: "car"
  }
};