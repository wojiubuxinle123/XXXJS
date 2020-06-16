// import $ from "jquery";
import Form from "./modules/form.js";
import Upload from "./modules/upload.js";
import Table from "./modules/table.js";
import Verify from "./modules/verify.js";
import Template from "handlebars";
// import Carousel from "./modules/carousel.js";

window.XXXJS = {};

XXXJS.Form = Form;
XXXJS.Upload = Upload;
XXXJS.Table = Table;
XXXJS.Template = Template;
XXXJS.Verify = Verify;

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
    if (typeof elem == "string") {
        elem = /^#.+/.test(elem) ? elem : "#" + elem;
        return $(elem);
    } else if (typeof elem == "object" && !elem instanceof jQuery) {
        return $(elem);
    } else if (typeof elem == "object" && elem instanceof jQuery) {
        return elem;
    }
}