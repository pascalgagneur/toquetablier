/*!
 * toque-tablier-2.0.0
 * Toque Tablier
 * http://toqueettablier.ca/
 * @version 2.0.0

 * Copyright Toque Tablier
 * Copyright for plugin used: http://toqueettablier.ca/js/main.js
 */
window.log=function(){log.history=log.history||[],log.history.push(arguments),this.console&&console.log(Array.prototype.slice.call(arguments))},function(a){function b(a){return"object"==typeof a?a:{top:a,left:a}}var c=a.scrollTo=function(b,c,d){a(window).scrollTo(b,c,d)};c.defaults={axis:"xy",duration:parseFloat(a.fn.jquery)>=1.3?0:1,limit:!0},c.window=function(){return a(window)._scrollable()},a.fn._scrollable=function(){return this.map(function(){var b=this,c=!b.nodeName||-1!=a.inArray(b.nodeName.toLowerCase(),["iframe","#document","html","body"]);if(!c)return b;var d=(b.contentWindow||b).document||b.ownerDocument||b;return/webkit/i.test(navigator.userAgent)||"BackCompat"==d.compatMode?d.body:d.documentElement})},a.fn.scrollTo=function(d,e,f){return"object"==typeof e&&(f=e,e=0),"function"==typeof f&&(f={onAfter:f}),"max"==d&&(d=9e9),f=a.extend({},c.defaults,f),e=e||f.duration,f.queue=f.queue&&f.axis.length>1,f.queue&&(e/=2),f.offset=b(f.offset),f.over=b(f.over),this._scrollable().each(function(){function g(a){j.animate(l,e,f.easing,a&&function(){a.call(this,k,f)})}if(null!=d){var h,i=this,j=a(i),k=d,l={},m=j.is("html,body");switch(typeof k){case"number":case"string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(k)){k=b(k);break}if(k=a(k,this),!k.length)return;case"object":(k.is||k.style)&&(h=(k=a(k)).offset())}a.each(f.axis.split(""),function(a,b){var d="x"==b?"Left":"Top",e=d.toLowerCase(),n="scroll"+d,o=i[n],p=c.max(i,b);if(h)l[n]=h[e]+(m?0:o-j.offset()[e]),f.margin&&(l[n]-=parseInt(k.css("margin"+d))||0,l[n]-=parseInt(k.css("border"+d+"Width"))||0),l[n]+=f.offset[e]||0,f.over[e]&&(l[n]+=k["x"==b?"width":"height"]()*f.over[e]);else{var q=k[e];l[n]=q.slice&&"%"==q.slice(-1)?parseFloat(q)/100*p:q}f.limit&&/^\d+$/.test(l[n])&&(l[n]=l[n]<=0?0:Math.min(l[n],p)),!a&&f.queue&&(o!=l[n]&&g(f.onAfterFirst),delete l[n])}),g(f.onAfter)}}).end()},c.max=function(b,c){var d="x"==c?"Width":"Height",e="scroll"+d;if(!a(b).is("html,body"))return b[e]-a(b)[d.toLowerCase()]();var f="client"+d,g=b.ownerDocument.documentElement,h=b.ownerDocument.body;return Math.max(g[e],h[e])-Math.min(g[f],h[f])}}(jQuery),function(a){function b(b,c,d){var e=c.hash.slice(1),f=document.getElementById(e)||document.getElementsByName(e)[0];if(f){b&&b.preventDefault();var g=a(d.target);if(!(d.lock&&g.is(":animated")||d.onBefore&&d.onBefore(b,f,g)===!1)){if(d.stop&&g._scrollable().stop(!0),d.hash){var h=d.offset;h=h&&h.top||h||0;var i=f.id==e?"id":"name",j=a("<a> </a>").attr(i,e).css({position:"absolute",top:a(window).scrollTop()+h,left:a(window).scrollLeft()});f[i]="",a("body").prepend(j),location=c.hash,j.remove(),f[i]=e}g.scrollTo(f,d).trigger("notify.serialScroll",[f])}}}var c=location.href.replace(/#.*/,""),d=a.localScroll=function(b){a("body").localScroll(b)};d.defaults={duration:1e3,axis:"y",event:"click",stop:!0,target:window},d.hash=function(c){if(location.hash){if(c=a.extend({},d.defaults,c),c.hash=!1,c.reset){var e=c.duration;delete c.duration,a(c.target).scrollTo(0,c),c.duration=e}b(0,location,c)}},a.fn.localScroll=function(e){function f(){return!(!this.href||!this.hash||this.href.replace(this.hash,"")!=c||e.filter&&!a(this).is(e.filter))}return e=a.extend({},d.defaults,e),e.lazy?this.bind(e.event,function(c){var d=a([c.target,c.target.parentNode]).filter(f)[0];d&&b(c,d,e)}):this.find("a,area").filter(f).bind(e.event,function(a){b(a,this,e)}).end().end()}}(jQuery),function(a){function b(b,c){return parseInt(a.css(b[0],c))||0}function c(a){return a[0].offsetWidth+b(a,"marginLeft")+b(a,"marginRight")}function d(a){return a[0].offsetHeight+b(a,"marginTop")+b(a,"marginBottom")}a.fn.jCarouselLite=function(b){return b=a.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:!1,auto:null,speed:200,easing:null,vertical:!1,circular:!0,visible:3,start:0,scroll:1,beforeStart:null,afterEnd:null},b||{}),this.each(function(){function e(){return o.slice(q).slice(0,n)}function f(c){if(!g){if(b.beforeStart&&b.beforeStart.call(this,e()),b.circular)c<=b.start-n-1?(k.css(h,-((p-2*n)*r)+"px"),q=c==b.start-n-1?p-2*n-1:p-2*n-b.scroll):c>=p-n+1?(k.css(h,-(n*r)+"px"),q=c==p-n+1?n+1:n+b.scroll):q=c;else{if(0>c||c>p-n)return;q=c}g=!0,k.animate("left"==h?{left:-(q*r)}:{top:-(q*r)},b.speed,b.easing,function(){b.afterEnd&&b.afterEnd.call(this,e()),g=!1}),b.circular||(a(b.btnPrev+","+b.btnNext).removeClass("disabled"),a(q-b.scroll<0&&b.btnPrev||q+b.scroll>p-n&&b.btnNext||[]).addClass("disabled"))}return!1}var g=!1,h=b.vertical?"top":"left",i=b.vertical?"height":"width",j=a(this),k=a("ul",j),l=a("li",k),m=l.size(),n=b.visible;b.circular&&(k.prepend(l.slice(m-n-1+1).clone()).append(l.slice(0,n).clone()),b.start+=n);var o=a("li",k),p=o.size(),q=b.start;j.css("visibility","visible"),o.css({overflow:"hidden","float":b.vertical?"none":"left"}),k.css({margin:"0",padding:"0",position:"relative","list-style-type":"none","z-index":"1"}),j.css({overflow:"hidden",position:"relative","z-index":"2",left:"0px"});var r=b.vertical?d(o):c(o),s=r*p,t=r*n;o.css({width:o.width(),height:o.height()}),k.css(i,s+"px").css(h,-(q*r)),j.css(i,t+"px"),b.btnPrev&&a(b.btnPrev).click(function(){return f(q-b.scroll)}),b.btnNext&&a(b.btnNext).click(function(){return f(q+b.scroll)}),b.btnGo&&a.each(b.btnGo,function(c,d){a(d).click(function(){return f(b.circular?b.visible+c:c)})}),b.mouseWheel&&j.mousewheel&&j.mousewheel(function(a,c){return c>0?f(q-b.scroll):f(q+b.scroll)}),b.auto&&setInterval(function(){f(q+b.scroll)},b.auto+b.speed)})}}(jQuery);var initMap;!function(a,b){"use strict";a(document).ready(function(){function c(){function b(){var b=a("#filter").find("option:selected").text();b===f?h.removeClass(d).find("h2,ul").show():(h.addClass(d).find("h2,ul").hide(),a("#"+g+b).find("+ul").slideToggle())}var c,d="filter-list",e="Choisissez votre région:",f="Tous",g="filter_",h=a(".retailers-adress");c=a("<select>"),c.attr("id","filter"),c.append("<option>"+f),h.find("h2").each(function(){var b=a(this),d=b.text();b.attr("id",g+d),c.append("<option>"+d)}),h.first().before(c),c.before("<p>"+e+"</p>"),c.on("change",b),b()}function d(){var b,c=a("#banner"),d=c.find("li").size(),e=[];if(d>1){for(b=0;d>b;b++)e[b]=".nav-item-"+b;c.jCarouselLite({visible:1,auto:c.data("delay"),speed:c.data("speed"),circular:!0,btnNext:".next",btnGo:e,afterEnd:function(b){var c;a(".banner-nav").removeClass("selected"),c=b.attr("class"),c=c.replace("banner","nav"),a("."+c).addClass("selected")}})}}function e(){var a=new google.maps.LatLng(40.65,-73.95),c={zoom:5,center:a,mapTypeId:google.maps.MapTypeId.ROADMAP},d=new google.maps.Map(document.getElementById("map_canvas"),c),e=new google.maps.KmlLayer("http://maps.google.se/maps/ms?ie=UTF8&hl=sv&vps=1&jsv=284c&oe=UTF8&msa=0&msid=210826295852231512346.0004aba22f40da572eb9a&output=kml",{map:d});google.maps.event.addListener(e,"click",function(a){b(a.featureData)})}function f(){var a=document.createElement("script");a.type="text/javascript",a.src="http://maps.googleapis.com/maps/api/js?sensor=false&callback=initMap",document.body.appendChild(a)}a("nav").localScroll(),/mobile/i.test(navigator.userAgent)&&!location.hash&&setTimeout(function(){window.pageYOffset||window.scrollTo(0,1)},1e3),c(),a("#products").find("h2").click(function(){return a(this).next().slideToggle("fast"),!1}),d(),initMap=e,f()})}(jQuery,log);