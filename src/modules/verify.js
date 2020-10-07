"use strict";

var Verify = function (configCustom) {
    var that = this;
    that.config = $.extend(true, {}, that.configDefault, configCustom);
}

Verify.prototype.configDefault = {
    verifyRule: {
        require: /\S+/,
        phone: /^1[34578]\d{9}$/,
        date: /^(?:\d{4}-\d{2}-\d{2})$/,
        datetime: /^(?:\d{4}-\d{2}-\d{2}\s{1}\d{2}:\d{2}:\d{2})$/,
        num: /^(?:\d+)$/
    },
    verifyBind: {},
    callback: function () { }
}

Verify.prototype.setVerifyRule = function (rule) {
    var that = this;
    $.extend(that.config.verifyRule, rule);
}

Verify.prototype.setVerifyBind = function (bind) {
    var that = this;
    $.extend(that.config.verifyBind, bind);
}

Verify.prototype.verify = function (data, CustomConfig = {}) {
    var that = this;
    var verifyConfig = $.extend(true, {}, that.config, CustomConfig);
    var verifyRule = verifyConfig.verifyRule;
    var verifyBind = verifyConfig.verifyBind;
    var initData = {};

    if (typeof data != "object") { return "不是object"; } else { initData = $.extend({}, data) }

    if (data instanceof FormData) {
        for (var value of data) {
            initData[value[0]] = value[1];
        }
    }

    for (var index in initData) {
        var eachData = initData[index];
        if (index in verifyBind) {
            verifyBind[index] = !verifyBind[index] instanceof Array ? [verifyBind[index]] : verifyBind[index];
            for (var eachBind of verifyBind[index]) {
                var eachRule = eachBind.rule;
                var result = true; // 为false时为验证不通过，
                var callback = typeof eachBind.wrong == "function" ? eachBind.wrong : verifyConfig.callback;
                result = typeof eachRule == "string" && eachRule in verifyRule && !verifyRule[eachRule].test(eachData) ? false : result;
                result = eachRule instanceof RegExp && !eachRule.test(eachData) ? false : result;
                result = typeof eachRule == "function" && !eachRule(eachData, initData) ? false : result;
                if (!result) {
                    callback(eachBind.msg, { index: index, value: eachData, data: initData });
                    return false;
                }
            }
        }
    }
    return true;
}

export default Verify;