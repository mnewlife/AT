"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var developer_1 = require("./developer");
var admin_1 = require("./admin");
var consumer_1 = require("./consumer");
/******************************************************************************/
exports.default = function (components) {
    var router = express.Router();
    router.use("/developer", developer_1.default(components.response.send));
    router.use("/admin", admin_1.default(components.response.send));
    router.use("/consumer", consumer_1.default(components.response.send));
    return router;
};
/******************************************************************************/ 
