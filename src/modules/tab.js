; (function () {
    "use strict";

    let Tab = function (elem, configCustom) {
        var that = this;
        that.config = $.extend(true, that.configDefault, configCuostom);
        that.render();
    }

    Tab.prototype.configDefault = {
        renderConfig: {
            containerElem: null,
            tabsSelector: ">*",
            headerTpe: null,
        }
    }

    Tab.prototype.render = function () {
        var that = this,
        
    }

    XXXJS.Tab = Tab;
}());