/* Author: Pascal Gagneur, pascal@gagneur.se */
/*globals google, log */
var initMap;
(function($, log) {
    "use strict";
    $(document).ready(function() {
        $('nav').localScroll();


        if (/mobile/i.test(navigator.userAgent) && !location.hash) {
            setTimeout(function () {
                if (!window.pageYOffset) {
                    window.scrollTo(0, 1);
                }
            }, 1000);
        }
        function createRetailSelector() {
            var $select,
                NO_FILTER = 'Tous',
                FILTER_PREFIX = "filter_",
                $retailersAdress = $('.retailers-adress');

            $select = $('<select>');
            $select.attr('id', 'filter' );
            $select.append('<option>' + NO_FILTER );

            $retailersAdress.find('h2').each(function () {
                var $h2 = $(this),
                    text = $h2.text();
                $h2.attr('id', FILTER_PREFIX + text);
                $select.append('<option>' + text );
            });
            $retailersAdress.first().before($select);

            function filterRetail() {
                var selectedValue = $('#filter').find('option:selected').text();
                if (selectedValue === NO_FILTER) {
                    $retailersAdress.find('h2,ul').show();
                } else {
                    $retailersAdress.find('h2,ul').hide();
                    $("#" + FILTER_PREFIX + selectedValue).slideToggle().find('~ul').slideToggle();
                }
            }
            $select.on('change', filterRetail);
            filterRetail();
        }
        createRetailSelector();

        $('#products').find('h2').click(function() {
            $(this).next().slideToggle('fast');
            return false;
        });

        function initCarousel() {
            var $banner = $("#banner"),
            bannerSize = $banner.find("li").size(),
            btnGoArray = [],
            i;
            if (bannerSize > 1) {

                for (i=0; i < bannerSize; i++) {
                    btnGoArray[i] = ".nav-item-"+i;
                }
                $banner.jCarouselLite({
                    visible:1,
                    auto: $banner.data("delay"),
                    speed: $banner.data("speed"),
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
                //var text = kmlEvent.featureData.description;
                log(kmlEvent.featureData);
            });

            /*function showInContentWindow(text) {
                var sidediv = document.getElementById('content_window');
                sidediv.innerHTML = text;
            }*/
        }


        function loadMap() {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initMap";
            document.body.appendChild(script);
        }
        initMap = initialize;
        loadMap();
        //http://maps.google.se/maps/ms?ie=UTF8&hl=sv&vps=1&jsv=284c&oe=UTF8&msa=0&msid=210826295852231512346.0004aba22f40da572eb9a&output=kml
        //http://maps.google.se/maps/ms?ie=UTF8&hl=sv&vps=1&jsv=284c&oe=UTF8&msa=0&msid=115683233009724371429.0004928397e85cc046e76&output=kml
    });
}(jQuery,log));
