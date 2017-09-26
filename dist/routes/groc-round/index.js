"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
//import developer from "./developer";
var admin_1 = require("./admin");
//import consumer from "./consumer";
/******************************************************************************/
exports.default = function (components, procedures, helpers) {
    var router = express.Router();
    //router.use( "/developer", developer( config ) );
    router.use("/admin", admin_1.default(components, procedures, helpers.getAuthCheck));
    //router.use( "/consumer", consumer( components, procedures, helpers ) );
    return router;
};
/******************************************************************************/ 
