"use strict";

var Carousel = function (configCustom) {
    var that = this;
    that.config = $.extend(true, {}, that.configDefault, configCustom);
    that.render();
}

Carousel.prototype.configDefault = {
    gnConfig: {
        interval: 2000
    },
    renderConfig: {
        containerElem: "xxxjs-carousel-test",
        itemSelector: ">*"
    }
}

Carousel.prototype.render = function () {
    var that = this;
    var renderConfig = that.config.renderConfig;
    renderConfig.containerElem = XXXJS.transToJQ(renderConfig.containerElem);
    that.items = renderConfig.containerElem.find(renderConfig.itemSelector);
}

Carousel.prototype.autoPlay = function () {
    var that = this;
    var gnConfig = that.config.gnConfig;
    that.interval = setInterval(function () {
        
    }, gnConfig.interval);
}

export default Carousel;