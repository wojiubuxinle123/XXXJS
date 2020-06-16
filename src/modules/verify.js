"use strict";

var Verify = function (configCustom) {
    var that = this;
    that.config = $.extend(true, {}, that.configDefault, configCustom);
}

Verify.prototype.configDefault = {
    verifyRule: {
        require: /\S+/,
        phone: /^1[34578]\d{10}$/,
        date: /^(?:\d{4}-\d{2}-\d{2})$/,
        datetime: /^(?:\d{4}-\d{2}-\d{2}\s{1}\d{2}:\d{2}:\d{2})$/,
        num: /^(?:\d+)$/
    },
    verifyBind: {}
}

Verify.prototype.setVerifyRule = function (rule) {
    var that = this;
    $.extend(that.config.verifyRule, rule);
}

Verify.prototype.setVerifyBind = function (bind) {
    var that = this;
    $.extend(that.config.verifyBind, bind);
}

Verify.prototype.verify = function (data, callback) {
    var that = this;
    var verifyRule = that.config.verifyRule;
    var verifyBind = that.config.verifyBind;
    if (typeof data != "object") return "不是object";
    for (var index in data) {
        var eachData = data[index];
        if (index in verifyBind) {
            // verifyBind[index] = typeof verifyBind[index] == "array" ? verifyBind[index] : [verifyBind[index]];
            for (var eachBind of verifyBind[index]) {
                var eachRule = eachBind.rule;
                if (eachRule in verifyRule) {
                    if (!verifyRule[eachRule].test(eachData)) {
                        if ('wrong' in eachBind && typeof eachBind.wrong == "function") {
                            eachBind.wrong();
                            return false;
                        } else {
                            callback(eachBind.msg);
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

export default Verify;