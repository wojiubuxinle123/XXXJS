"use strict";

var Upload = function (configCustom) {
    // 将this赋值为that，防止this值发生变化
    var that = this;

    // 初始化config
    that.config = $.extend(true, {}, that.configDefault, configCustom);

    that.render();
}

Upload.prototype.configDefault = {
    gnConfig: {
        autoUpload: false,
        multipleType: false,
        proview: null,
        filedName: "file",
        change: function () { },
        eachChange: function () { }
    },
    ajaxConfig: {
        type: "POST",
        contentType: false,
        processData: false,
        done: function () { },
        fail: function () { }
    },
    renderConfig: {
        eventElem: "xxxjs-upload-btn",
        inputElem: "xxxjs-upload-input",
        multiple: false,
        accept: false
    }
}

Upload.prototype.render = function () {
    var that = this;

    var gnConfig = that.config.gnConfig;
    var renderConfig = that.config.renderConfig;
    var ajaxConfig = that.config.ajaxConfig;

    // 初始化元素
    var eventElem = renderConfig.eventElem;
    if (typeof eventElem == "string") {
        eventElem = /^#.+/.test(eventElem) ? eventElem : "#" + eventElem;
        console.log(eventElem);
        renderConfig.eventElem = $(eventElem);
    }

    // 初始化 multipleType(多文件模式) 值，renderConfig.multiple 为 true 时，其一定为 true
    gnConfig.multipleType = renderConfig.multiple ? true : gnConfig.multipleType;

    that.filesList = {};
    that.formData = new FormData();

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
    // renderConfig.appendElem.append(inputElem);
    renderConfig.inputElem.off("change").on("change", function () {
        var dateNow = Date.now();
        that.filesList = that.filesList && gnConfig.multipleType ? that.filesList : {};
        for (var i = 0; i < this.files.length; i++) {
            var fileIndex = dateNow + "-" + i;
            that.filesList[fileIndex] = this.files.item(i);
            gnConfig.eachChange(this.files.item(i).name, fileIndex, this.files.item(i));
        }
        if (gnConfig.autoUpload) {
            // that.upload();
        } else {
            gnConfig.change();
        }
    });

    renderConfig.eventElem.on("click", function () {
        renderConfig.inputElem[0].click();
    });
    renderConfig.eventElem.after(inputElem);
    renderConfig.inputElem = inputElem;
};

Upload.prototype.clear = function () {
    var that = this;
    that.filesList = {};
    that.formData = new FormData();
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
}

Upload.prototype.upload = function () {
    var that = this;
    that.getFormData();
    that.ajaxConfig.data = that.formData;
    $.ajax(that.ajaxConfig);
}

export default Upload;