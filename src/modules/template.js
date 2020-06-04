; (function () {
    "use strict";
    var Template = function (template, configCustom) {
        var that = this;
        $.extend(true, {}, that.configDefault, configCustom);
        that.template = template;
        return that.render();
    }

    Template.configDefault = {
        gnConfig: {
            start: "{{",
            end: "}}"
        }
    }

    Template.prototype.render = function () {
        var startTag = "\\[\\[";
        var endTag = "\\]\\]";
        tpl = tpl.replace(/\s+|\n|\t|\r/g, " ");
        tpl = "var str = \"" + tpl + "\"; return str;";
        tpl = tpl.replace(RegExp(startTag + "#(.+?)" + endTag + "(.+?)" + startTag + "#(.+?)" + endTag, "g"), function (str, str1, str2, str3) {
            return "+\"" + str1 + "return \"";
        });
        tpl = tpl.replace(RegExp(startTag + "(.+?)" + endTag, "g"), function (str, str1) {
            return "\"+" + str1 + "+\"";
        });
        var fun = new Function('d', tpl);
        tpl = fun(data)
        return tpl;
    }

    let template = function (template, configCustom) {
        return new Template();
    }

    XXXJS.Template = Template;
    XXXJS.template = template;
}());