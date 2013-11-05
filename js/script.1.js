/* Author: Pascal Gagneur, pascal@gagneur.se

*/
var initMap;
$(document).ready(function() {
	"use strict";
	/mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function () {
		if (!pageYOffset) window.scrollTo(0, 1);
	}, 1000);
  	
  	$('nav').localScroll();
  
	$('#products').find('h2').click(function() {
		$(this).next().slideToggle('fast');
		return false;
	});
	
	function initCarousel() {
     var bannerSize = $("#banner").find("li").size();
     if (bannerSize > 1) {
          var btnGoArray = [];
          for (var i=0; i < bannerSize; i++) {
              btnGoArray[i] = ".nav-item-"+i;
          }
          $("#banner").jCarouselLite({
                  visible:1,
                  auto: $("#banner").data("delay"),
                  speed: $("#banner").data("speed"),
                  circular:true,
                  btnNext: ".next",
                  btnGo: btnGoArray,
                  afterEnd: function(a) {
                      var itemName;
                      //banner-nav-item
                      $('.banner-nav').removeClass('selected');
                      itemName = a.attr('class');
                      itemName = itemName.replace('banner','nav');
                      $('.'+itemName).addClass('selected');
                  }
          });
      }
  }
  initCarousel();
  
  function initialize() {
    var myLatlng = new google.maps.LatLng(40.65, -73.95),
      myOptions = {
        zoom: 5,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      },
      map = new google.maps.Map(
        document.getElementById("map_canvas"),
        myOptions),
      nyLayer = new google.maps.KmlLayer(
'http://maps.google.se/maps/ms?ie=UTF8&hl=sv&vps=1&jsv=284c&oe=UTF8&msa=0&msid=210826295852231512346.0004aba22f40da572eb9a&output=kml',{  map: map});
   
    google.maps.event.addListener(nyLayer, 'click', function(kmlEvent) {
      var text = kmlEvent.featureData.description;
      log(kmlEvent.featureData);
	});
   
    function showInContentWindow(text) {
      var sidediv = document.getElementById('content_window');
      sidediv.innerHTML = text;
    }
  }
  
  
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initMap";
  document.body.appendChild(script);
}
	initMap = initialize;  
	window.onload = loadScript;
 //http://maps.google.se/maps/ms?ie=UTF8&hl=sv&vps=1&jsv=284c&oe=UTF8&msa=0&msid=210826295852231512346.0004aba22f40da572eb9a&output=kml
//http://maps.google.se/maps/ms?ie=UTF8&hl=sv&vps=1&jsv=284c&oe=UTF8&msa=0&msid=115683233009724371429.0004928397e85cc046e76&output=kml
});
