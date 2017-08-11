"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var index_1 = require("./event-manager/index");
var index_2 = require("./environment/index");
/******************************************************************************/
var Config = (function () {
    function Config(environment) {
        this.environment = environment;
    }
    Config.prototype.registerReferences = function (components, tasks) {
        this.components = components;
        this.tasks = tasks;
        this.initiateEventManager();
    };
    Config.prototype.initiateEventManager = function () {
        this.eventManager = index_1.default(this.components, this.tasks);
    };
    return Config;
}());
/******************************************************************************/
exports.default = new Config(index_2.default);
/******************************************************************************/
