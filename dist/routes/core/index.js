"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var admin_1 = require("./admin");
/******************************************************************************/
exports.default = function (eventListener, components, procedures, helpers) {
    var router = express.Router();
    //router.use( "/developer", developer( config ) );
    router.use("/admin", admin_1.default(eventListener, components, procedures, helpers));
    //router.use( "/consumer", consumer( config ) );
    return router;
};
/******************************************************************************/ 
