// import $ from "jquery";
import Form from "./modules/form.js";
import Upload from "./modules/upload.js";
import Table from "./modules/table.js";
import Verify from "./modules/verify.js";
import Template from "handlebars";
// import Carousel from "./modules/carousel.js";

window.XXXJS = {};

XXXJS.Template = Template;
XXXJS.Verify = Verify;
XXXJS.Upload = Upload;
XXXJS.Table = Table;
XXXJS.Form = Form;

XXXJS.verify = new Verify();

XXXJS.each = function (data, callback) {
    if (typeof data == "object") {
        for (var index in data) {
            callback(data[index], index);
        }
    } else if (typeof data == "array") {
        for (var each of data) {
            callback(each)
        }
    } else {
        callback(data);
    }
    return true;
}

XXXJS.template = function (tpl, data) {
    var str = Template.compile(tpl);
    return str(data);
}

XXXJS.unionFormData = function () {
    var formData = new FormData();
    for (var item of arguments) {
        for (var field of item) {
            formData.append(field[0], field[1]);
        }
    }
    return formData;
}

XXXJS.transToJQ = function (elem) {
    //     elem = /^#.+/.test(elem) ? elem : "#" + elem;
    if (typeof elem == "object") {
        if (elem instanceof jQuery) {
            return elem;
        } else {
            return $(elem);
        }
    }
    
    if (typeof elem == "string") {
        if ($(elem).length > 0) {
            return $(elem);
        } else {
            elem = "#" + elem;
            return $(elem);
        }
    }
}