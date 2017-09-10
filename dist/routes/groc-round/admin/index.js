"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function () {
    var router = express.Router();
    router.use(authCheck);
    router.get("/", example);
    function example(req, res, next) {
    }
    function authCheck() {
    }
    return router;
};
/******************************************************************************/ 
