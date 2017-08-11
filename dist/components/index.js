"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var index_1 = require("./core/index");
var index_2 = require("./call-263/index");
var index_3 = require("./groc-round/index");
/******************************************************************************/
var tasks = (function () {
    function tasks(config, tasks) {
        this.core = tasks.core;
        this.call263 = tasks.call263;
        this.grocRound = tasks.grocRound;
    }
    return tasks;
}());
/******************************************************************************/
function factory(config) {
    var tasks = {
        core: index_1.default,
        call263: index_2.default,
        grocRound: index_3.default
    };
    return new tasks(config, tasks);
}
exports.default = factory;
/******************************************************************************/
