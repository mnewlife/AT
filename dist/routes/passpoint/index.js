"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (sendResponse, validateAppContext) {
    var router = express.Router();
    router.get("/", function (req, res, next) {
        var payload = {};
        if (req.query.appContext) {
            if (validateAppContext(req.query.appContext)) {
                payload.appContext = req.query.appContext;
            }
        }
        if (req.query.nextInnerContext) {
            payload.nextInnerContext = req.query.nextInnerContext;
        }
        return sendResponse(res, "passpoint", true, null, payload);
    });
    return router;
};
/******************************************************************************/ 
