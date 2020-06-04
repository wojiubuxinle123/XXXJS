"use strict";

var Varify = function (configCustom) {
    var that = this;
    that.config = $.extend(true, {}, that.configDefault, configCustom);
}

Varify.prototype.configDefault = {
    verifyRule: {
        require: /\S+/,
        phone: /^1\d{10}$/,
        date: /^(?:\d{4})-(?:\d{2})-(?:\d{2})$/,
    },
    varifyBind: {}
}

Varify.prototype.setVarifyRule = function (rule) {
    var that = this;
    $.extend(that.verifyRule, rule);
}

Varify.prototype.varify = function (data, callback) {
    var that = this;
    var verifyRule = that.confg.verifyRule;
    var verifyBind = that.config.verifyBind;
    if (typeof data != "object") return "不是object";
    XXXJS.each(data, function (eachData, index) {
        if (index in verifyBind) {
            XXXJS.each(verifyBind[index], function (eachRule) {
                if (!verifyRule[eachRule.rule].test(eachData)) {
                    if ('wrong' in eachRule) {eachRule.wrong()} else {callback(eachRule.msg)}
                }
            });
        }
    });
}

export default Varify;