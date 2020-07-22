/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/xxxjs.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\n\r\nvar Form = function (configCustom) {\r\n    // 将this赋值为that，防止this值发生变化\r\n    var that = this;\r\n\r\n    // 初始化 config\r\n    that.config = $.extend(true, {}, that.configDefault, configCustom);\r\n    that.verify = new XXXJS.Verify(configCustom.verifyConfig);\r\n    that.render();\r\n}\r\n\r\nForm.prototype.configDefault = {\r\n    gnConfig: {\r\n        autoVerify: false,\r\n        beforeSubmit: function () {\r\n            return true;\r\n        }\r\n    },\r\n    ajaxConfig: {\r\n        url: \"\",\r\n        type: \"POST\",\r\n        // contentType: \"multipart/form-data\",\r\n        contentType: false,\r\n        processData: false,\r\n        data: {},\r\n        done: function () { },\r\n        fail: function () { }\r\n    },\r\n    renderConfig: {\r\n        formElem: \"xxxjs-form\",\r\n        submitElem: \"xxxjs-form-submit\"\r\n    }\r\n}\r\n\r\nForm.prototype.render = function () {\r\n    var that = this;\r\n    var renderConfig = that.config.renderConfig;\r\n    // var formElem = renderConfig.formElem;\r\n\r\n    // 赋值 formElem\r\n    renderConfig.formElem = XXXJS.transToJQ(renderConfig.formElem);\r\n    renderConfig.submitElem = XXXJS.transToJQ(renderConfig.submitElem);\r\n\r\n    renderConfig.submitElem.on(\"click\", function () {\r\n        that.submit();\r\n    });\r\n    // 初始化 formData\r\n    that.formData = new FormData();\r\n}\r\n\r\nForm.prototype.setVerifyRule = function (rule) {\r\n    var that = this;\r\n    $.extend(that.config.verifyRule, rule);\r\n}\r\n\r\nForm.prototype.getFormData = function () {\r\n    var that = this;\r\n    var renderConfig = that.config.renderConfig;\r\n    var ajaxConfig = that.config.ajaxConfig;\r\n    var formData = new FormData(renderConfig.formElem[0]);\r\n\r\n    for (var item in ajaxConfig.data) {\r\n        formData.append(item, ajaxConfig.data[item]);\r\n    }\r\n    that.formData = formData;\r\n    return formData;\r\n}\r\n\r\nForm.prototype.submit = function () {\r\n    var that = this;\r\n    var ajaxConfig = that.config.ajaxConfig;\r\n    var gnConfig = that.config.gnConfig;\r\n    var verifyConfig = that.config.verifyConfig;\r\n\r\n    // 获取 FormData\r\n    that.getFormData();\r\n    if (gnConfig.autoVerify && !that.validate()) {\r\n        return false;\r\n    }\r\n    if (gnConfig.beforeSubmit()) {\r\n        ajaxConfig.data = that.formData;\r\n        $.ajax(ajaxConfig).done(function (data, textStatus, jqXHR) {\r\n            ajaxConfig.done(data, textStatus, jqXHR);\r\n        }).fail(function (jqXHR, textStatus, errorThrown) {\r\n            ajaxConfig.fail(jqXHR, textStatus, errorThrown);\r\n        });\r\n    }\r\n}\r\n\r\nForm.prototype.validate = function () {\r\n    var that = this;\r\n    that.getFormData();\r\n    return that.verify.verify(that.formData);\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Form);\n\n//# sourceURL=webpack:///./src/modules/form.js?");

/***/ }),

/***/ "./src/modules/table.js":
/*!******************************!*\
  !*** ./src/modules/table.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\"use strice\";\r\n\r\nlet Table = function (configCustom) {\r\n    let that = this;\r\n    that.config = $.extend(true, {}, that.configDefault, configCustom);\r\n    that.render();\r\n}\r\n\r\nTable.prototype.configDefault = {\r\n    gnConfig: {\r\n        page: 1,\r\n        rows: 20,\r\n        beforeLoad: function () {}\r\n    },\r\n    ajaxConfig: {\r\n        url: \"\",\r\n        type: \"POST\",\r\n        done: function () { },\r\n        fail: function () { }\r\n    },\r\n    renderConfig: {\r\n\r\n    }\r\n}\r\n\r\nTable.prototype.render = function () {\r\n\r\n}\r\n\r\nTable.prototype.getData = function () {\r\n    var that = this;\r\n    var gnConfig = that.config.gnConfig;\r\n    var ajaxConfig = $.extend({}, that.config.ajaxConfig);\r\n    $.extend(ajaxConfig.data, {page: gnConfig.page, rows: gnConfig.rows});\r\n    $.ajax(ajaxConfig).done(function (data, textStatus, jqXHR) {\r\n        that.nowData = data;\r\n        ajaxConfig.done(data, textStatus, jqXHR);\r\n    }).fail(function (jqXHR, textStatus, errorThrown) {\r\n        ajaxConfig.fail(jqXHR, textStatus, errorThrown);\r\n    });\r\n}\r\n\r\nTable.prototype.getTplStr = function () {\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Table);\n\n//# sourceURL=webpack:///./src/modules/table.js?");

/***/ }),

/***/ "./src/modules/upload.js":
/*!*******************************!*\
  !*** ./src/modules/upload.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\n\r\nvar Upload = function (configCustom) {\r\n    // 将this赋值为that，防止this值发生变化\r\n    var that = this;\r\n\r\n    // 初始化config\r\n    that.config = $.extend(true, {}, that.configDefault, configCustom);\r\n\r\n    // 初始化verify\r\n    that.verify = new XXXJS.Verify(configCustom.verifyConfig);\r\n\r\n    that.render();\r\n}\r\n\r\nUpload.prototype.configDefault = {\r\n    gnConfig: {\r\n        autoUpload: false, //选择文件后是否自动上传\r\n        multipleType: false, //多文件模式，一次性向后台传多个文件，当renderConfig.multiple为true时为true\r\n        autoVerify: true,\r\n        proview: null,\r\n        filedName: \"file\", //代替input name属性，render方法生成的input不具有name属性，renderConfig.inputElem的name属性可能产生未知后果\r\n        onChange: function () { },\r\n        eachChange: function () { },\r\n        beforeUpload: function () { return true; }\r\n    },\r\n    ajaxConfig: {\r\n        type: \"POST\",\r\n        data: {},\r\n        contentType: false,\r\n        processData: false,\r\n        done: function () { },\r\n        fail: function () { }\r\n    },\r\n    renderConfig: {\r\n        eventElem: \"xxxjs-upload-btn\", //必填，事件元素，一般为button，绑定点击事件打开文件选择框\r\n        inputElem: \"xxxjs-upload-input\", //input元素，不推荐使用，对框架理解足够深是可以尝试，name属性可能造成未知后果\r\n        uploadElem: \"xxjs-submit-btn\", //提交事件元素，绑定submit方法\r\n        multiple: false, //自动生成的\r\n        accept: false\r\n    }\r\n}\r\n\r\nUpload.prototype.render = function () {\r\n    var that = this;\r\n\r\n    var gnConfig = that.config.gnConfig;\r\n    var renderConfig = that.config.renderConfig;\r\n    var ajaxConfig = that.config.ajaxConfig;\r\n\r\n    // 初始化事件元素\r\n    renderConfig.eventElem = XXXJS.transToJQ(renderConfig.eventElem);\r\n\r\n    // 初始或上传元素\r\n    renderConfig.uploadElem = XXXJS.transToJQ(renderConfig.uploadElem);\r\n\r\n    // 初始化 multipleType(多文件模式) 值，renderConfig.multiple 为 true 时，其一定为 true\r\n    gnConfig.multipleType = renderConfig.multiple ? true : gnConfig.multipleType;\r\n\r\n    that.filesList = {};\r\n    that.formData = new FormData();\r\n    that.totalSize = 0;\r\n\r\n    // 初始化input元素\r\n    var inputElem = renderConfig.inputElem;\r\n    if (inputElem && inputElem instanceof jQuery) {\r\n        inputElem = renderConfig.inputElem;\r\n    } else {\r\n        inputElem = $(\"<input>\");\r\n    }\r\n    inputElem.attr({\r\n        type: \"file\",\r\n        accept: renderConfig.accept,\r\n        multiple: renderConfig.multiple\r\n    }).css({\r\n        display: \"none\"\r\n    });\r\n\r\n    inputElem.off(\"change\").on(\"change\", function () {\r\n        var dateNow = Date.now();\r\n        that.filesList = that.filesList && gnConfig.multipleType ? that.filesList : {};\r\n        for (var i = 0; i < this.files.length; i++) {\r\n            var file = this.files.item(i);\r\n            var fileIndex = dateNow + \"-\" + i;\r\n            if (!gnConfig.autoVerify || that.validateFile(file)) {\r\n                that.filesList[fileIndex] = file;\r\n                gnConfig.eachChange(file.name, fileIndex, file);\r\n            }\r\n        }\r\n        gnConfig.onChange();\r\n        if (gnConfig.autoUpload) {\r\n            that.upload();\r\n        } else {\r\n\r\n        }\r\n    });\r\n\r\n    renderConfig.eventElem.on(\"click\", function () {\r\n        renderConfig.inputElem[0].click();\r\n    });\r\n\r\n    renderConfig.uploadElem.on(\"click\", function () {\r\n        that.upload();\r\n    });\r\n\r\n    renderConfig.eventElem.after(inputElem);\r\n\r\n    renderConfig.inputElem = inputElem;\r\n};\r\n\r\nUpload.prototype.clear = function () {\r\n    var that = this;\r\n    var inputElem = that.config.renderConfig.inputElem;\r\n    inputElem.val(\"\");\r\n    that.filesList = {};\r\n    that.formData = new FormData();\r\n    return that;\r\n}\r\n\r\nUpload.prototype.open = function () {\r\n    var that = this;\r\n    var inputElem = that.config.renderConfig.inputElem;\r\n    inputElem.click();\r\n}\r\n\r\nUpload.prototype.proview = function (file, callback) {\r\n    // var that = this;\r\n    // var gnConfig = that.config.gnConfig;\r\n    // if (gnConfig.proview) {\r\n    //     var filesReader = new FileReader();\r\n    //     filesReader.onload = function () {\r\n    //         that.config.proview(filesReader.result, index, file);\r\n    //     }\r\n    //     filesReader.readAsDataURL(file);\r\n    // }\r\n}\r\n\r\nUpload.prototype.deleteFile = function (index, callback) {\r\n    var that = this;\r\n    var fileIndex = params.fileIndex;\r\n    delete that.filesList[fileIndex];\r\n    if (that.hasOwnProperty(fileIndex)) {\r\n        params.fail();\r\n    } else {\r\n        params.success();\r\n        console.log(that.filesList);\r\n    }\r\n}\r\n\r\nUpload.prototype.getFormData = function () {\r\n    var that = this;\r\n    that.formData = new FormData();\r\n    var gnConfig = that.config.gnConfig;\r\n    var renderConfig = that.config.renderConfig;\r\n    var inputName = gnConfig.multipleType ? (gnConfig.fieldName + \"[]\") : gnConfig.fieldName;\r\n    for (var item in that.filesList) {\r\n        that.formData.append(inputName, that.filesList[item]);\r\n    }\r\n    return that.formData;\r\n}\r\n\r\nUpload.prototype.validateFile = function (file) {\r\n    var that = this;\r\n    var gnConfig = that.config.gnConfig;\r\n    var file1 = $.extend({}, file);\r\n    file1.size = gnConfig.multipleType ? that.totalSize + file1.size : file1.size;\r\n    that.totalSize = gnConfig.multipleType ? that.totalSize + file1.size : that.totalSize;\r\n    return that.verify.verify(file1);\r\n}\r\n\r\nUpload.prototype.validate = function () {\r\n    var that = this;\r\n    console.log(that.filesList);\r\n}\r\n\r\n// 上传方法\r\nUpload.prototype.upload = function (ajaxConfig) {\r\n    var that = this;\r\n    var gnConfig = that.config.gnConfig;\r\n    var formData = that.getFormData();\r\n    var ajaxOptions = $.extend(true, {}, that.config.ajaxConfig, ajaxConfig);\r\n    for (var eachName in ajaxOptions.data) {\r\n        formData.append(eachName, ajaxOptions.data[eachName])\r\n    }\r\n    ajaxOptions.data = formData;\r\n    if (gnConfig.beforeUpload()) {\r\n        $.ajax(ajaxOptions).done(ajaxOptions.done).fail(ajaxOptions.fail);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Upload);\n\n//# sourceURL=webpack:///./src/modules/upload.js?");

/***/ }),

/***/ "./src/modules/verify.js":
/*!*******************************!*\
  !*** ./src/modules/verify.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\n\r\nvar Verify = function (configCustom) {\r\n    var that = this;\r\n    that.config = $.extend(true, {}, that.configDefault, configCustom);\r\n}\r\n\r\nVerify.prototype.configDefault = {\r\n    verifyRule: {\r\n        require: /\\S+/,\r\n        phone: /^1[34578]\\d{9}$/,\r\n        date: /^(?:\\d{4}-\\d{2}-\\d{2})$/,\r\n        datetime: /^(?:\\d{4}-\\d{2}-\\d{2}\\s{1}\\d{2}:\\d{2}:\\d{2})$/,\r\n        num: /^(?:\\d+)$/\r\n    },\r\n    verifyBind: {},\r\n    callback: function () { }\r\n}\r\n\r\nVerify.prototype.setVerifyRule = function (rule) {\r\n    var that = this;\r\n    $.extend(that.config.verifyRule, rule);\r\n}\r\n\r\nVerify.prototype.setVerifyBind = function (bind) {\r\n    var that = this;\r\n    $.extend(that.config.verifyBind, bind);\r\n}\r\n\r\nVerify.prototype.verify = function (data, CustomConfig = {}) {\r\n    var that = this;\r\n    var verifyConfig = $.extend(true, {}, that.config, CustomConfig);\r\n    var verifyRule = verifyConfig.verifyRule;\r\n    var verifyBind = verifyConfig.verifyBind;\r\n    var initData = {};\r\n\r\n    if (typeof data != \"object\") { return \"不是object\"; } else { initData = $.extend({}, data) }\r\n\r\n    if (data instanceof FormData) {\r\n        for (var value of data) {\r\n            initData[value[0]] = value[1];\r\n        }\r\n    }\r\n\r\n    for (var index in initData) {\r\n        var eachData = initData[index];\r\n        if (index in verifyBind) {\r\n            verifyBind[index] = !verifyBind[index] instanceof Array ? [verifyBind[index]] : verifyBind[index];\r\n            for (var eachBind of verifyBind[index]) {\r\n                var eachRule = eachBind.rule;\r\n                var result = true; // 为false时为验证不通过，\r\n                var callback = typeof eachBind.wrong == \"function\" ? function (msg, data) { eachBind.wrong() } : verifyConfig.callback;\r\n                result = typeof eachRule == \"string\" && eachRule in verifyRule && !verifyRule[eachRule].test(eachData) ? false : result;\r\n                result = eachRule instanceof RegExp && !eachRule.test(eachData) ? false : result;\r\n                result = typeof eachRule == \"function\" && !eachRule(eachData, initData) ? false : result;\r\n                if (!result) {\r\n                    callback(eachBind.msg, { index: index, value: eachData, data: initData });\r\n                    return false;\r\n                }\r\n            }\r\n        }\r\n    }\r\n    return true;\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Verify);\n\n//# sourceURL=webpack:///./src/modules/verify.js?");

/***/ }),

/***/ "./src/xxxjs.js":
/*!**********************!*\
  !*** ./src/xxxjs.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/form.js */ \"./src/modules/form.js\");\n/* harmony import */ var _modules_upload_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/upload.js */ \"./src/modules/upload.js\");\n/* harmony import */ var _modules_table_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/table.js */ \"./src/modules/table.js\");\n/* harmony import */ var _modules_verify_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/verify.js */ \"./src/modules/verify.js\");\n// import $ from \"jquery\";\r\n\r\n\r\n\r\n\r\n// import Template from \"handlebars\";\r\n// import Carousel from \"./modules/carousel.js\";\r\n\r\nwindow.XXXJS = {};\r\n\r\n// XXXJS.Template = Template;\r\nXXXJS.Verify = _modules_verify_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\r\nXXXJS.Upload = _modules_upload_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\nXXXJS.Table = _modules_table_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\r\nXXXJS.Form = _modules_form_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n\r\nXXXJS.verify = new _modules_verify_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n\r\nXXXJS.each = function (data, callback) {\r\n    if (typeof data == \"object\") {\r\n        for (var index in data) {\r\n            callback(data[index], index);\r\n        }\r\n    } else if (typeof data == \"array\") {\r\n        for (var each of data) {\r\n            callback(each)\r\n        }\r\n    } else {\r\n        callback(data);\r\n    }\r\n    return true;\r\n}\r\n\r\n// XXXJS.template = function (tpl, data) {\r\n//     var str = Template.compile(tpl);\r\n//     return str(data);\r\n// }\r\n\r\nXXXJS.unionFormData = function () {\r\n    var formData = new FormData();\r\n    for (var item of arguments) {\r\n        for (var field of item) {\r\n            formData.append(field[0], field[1]);\r\n        }\r\n    }\r\n    return formData;\r\n}\r\n\r\nXXXJS.transToJQ = function (elem) {\r\n    //     elem = /^#.+/.test(elem) ? elem : \"#\" + elem;\r\n    if (typeof elem == \"object\") {\r\n        if (elem instanceof jQuery) {\r\n            return elem;\r\n        } else {\r\n            return $(elem);\r\n        }\r\n    }\r\n    \r\n    if (typeof elem == \"string\") {\r\n        if ($(elem).length > 0) {\r\n            return $(elem);\r\n        } else {\r\n            elem = \"#\" + elem;\r\n            return $(elem);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/xxxjs.js?");

/***/ })

/******/ });