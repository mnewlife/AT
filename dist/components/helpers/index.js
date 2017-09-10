"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var data_structures_1 = require("./data-structures");
var moders_1 = require("./moders");
var mware_1 = require("./mware");
var numbers_1 = require("./numbers");
/******************************************************************************/
var Helpers = (function () {
    function Helpers(dataStructures, moders, mware, numbers) {
        this.dataStructures = dataStructures;
        this.moders = moders;
        this.mware = mware;
        this.numbers = numbers;
        this.middleware = [];
    }
    return Helpers;
}());
/******************************************************************************/
exports.default = function (emitEvent) {
    var modersInstance = moders_1.default();
    return new Helpers(data_structures_1.default(emitEvent, modersInstance.checkThrow), modersInstance, mware_1.default(), numbers_1.default(emitEvent, modersInstance.checkThrow));
};
/******************************************************************************/
