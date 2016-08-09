!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueSwipe=t():e.VueSwipe=t()}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return e[i].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SwipeItem=t.Swipe=void 0;var s=n(12),r=i(s),a=n(11),o=i(a);t.Swipe=r["default"],t.SwipeItem=o["default"]},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={ready:function(){this.$dispatch("swipeItemCreated",this)},detached:function(){this.$dispatch("swipeItemDestroyed",this)},destroyed:function(){this.$dispatch("swipeItemDestroyed",this)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),s=!1,r=function(e,t,n,r){if(e.style.webkitTransform="translate3d("+t+"px, 0, 0)",n){s=!0,e.style.webkitTransition="-webkit-transform "+n+"ms ease-in-out";var a=!1,o=function(){a||(a=!0,s=!1,e.style.webkitTransition="",e.style.webkitTransform="",r&&r.apply(this,arguments))};(0,i.once)(e,"webkitTransitionEnd",o),setTimeout(o,n+50)}else e.style.webkitTransition=""};t["default"]={created:function(){this.dragState={}},data:function(){return{ready:!1,dragging:!1,index:0,pages:[],timer:null,reInitTimer:null,noDrag:!1}},props:{speed:{type:Number,"default":300},auto:{type:Number,"default":3e3},continuous:{type:Boolean,"default":!0},showIndicators:{type:Boolean,"default":!0},noDragWhenSingle:{type:Boolean,"default":!0},prevent:{type:Boolean,"default":!1}},events:{swipeItemCreated:function(){var e=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){e.reInitPages()},100))},swipeItemDestroyed:function(){var e=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){e.reInitPages()},100))}},methods:{reInitPages:function(){var e=this.$children;this.noDrag=1===e.length&&this.noDragWhenSingle;var t=[];this.index=0,e.forEach(function(e,n){t.push(e.$el),(0,i.removeClass)(e.$el,"active"),0===n&&(0,i.addClass)(e.$el,"active")}),this.pages=t},doAnimate:function(e,t){var n=this;if(0!==this.$children.length&&(t||!(this.$children.length<2))){var s,a,o,c,l,u=this.speed||300,d=this.index,f=this.pages,p=f.length;t?(s=t.prevPage,o=t.currentPage,a=t.nextPage,c=t.pageWidth,l=t.offsetLeft):(c=this.$el.clientWidth,o=f[d],s=f[d-1],a=f[d+1],this.continuous&&f.length>1&&(s||(s=f[f.length-1]),a||(a=f[0])),s&&(s.style.display="block",r(a,-c)),a&&(a.style.display="block",r(a,c)));var h,v=this.$children[d].$el;"prev"===e?(d>0&&(h=d-1),this.continuous&&0===d&&(h=p-1)):"next"===e&&(d<p-1&&(h=d+1),this.continuous&&d===p-1&&(h=0));var g=function(){if(void 0!==h){var e=n.$children[h].$el;(0,i.removeClass)(v,"active"),(0,i.addClass)(e,"active"),n.index=h}s&&(s.style.display=""),a&&(a.style.display="")};setTimeout(function(){"next"===e?(r(o,-c,u,g),a&&r(a,0,u)):"prev"===e?(r(o,c,u,g),s&&r(s,0,u)):(r(o,0,u,g),"undefined"!=typeof l?(s&&l>0&&r(s,c*-1,u),a&&l<0&&r(a,c,u)):(s&&r(s,c*-1,u),a&&r(a,c,u)))},10)}},next:function(){this.doAnimate("next")},prev:function(){this.doAnimate("prev")},doOnTouchStart:function(e){if(!this.noDrag){var t=this.$el,n=this.dragState,i=e.touches[0];n.startTime=new Date,n.startLeft=i.pageX,n.startTop=i.pageY,n.pageWidth=t.offsetWidth,n.pageHeight=t.offsetHeight;var s=this.$children[this.index-1],r=this.$children[this.index],a=this.$children[this.index+1];this.continuous&&this.pages.length>1&&(s||(s=this.$children[this.$children.length-1]),a||(a=this.$children[0])),n.prevPage=s?s.$el:null,n.dragPage=r?r.$el:null,n.nextPage=a?a.$el:null,n.prevPage&&(n.prevPage.style.display="block"),n.nextPage&&(n.nextPage.style.display="block")}},doOnTouchMove:function(e){if(!this.noDrag){var t=this.dragState,n=e.touches[0];t.currentLeft=n.pageX,t.currentTop=n.pageY;var i=t.currentLeft-t.startLeft;i=Math.min(Math.max(-t.pageWidth+1,i),t.pageWidth-1);var s=i<0?"next":"prev";t.prevPage&&"prev"===s&&r(t.prevPage,i-t.pageWidth),r(t.dragPage,i),t.nextPage&&"next"===s&&r(t.nextPage,i+t.pageWidth)}},doOnTouchEnd:function(){if(!this.noDrag){var e=this.dragState,t=new Date-e.startTime,n=null,i=e.currentLeft-e.startLeft,s=e.currentTop-e.startTop,r=e.pageWidth,a=this.index,o=this.pages.length;if(t<300){var c=Math.abs(i)<5&&Math.abs(s)<5;(isNaN(i)||isNaN(s))&&(c=!0),c&&this.$children[this.index].$emit("tap")}t<300&&void 0===e.currentLeft||((t<300||Math.abs(i)>r/2)&&(n=i<0?"next":"prev"),this.continuous||(0===a&&"prev"===n||a===o-1&&"next"===n)&&(n=null),this.$children.length<2&&(n=null),this.doAnimate(n,{offsetLeft:i,pageWidth:e.pageWidth,prevPage:e.prevPage,currentPage:e.dragPage,nextPage:e.nextPage}),this.dragState={})}}},destroyed:function(){this.timer&&(clearInterval(this.timer),this.timer=null)},ready:function(){var e=this;this.ready=!0,this.auto>0&&(this.timer=setInterval(function(){e.dragging||s||e.next()},this.auto)),this.reInitPages();var t=this.$el;t.addEventListener("touchstart",function(t){e.prevent&&t.preventDefault(),s||(e.dragging=!0,e.doOnTouchStart(t))}),t.addEventListener("touchmove",function(t){e.dragging&&e.doOnTouchMove(t)}),t.addEventListener("touchend",function(t){e.dragging&&(e.doOnTouchEnd(t),e.dragging=!1)})}}},function(e,t){"use strict";var n=function(e){return(e||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")},i=function(e,t){if(!e||!t)return!1;if(t.indexOf(" ")!=-1)throw new Error("className should not contain space.");return e.classList?e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1},s=function(e,t){if(e){for(var n=e.className,s=(t||"").split(" "),r=0,a=s.length;r<a;r++){var o=s[r];o&&(e.classList?e.classList.add(o):i(e,o)||(n+=" "+o))}e.classList||(e.className=n)}},r=function(e,t){if(e&&t){for(var s=t.split(" "),r=" "+e.className+" ",a=0,o=s.length;a<o;a++){var c=s[a];c&&(e.classList?e.classList.remove(c):i(e,c)&&(r=r.replace(" "+c+" "," ")))}e.classList||(e.className=n(r))}};e.exports={hasClass:i,addClass:s,removeClass:r}},function(e,t){"use strict";var n=function i(e,t){if(!e)return null;var n,s;if("string"==typeof e)return document.createTextNode(e);if(e.tag){n=document.createElement(e.tag);for(var r in e)if(e.hasOwnProperty(r)){if("content"===r||"tag"===r)continue;if("key"===r&&t){var a=e[r];a&&(t[a]=n);continue}n[r]=e[r]}var o=e.content;if(o)if("string"==typeof o)s=document.createTextNode(o),n.appendChild(s);else{o instanceof Array||(o=[o]);for(var c=0,l=o.length;c<l;c++){var u=o[c];s=i(u,t),n.appendChild(s)}}}return n};e.exports=n},function(e,t){"use strict";var n=function(){return document.addEventListener?function(e,t,n){e&&t&&n&&e.addEventListener(t,n,!1)}:function(e,t,n){e&&t&&n&&e.attachEvent("on"+t,n)}}(),i=function(){return document.removeEventListener?function(e,t,n){e&&t&&e.removeEventListener(t,n,!1)}:function(e,t,n){e&&t&&e.detachEvent("on"+t,n)}}(),s=function(e,t,s){var r=function a(){s&&s.apply(this,arguments),i(e,t,a)};n(e,t,r)};e.exports={on:n,off:i,once:s}},function(e,t,n){"use strict";var i=n(3),s=n(5),r=n(7),a=n(4);e.exports={on:s.on,off:s.off,once:s.once,getStyle:r.getStyle,setStyle:r.setStyle,removeClass:i.removeClass,addClass:i.addClass,hasClass:i.hasClass,create:a}},function(e,t){"use strict";function n(e){return e.replace(s,function(e,t,n,i){return i?n.toUpperCase():n}).replace(r,"Moz$1")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},s=/([\:\-\_]+(.))/g,r=/^moz([A-Z])/,a=Number(document.documentMode),o=a<9?function(e,t){if(!e||!t)return null;t=n(t),"float"===t&&(t="styleFloat");try{switch(t){case"opacity":try{return e.filters.item("alpha").opacity/100}catch(i){return 1}break;default:return e.style[t]||e.currentStyle?e.currentStyle[t]:null}}catch(i){return e.style[t]}}:function(e,t){if(!e||!t)return null;t=n(t),"float"===t&&(t="cssFloat");try{var i=document.defaultView.getComputedStyle(e,"");return e.style[t]||i?i[t]:null}catch(s){return e.style[t]}},c=function l(e,t,s){if(e&&t)if("object"===("undefined"==typeof t?"undefined":i(t)))for(var r in t)t.hasOwnProperty(r)&&l(e,r,t[r]);else t=n(t),"opacity"===t&&a<9?e.style.filter=isNaN(s)?"":"alpha(opacity="+100*s+")":e.style[t]=s};e.exports={getStyle:o,setStyle:c}},function(e,t){},function(e,t){e.exports=" <div class=swipe-item> <slot></slot> </div> "},function(e,t){e.exports=' <div class=swipe> <div class=swipe-items-wrap v-el:wrap> <slot></slot> </div> <div class=swipe-indicators v-show=showIndicators> <div class=swipe-indicator v-for="page in pages" :class="{ active: $index === index }"></div> </div> </div> '},function(e,t,n){var i,s;i=n(1),s=n(9),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports["default"]),s&&(("function"==typeof e.exports?e.exports.options:e.exports).template=s)},function(e,t,n){var i,s;n(8),i=n(2),s=n(10),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports["default"]),s&&(("function"==typeof e.exports?e.exports.options:e.exports).template=s)}])});