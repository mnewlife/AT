"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (getRequestCode, getResetWord) {
    /*********************************************************/
    var router = express.Router();
    router.get("/requestPasswordResetCode/:emailAddress", getRequestCode());
    router.get("/resetPassword/:userId/:resetCode", getResetWord());
    return router;
};
/******************************************************************************/ 
