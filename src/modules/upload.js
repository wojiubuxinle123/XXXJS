"use strict";

var Upload = function (configCustom) {
    // 将this赋值为that，防止this值发生变化
    var that = this;

    // 初始化config
    that.config = $.extend(true, {}, that.configDefault, configCustom);

    // 初始化verify
    that.verify = new XXXJS.Verify(configCustom.verifyConfig);

    that.render();
}

Upload.prototype.configDefault = {
    gnConfig: {
        autoUpload: false, //选择文件后是否自动上传
        multipleType: false, //多文件模式，一次性向后台传多个文件，当renderConfig.multiple为true时为true
        autoVerify: false,
        proview: null,
        fieldName: "file", //代替input name属性，render方法生成的input不具有name属性，renderConfig.inputElem的name属性可能产生未知后果
        onChange: function () { },
        eachChange: function () { },
        beforeUpload: function () { return true; }
    },
    ajaxConfig: {
        type: "POST",
        data: {},
        contentType: false,
        processData: false,
        done: function () { },
        fail: function () { }
    },
    renderConfig: {
        eventElem: "xxxjs-upload-btn", //必填，事件元素，一般为button，绑定点击事件打开文件选择框
        inputElem: "xxxjs-upload-input", //input元素，不推荐使用，对框架理解足够深是可以尝试，name属性可能造成未知后果
        uploadElem: "xxjs-submit-btn", //提交事件元素，绑定submit方法
        multiple: false, //自动生成的
        accept: false
    }
}

Upload.prototype.render = function () {
    var that = this;

    var gnConfig = that.config.gnConfig;
    var renderConfig = that.config.renderConfig;
    var ajaxConfig = that.config.ajaxConfig;

    // 初始化事件元素
    renderConfig.eventElem = XXXJS.transToJQ(renderConfig.eventElem);

    // 初始或上传元素
    renderConfig.uploadElem = XXXJS.transToJQ(renderConfig.uploadElem);

    // 初始化 multipleType(多文件模式) 值，renderConfig.multiple 为 true 时，其一定为 true
    gnConfig.multipleType = renderConfig.multiple ? true : gnConfig.multipleType;

    that.filesList = {};
    that.formData = new FormData();
    that.totalSize = 0;

    // 初始化input元素
    var inputElem = renderConfig.inputElem;
    if (inputElem && inputElem instanceof jQuery) {
        inputElem = renderConfig.inputElem;
    } else {
        inputElem = $("<input>");
    }
    inputElem.attr({
        type: "file",
        accept: renderConfig.accept,
        multiple: renderConfig.multiple
    }).css({
        display: "none"
    });

    inputElem.off("change").on("change", function () {
        var dateNow = Date.now();
        that.filesList = that.filesList && gnConfig.multipleType ? that.filesList : {};
        for (var i = 0; i < this.files.length; i++) {
            var file = this.files.item(i);
            var fileIndex = dateNow + "-" + i;
            if (!gnConfig.autoVerify || that.validateFile(file)) {
                that.filesList[fileIndex] = file;
                gnConfig.eachChange(file.name, fileIndex, file);
            }
        }
        gnConfig.onChange();
        if (gnConfig.autoUpload) {
            that.upload();
        } else {

        }
    });

    renderConfig.eventElem.on("click", function () {
        renderConfig.inputElem[0].click();
    });

    renderConfig.uploadElem.on("click", function () {
        that.upload();
    });

    renderConfig.eventElem.after(inputElem);

    renderConfig.inputElem = inputElem;
};

Upload.prototype.clear = function () {
    var that = this;
    var inputElem = that.config.renderConfig.inputElem;
    inputElem.val("");
    that.filesList = {};
    that.formData = new FormData();
    return that;
}

Upload.prototype.open = function () {
    var that = this;
    var inputElem = that.config.renderConfig.inputElem;
    inputElem.click();
}

Upload.prototype.proview = function (file, callback) {
    // var that = this;
    // var gnConfig = that.config.gnConfig;
    // if (gnConfig.proview) {
    //     var filesReader = new FileReader();
    //     filesReader.onload = function () {
    //         that.config.proview(filesReader.result, index, file);
    //     }
    //     filesReader.readAsDataURL(file);
    // }
}

Upload.prototype.deleteFile = function (index, callback) {
    var that = this;
    var fileIndex = params.fileIndex;
    delete that.filesList[fileIndex];
    if (that.hasOwnProperty(fileIndex)) {
        params.fail();
    } else {
        params.success();
        console.log(that.filesList);
    }
}

Upload.prototype.getFormData = function () {
    var that = this;
    that.formData = new FormData();
    var gnConfig = that.config.gnConfig;
    var renderConfig = that.config.renderConfig;
    var inputName = gnConfig.multipleType ? (gnConfig.fieldName + "[]") : gnConfig.fieldName;
    for (var item in that.filesList) {
        that.formData.append(inputName, that.filesList[item]);
    }
    return that.formData;
}

Upload.prototype.validateFile = function (file) {
    var that = this;
    var gnConfig = that.config.gnConfig;
    var file1 = $.extend({}, file);
    file1.size = gnConfig.multipleType ? that.totalSize + file1.size : file1.size;
    that.totalSize = gnConfig.multipleType ? that.totalSize + file1.size : that.totalSize;
    return that.verify.verify(file1);
}

Upload.prototype.validate = function () {
    var that = this;
    console.log(that.filesList);
}

// 上传方法
Upload.prototype.upload = function (ajaxConfig) {
    var that = this;
    var gnConfig = that.config.gnConfig;
    var formData = that.getFormData();
    var ajaxOptions = $.extend(true, {}, that.config.ajaxConfig, ajaxConfig);
    for (var eachName in ajaxOptions.data) {
        formData.append(eachName, ajaxOptions.data[eachName])
    }
    ajaxOptions.data = formData;
    if (gnConfig.beforeUpload()) {
        $.ajax(ajaxOptions).done(ajaxOptions.done).fail(ajaxOptions.fail);
    }
}

export default Upload;