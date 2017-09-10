"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (sendResponse) {
    /**********************************************************/
    var router = express.Router();
    /**********************************************************/
    router.get("/", function (req, res, next) {
        var payload = {};
        if (req.query.appContext) {
            payload.appContext = req.query.appContext;
        }
        if (req.query.innerContext) {
            payload.innerContext = req.query.innerContext;
        }
        return sendResponse(res, "passpoint-developer", true, null, payload);
    });
    /**********************************************************/
    return router;
};
/******************************************************************************/ 
