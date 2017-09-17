"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_1 = require("./auth");
/******************************************************************************/
exports.default = function (eventListener, components, procedures, helpers) {
    var router = express.Router();
    router.use("/auth", auth_1.default(procedures.core.common.auth.signIn, helpers.setViewContexts, components.response.send));
    //router.use( "/developer", developer( config ) );
    //router.use( "/admin", admin( eventListener, components, procedures, helpers ) );
    //router.use( "/consumer", consumer( config ) );
    return router;
};
/******************************************************************************/ 
