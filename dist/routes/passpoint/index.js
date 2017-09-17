"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (components) {
    var router = express.Router();
    router.get("/", function (req, res, next) {
        var payload = {};
        if (req.query.appContext) {
            payload.appContext = req.query.appContext;
        }
        if (req.query.innerContext) {
            payload.innerContext = req.query.innerContext;
        }
        return components.response.send(res, "passpoint", true, null, payload);
    });
    return router;
};
/******************************************************************************/ 
