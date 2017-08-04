"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var index_1 = require("./data-structures/index");
var index_2 = require("./numbers/index");
var index_3 = require("./middleware/index");
/******************************************************************************/
var SharedLogic = (function () {
    function SharedLogic(sharedLogic) {
        this.dataStructures = sharedLogic.dataStructures;
        this.numbers = sharedLogic.numbers;
        this.middleware = sharedLogic.middleware;
    }
    return SharedLogic;
}());
/******************************************************************************/
var sharedLogic = {
    dataStructures: index_1.default,
    numbers: index_2.default,
    middleware: index_3.default
};
exports.default = new SharedLogic(sharedLogic);
/******************************************************************************/
