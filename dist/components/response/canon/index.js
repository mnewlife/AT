"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var Canon = (function () {
    /*****************************************************************/
    function Canon(events) {
        var _this = this;
        this.events = events;
        this.middleware = [];
        /*****************************************************************/
        this.send = function (res, view, success, message, payload) {
            res.format({
                json: function () {
                    return res.status(200).json({
                        success: (success) ? (success) : false,
                        message: (message) ? (message) : "",
                        payload: (payload) ? payload : ""
                    });
                },
                html: function () {
                    var str;
                    try {
                        var input = {};
                        if (success)
                            input.success = success;
                        if (message)
                            input.message = message;
                        if (payload)
                            input.payload = payload;
                        str = JSON.stringify(input);
                    }
                    catch (exception) {
                        _this.events.stringifyHtmlPacketFailed({
                            payload: (payload) ? payload : "",
                            reason: exception
                        });
                        str = "";
                    }
                    return res.render(view, {
                        jsonString: str
                    });
                },
                "default": function () {
                    _this.events.unacceptableResponseType({
                        res: res,
                        packet: {
                            view: view,
                            success: success,
                            message: message,
                            payload: payload
                        }
                    });
                    return res.status(406).send("Not Acceptable");
                }
            });
        };
    }
    return Canon;
}());
exports.default = Canon;
/******************************************************************************/
