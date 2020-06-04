"use strice";

let Table = function (configCustom) {
    let that = this;
    that.config = $.extend(true, {}, that.configDefault, configCustom);
    that.render();
}

Table.prototype.configDefault = {
    gnConfig: {
        page: 1,
        rows: 20,
        beforeLoad: function () {}
    },
    ajaxConfig: {
        url: "",
        type: "POST",
        done: function () { },
        fail: function () { }
    },
    renderConfig: {

    }
}

Table.prototype.render = function () {

}

Table.prototype.getData = function () {
    var that = this;
    var gnConfig = that.config.gnConfig;
    var ajaxConfig = $.extend({}, that.config.ajaxConfig);
    $.extend(ajaxConfig.data, {page: gnConfig.page, rows: gnConfig.rows});
    $.ajax(ajaxConfig).done(function (data, textStatus, jqXHR) {
        that.nowData = data;
        ajaxConfig.done(data, textStatus, jqXHR);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        ajaxConfig.fail(jqXHR, textStatus, errorThrown);
    });
}

Table.prototype.getTplStr = function () {

}

export default Table;