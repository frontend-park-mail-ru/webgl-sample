window.mouse = (function (elem) {
    var mouse = {};

    function onWheel(e) {
        e = e || window.event;

        var delta = e.deltaY || e.detail || e.wheelDelta;

        info.innerHTML = +info.innerHTML + delta;

        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }


    mouse.onWheel = (fn) => {
        if (elem.addEventListener) {
            if ('onwheel' in document) {
                // IE9+, FF17+, Ch31+
                elem.addEventListener("wheel", fn);
            } else if ('onmousewheel' in document) {
                // устаревший вариант события
                elem.addEventListener("mousewheel", fn);
            } else {
                // Firefox < 17
                elem.addEventListener("MozMousePixelScroll", fn);
            }
        } else { // IE8-
            elem.attachEvent("onmousewheel", fn);
        }
    };
})(document.body);