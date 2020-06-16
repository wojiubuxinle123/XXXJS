"use strict";

var Form = function (configCustom) {
    // 将this赋值为that，防止this值发生变化
    var that = this;

    // 初始化 config
    that.config = $.extend(true, {}, that.configDefault, configCustom);
}

Form.prototype.configDefault = {
    gnConfig: {
        autoVerify: false,
        beforeSubmit: function () {
            return true;
        },
        verifyRule: {
            require: /\S+/,
            phone: /^1[3456789]\d{10}$/,
            // email: //,
        },
        verifyBind: {},
    },
    ajaxConfig: {
        url: "",
        type: "POST",
        // contentType: "multipart/form-data",
        contentType: false,
        processData: false,
        data: {},
        done: function () { },
        fail: function () { }
    },
    renderConfig: {
        formElem: "xxxjs-form"
    }
}

Form.prototype.render = function () {
    var that = this;
    var renderConfig = that.config.renderConfig;
    // var formElem = renderConfig.formElem;

    // 赋值 formElem
    renderConfig.formElem = XXXJS.transToJQ(renderConfig.formElem);

    // 初始化 formData
    that.formData = new FormData();
}

Form.prototype.setVerifyRule = function (rule) {
    var that = this;
    $.extend(that.config.verifyRule, rule);
}

Form.prototype.getFormData = function () {
    var that = this;
    var formData = new FormData(that.elem[0]);

    for (var item in that.config.ajaxConfig.data) {
        formData.append(item, that.config.ajaxConfig.data[item]);
    }
    that.formData = formData;
    return formData;
}

Form.prototype.submit = function () {
    var that = this
        , ajaxConfig = that.config.ajaxConfig
        , gnConfig = that.config.gnConfig;
    // 获取 FormData
    that.getFormData();
    if (gnConfig.autoVerify) {
        if (!that.validate()) return false;
    }
    if (gnConfig.beforeSubmit()) {
        ajaxConfig.data = that.formData;
        $.ajax(ajaxConfig).done(function (data, textStatus, jqXHR) {
            ajaxConfig.done(data, textStatus, jqXHR);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            ajaxConfig.fail(jqXHR, textStatus, errorThrown);
        });
    }
}

Form.prototype.validate = function () {
    var that = this
        , verifyBind = that.config.gnConfig.verifyBind
        , verifyRule = that.config.gnConfig.verifyRule;
    that.setFormData();

    for (var item in verifyBind) {
        if (that.formData.has(item)) {
            var val = that.formData.get(item);
            for (var eitem in verifyBind[item]) {
                if (!verifyRule[eitem].test(val)) {
                    alert(verifyBind[item][eitem]);
                    return false;
                }
            }
        }
    }

    return true;
}

export default Form;