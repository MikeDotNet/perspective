// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                   || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

//Parallax.js
//MikeDotNet
//MIT license
(function () {
    var speed = 2;
    var noEffectMobileWidth = 600;
    var parallaxContainers = [];
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var scrollTop = Number(window.pageYOffset || document.documentElement.scrollTop).toFixed(2);
    var pcs = document.getElementsByClassName("parallax-container");
    var scrollBottom = (Number(scrollTop) + Number(windowHeight)).toFixed(2);

    function init() {       
        for (var i = 0; i < pcs.length; i++) {
            var parallaxContainer = {};
            var cn = pcs[i].childNodes;
            for (var c = 0; c < cn.length; c++) {
                if (cn[c].className == "parallax-img") {
                    parallaxContainer.element = pcs[i];
                    parallaxContainer.height = Number(pcs[i].clientHeight);
                    parallaxContainer.offsetTop = Number(pcs[i].offsetTop).toFixed(2);
                    parallaxContainer.offsetBottom = Number(pcs[i].offsetTop + parallaxContainer.height).toFixed(2);
                    parallaxContainer.img = cn[c];
                    parallaxContainer.imgHeight = Number(cn[c].clientHeight);

                    if (parallaxContainer.imgHeight <= parallaxContainer.height) {
                        parallaxContainer.img.style.height = (1 / speed * 100 + 100) + "%";
                        parallaxContainer.img.style.width = parallaxContainer.img.style.height;
                    }
                    else {
                        parallaxContainer.img.style.height = "";
                        parallaxContainer.img.style.width = "";
                    }

                    parallaxContainers.push(parallaxContainer);
                    break;
                }
            }
            newY(scrollTop, scrollBottom, parallaxContainer);
        }
    }
    init();
    window.addEventListener("resize", function () {
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        parallaxContainers = [];
        init();
        scrollHandler();
    });

    window.addEventListener("scroll", function () {
        if (windowWidth > noEffectMobileWidth) {
            window.requestAnimationFrame(scrollHandler); // event listener that calls function
        }
    });
    function scrollHandler() {
        scrollTop = Number(window.pageYOffset || document.documentElement.scrollTop).toFixed(2);
        var scrollBottom = (Number(scrollTop) + Number(windowHeight)).toFixed(2);
        for (var i = 0; i < parallaxContainers.length; i++) {
            var parallaxContainer = parallaxContainers[i];
            newY(scrollTop,scrollBottom,parallaxContainer);
        }
    }

    function newY(scrollTop, scrollBottom, parallaxContainer) { 
        //find whether parallaxImage is in viewable window
        if (Number(scrollBottom) >= Number(parallaxContainer.offsetTop) && scrollTop <= Number(parallaxContainer.offsetBottom)) {      
            var newYc = Number((scrollTop - parallaxContainer.offsetTop) / speed).toFixed(2);           
            if (newYc < -(Math.abs(parallaxContainer.imgHeight - parallaxContainer.height)) ) {
                newYc = -(Math.abs(parallaxContainer.imgHeight - parallaxContainer.height));
            }
            parallaxContainer.img.style.transform = 'translate3d(0px, ' + newYc + 'px,0)';
            parallaxContainer.img.style.webkitTransform = 'translate3d(0px, ' + newYc + 'px,0)';        
        }
    }
}());